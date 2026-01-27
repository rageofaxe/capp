import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect, createEvent, createStore } from "effector";
import { NativeModules, Platform } from "react-native";
import app from "../../../app.json";
import { getVehicleRouteFx } from "../history/model";

const BASE_URL = "https://app.transinet.eu/";

function coupleVehicles(result: App.Vehicles) {
    const { trucks, trailers, couplings } = result;
    
    // Create a map for quick lookup of vehicles by id
    const truckMap = new Map(trucks.map((truck: any) => [truck.id, truck]));
    const trailerMap = new Map(trailers.map((trailer: any) => [trailer.id, trailer]));

    // Process each coupling
    
    couplings.forEach((coupling: any) => {
        const truck: any = truckMap.get(coupling.truck_id);
        const trailer = trailerMap.get(coupling.trailer_id);

        if (truck && trailer) {
            truck.trailer = trailer;

            // Add truck to trailer
            //trailer.truck = (truck);
        }
    });
    
    return result;
}

export const $vehicles = createStore<App.Vehicles>({
    trucks: [],
    trailers: [],
    couplings: []
});

export const $currentVehicle = createStore<App.Vehicle | null>(null);

export const $accountName = createStore("");

export const $vehicleGroups = createStore<{ id: number; name: string }[]>([]);

export const setMarkerOverCluster = createEvent<App.Vehicle>();
export const clearVehicles = createEvent();
export const setAccountName = createEvent();

export const getAccountNameFx = createEffect(async () => {
    const cookie = (await AsyncStorage.getItem("cookie")) as string;

    const result = await fetch(`${BASE_URL}api/general/v2/profile`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: cookie,
        },
    }).then((result: any) => result.json());
    return result;
});

export const getVehicleFx = createEffect(async ({ vehicleId, vehicleType }: any) => {
    const cookie = (await AsyncStorage.getItem("cookie")) as string;

    const result = await fetch(
        `${BASE_URL}new_map/vehicles/${vehicleType}/${vehicleId}/info`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cookie: cookie,
            },
        }
    ).then((result: any) => result.json());

    return result;
});

export const getVehicleDataFx = createEffect(async ({ vehicleId, vehicleType }: any) => {
    const cookie = (await AsyncStorage.getItem("cookie")) as string;

    const result = await fetch(
        `${BASE_URL}new_map/vehicles/${vehicleType}/${vehicleId}/info`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cookie: cookie,
            },
        }
    ).then((result: any) => result.json());

    return result
});

export const getVehiclesFx = createEffect<any, App.Vehicles, any>(async () => {    
    const cookie = (await AsyncStorage.getItem("cookie")) as string;

    const result = await fetch(`${BASE_URL}new_map/vehicles`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: cookie,
        },
    }).then((result: any) => result.json());

    return coupleVehicles(result);
});

export const authFx = createEffect(async ({ login, password }: App.Credential) => {
    const locale = NativeModules?.SettingsManager?.settings?.AppleLanguages[0];
    const version = Platform.select({ android: "RCA", ios: "RCI" }) as string;
    const result = await fetch(`${BASE_URL}api/general/v2/sessions/sign_in`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login,
            password,
            agent: `${version}_${app.expo.version}_${app.expo.ios.buildNumber}_${locale}_${Platform.Version}`,
        }),
    });

    const cookie = result.headers.get("set-cookie") as string;
    await AsyncStorage.setItem("cookie", cookie);
    await AsyncStorage.setItem("authStatus", result.status.toString());
});

$vehicles.on(setMarkerOverCluster, (state, vehicle) => {
    const mapVehilces = (v: App.Vehicle) => {
        v._disableClustering = v.id === vehicle.id;
        v._zIndex = v.id === vehicle.id ? 1000 : 1;
        return v;
    };
    return {
        trailers: state.trailers.map(mapVehilces),
        trucks: state.trucks.map(mapVehilces),
    };
});

$currentVehicle
    .on(getVehicleFx.done, (_, { result }) => {
        if (result.trucks?.[0]) {
            return result.trucks?.[0];
        }
        return result.trailers?.[0];
    })
    .on(getVehicleRouteFx.done, (_, payload) => {
        return _;
    });

$vehicles
    .on(getVehiclesFx.done, (state, data) => {
        const disabledVehicle = [...state.trailers, ...state.trucks].find(
            (x) => x._disableClustering
        );
        const disabledVehicleId = disabledVehicle?.id;
        const mapVehilces = (v: App.Vehicle) => {
            v._disableClustering = v.id === disabledVehicleId;
            v._zIndex = v.id === disabledVehicleId ? 1000 : 1;

            if (v.id === disabledVehicleId) {
                v.last_status = disabledVehicle.last_status;
            }
            return v;
        };
        return {
            trailers: data.result.trailers.map(mapVehilces),
            trucks: data.result.trucks.map(mapVehilces),
        };
    })
    .on(getVehicleFx.done, (state, { result }) => {
        return {
            ...state,
            trucks: state.trucks.map((truck) => {
                if (truck.id === result.trucks[0]?.id) {
                    return {
                        _disableClustering: truck._disableClustering,
                        _zIndex: truck._zIndex,
                        ...result.trucks[0],
                    };
                }
                return truck;
            }),
        };
    })
    .on(clearVehicles, () => ({
        trailers: [],
        trucks: [],
    }));

$vehicleGroups.on(getVehiclesFx.done, (_, data) => {
    const groups = [...data.result.trucks, ...data.result.trailers]
        .map((x) => x.groups)
        .filter((x) => x.length)
        .flat()
        .reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});
    return Object.values(groups);
});

$accountName
    .on(getAccountNameFx.done, (_, data: any) => {
        console.log("getAccountNameFx.done", data);
        return `${data.result.first_name} ${data.result.last_name}`;
    })
    .on(setAccountName, (_, payload) => payload);
