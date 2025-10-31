import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect, createEvent, createStore, combine, sample } from "effector";
import { BASE_URL } from "../../../constants";
import {
    $dateFrom,
    $historyRoute,
    clearHistoryForVehicle,
    currentDate,
    enableAutoUpdate,
    getVehicleRouteFx,
} from "../model";
import { $vehicles } from "../../vehicles/model";

const getOptions = (cookie: string): any => ({
    method: "GET",
    mode: "cors",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: cookie,
    },
});

export const $historyRouteLive = createStore<any>([]);
export const $autoUpdate = createStore(0);

export const getVehicleRouteLive = createEvent();
export const incAutoUpdate = createEvent();

export const getVehicleRouteLiveFx = createEffect(
    async ({ id, dateFrom, vehicleType }: any) => {
        const cookie = (await AsyncStorage.getItem("cookie")) as string;
        const route = await fetch(
            `${BASE_URL}new_map/statuses/${vehicleType}/${id}?q%5Bfrom%5D=${dateFrom}&q%5Bto%5D=${dateFrom}&page=1`,
            getOptions(cookie)
        ).then((result: any) => result.json());

        if (dateFrom !== currentDate()) {
            return [];
        }

        return route;
    }
);

sample({
    clock: getVehicleRouteLiveFx.done,
    source: combine($historyRoute, $dateFrom, (historyRoute, dateFrom) => ({
        historyRoute,
        dateFrom,
    })),
    fn: ({ historyRoute, dateFrom }, historyRouteLive) => {
        if (dateFrom === currentDate()) {
            return historyRouteLive?.result?.slice(historyRoute?.length - 1);
        } else {
            // return historyRouteLive
        }
    },

    target: getVehicleRouteLive,
});

$vehicles.on(getVehicleRouteLive, (state, payload: any) => {
    const disabledVehicle = [...state.trailers, ...state.trucks].find(
        (x) => x._disableClustering
    );

    const lastPoint = payload[payload.length - 1];

    const mapVehilces = (vehicle: App.Vehicle) => {
        if (disabledVehicle.id === vehicle.id) {
            vehicle.last_status.latitude = lastPoint.latitude;
            vehicle.last_status.longitude = lastPoint.longitude;
        }
        return vehicle;
    };

    return {
        trailers: state.trailers.map(mapVehilces),
        trucks: state.trucks.map(mapVehilces),
    };
});

$historyRouteLive
    .on(getVehicleRouteFx, (_, payload) => {
        return []
    })
    .on(getVehicleRouteLive, (_, payload) => {
        return payload;
    });

$autoUpdate
    .on(clearHistoryForVehicle, () => -1)
    .on(incAutoUpdate, (state) => state + 1)
    .on(enableAutoUpdate, (_) => {
        return 1;
    });