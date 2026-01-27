import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    AppState,
    BackHandler,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    View,
} from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import { useUnit } from "effector-react";
import { HEIGHT, WIDTH, Z_INDEXES } from "../../constants";
import { $vehicleId, $vehicleSnapIndex, setVehicleId } from "../../models/ui/model";
import DriverInfo from "../DriverInfo";
import RoundButton from "../RoundButton";
import CloseSvg from "../SVG/CloseIcon";
import TripInfo from "../TripInfo";

import TargetSVG from "../../components/SVG/Target";
import {
    $dateFrom,
    $historyPoints,
    $historyRoute,
    $maxDateFrom,
    $selectedHistoryItemId,
    clearHistoryForVehicle,
    enableAutoUpdate,
    getLastPointFx,
    getVehiclePointsFx,
    getVehicleRouteFx,
    setSelectedHistoryItemId,
} from "../../models/history/model";
import HistorySheet from "./HistorySheet";

import FitToMarkers from "@/assets/svg/misc/fitToMarkers.svg";
import moment from "moment";
import MapView from "react-native-maps";
import { mapLatLng } from "../../../utils";
import {
    $autoUpdate,
    $historyRouteLive,
    getVehicleRouteLiveFx,
    incAutoUpdate,
} from "../../models/history/autoupdate/model";
import {
    $currentLiveMode,
    $isFollowAndLiveMode,
    $isLiveMode,
    LiveModes,
    setFollowMode,
    setLiveMode,
} from "../../models/modes";
import {
    $currentVehicle,
    getVehicleDataFx,
    getVehicleFx,
} from "../../models/vehicles/model";
import { getEdgePadding } from "../../utils";
import VehicleInfo from "../VehicleInfo";

type VehicleSheetProps = {
    vehicles: App.Vehicle[];
    bottomSheetItemRef: React.RefObject<BottomSheetModal>;
    mapRef: React.RefObject<MapView>;
    snapPoints: any;
    openVehicle?: any;
    vehicleId: number | null;
    fitToSuppliedMarkers?: any;
    vehicleSnapIndex: number;
    handleSheetVehicleChanges?: any;
    closeVehicle: any;
    index: any;
    onChange: any;
};

type SubScreen = "Info" | "History";

const DURATION = 20e3;

const useFollowMode = (
    vehicleId: App.Vehicle["id"] | null,
    mapRef: VehicleSheetProps["mapRef"],
    vehicle: App.Vehicle
) => {
    const appState = useRef(AppState.currentState);
    const fetchTimer = useRef<any>(null);
    const focusTimer = useRef<any>(null);
    const isFollowAndLiveMode = useUnit($isFollowAndLiveMode);
    const [savedActivityDate, setSavedActivityDate] = useState<string | null>(null);
    const currentVehicle = useUnit($currentVehicle);
    const dateFrom = useUnit($dateFrom);
    const [savedVehicle, setSavedVehicle] = useState<App.Vehicle | null>();
    const [index, setIndex] = useState<number>(0);

    const focusCallback = useCallback(() => {
        if (savedVehicle && isFollowAndLiveMode) {
            console.log("COORD_4");
            mapRef.current?.animateCamera({
                center: {
                    latitude: Number(savedVehicle.last_status.latitude),
                    longitude: Number(savedVehicle.last_status.longitude),
                },
                altitude: 1e4,
            });
        }
    }, [savedVehicle, isFollowAndLiveMode]);

    const fetchCallback = useCallback(async () => {
        console.log("fetchCallback");
        const result = await getVehicleDataFx({
            vehicleId,
            vehicleType: vehicle.vehicleType,
        });
        if (vehicle.vehicleType === "truck") {
            setSavedVehicle(result.trucks?.[0]);
        } else {
            setSavedVehicle(result.trailers?.[0]);
        }

        setIndex((i) => i + 1);
    }, [vehicleId, vehicle]);

    const clearFetchTimer = useCallback(() => {
        clearInterval(fetchTimer.current);
        setFollowMode(false);
    }, [vehicleId]);

    const clearFocusTimer = useCallback(() => {
        clearInterval(focusTimer.current);
    }, [vehicleId]);

    useEffect(() => {
        if (vehicleId) {
            focusCallback();
        }
    }, [vehicleId]);

    useEffect(() => {
        if (
            savedActivityDate !== null &&
            savedActivityDate !== currentVehicle?.activity_changed_at &&
            currentVehicle?.activity_changed_at
        ) {
            console.log("----- USE EFFECT");
            setSavedActivityDate(currentVehicle?.activity_changed_at);
            getVehiclePointsFx({
                id: vehicleId,
                dateFrom,
                vehicleType: vehicle.vehicleType,
            });
            console.log("getVehiclePointsFx");
            getVehicleFx({ vehicleId, vehicleType: vehicle.vehicleType });
        }
    }, [vehicleId, currentVehicle, dateFrom, index]);

    // call getVehicle periodically
    useEffect(() => {
        if (vehicleId) {
            fetchCallback();
            fetchTimer.current = setInterval(fetchCallback, DURATION);
        } else {
            clearFetchTimer();
        }
    }, [vehicleId, appState]);

    // call followMode once
    useEffect(() => {
        if (isFollowAndLiveMode) {
            focusCallback();
        } else {
            if (focusTimer.current) {
                clearFocusTimer();
            }
        }
    }, [savedVehicle, isFollowAndLiveMode]);
};

const useLiveMode = (
    vehicleId: App.Vehicle["id"] | null,
    mapRef: VehicleSheetProps["mapRef"],
    currentView: SubScreen | string,
    vehicle: App.Vehicle
) => {
    const isLiveMode = useUnit($isLiveMode);
    const currentLiveMode = useUnit($currentLiveMode);
    const historyRouteLive = useUnit($historyRouteLive);
    const [prevРistoryRouteLiveLength, setPrevРistoryRouteLiveLength] = useState(historyRouteLive.length)

    useEffect(() => {
        if (currentView === "History" && vehicleId) {
            setLiveMode(true);
        } else {
            setLiveMode(false);
        }
    }, [currentView, vehicleId, currentLiveMode]);

    useEffect(() => {
        console.log("LIVEMODE: ", isLiveMode, currentLiveMode)
        console.log("LIVEMODE DATA: ")
        console.log("LIVEMODE DATA: ", historyRouteLive.length, prevРistoryRouteLiveLength, prevРistoryRouteLiveLength !== historyRouteLive.length)

        if (currentView === "History") {
            // LIVEMODE
            if (historyRouteLive?.length > 1 && isLiveMode) {
                if (currentLiveMode === LiveModes.REGULAR) {
                    mapRef.current?.fitToCoordinates(historyRouteLive.map(mapLatLng));
                }
                if (currentLiveMode === LiveModes.POINT_IN_CENTER) {
                    mapRef.current?.animateCamera({
                        center: {
                            latitude: Number(vehicle?.last_status?.latitude),
                            longitude: Number(vehicle?.last_status?.longitude),
                        },
                        altitude: 1e4,
                    });
                }
                if (currentLiveMode === LiveModes.POINT_IN_CENTER_WITH_SEGMENT && prevРistoryRouteLiveLength !== historyRouteLive.length) {
                    console.log("SET LIVEMODE", LiveModes.POINT_IN_CENTER_WITH_SEGMENT)
                    // incAutoUpdate()
                    const firstPoint = historyRouteLive[0]
                    const lastPoint = historyRouteLive[historyRouteLive.length - 1]
                    const additionalPoint = {
                        latitude: Number(lastPoint.latitude) + (Number(lastPoint.latitude) - Number(firstPoint.latitude)),
                        longitude: Number(lastPoint.longitude) + (Number(lastPoint.longitude) - Number(firstPoint.longitude))
                    }

                    mapRef.current?.fitToCoordinates([...historyRouteLive, additionalPoint].map(mapLatLng), { edgePadding: { top: 20, left: 20, right: 20, bottom: 20 } });

                    // setTimeout(() => {
                    //     mapRef.current?.animateCamera({
                    //         center: {
                    //             latitude: Number(vehicle.last_status.latitude),
                    //             longitude: Number(vehicle.last_status.longitude),
                    //         },
                    //     });
                    //     setPrevРistoryRouteLiveLength(historyRouteLive.length)
                    // }, 1000)
                }
            }

        }
    }, [currentView, historyRouteLive, isLiveMode, currentLiveMode, vehicle]);
};

//
const useAutoUpdate = (initialVehicle: App.Vehicle) => {
    const [currentActivity, setCurrentActivity] = useState<string | null>(null);

    const currentLiveMode = useUnit($currentLiveMode)
    const autoUpdate = useUnit($autoUpdate);
    const dateFrom = useUnit($dateFrom);
    const vehicleId = useUnit($vehicleId);
    const timer = useRef<any>(null);

    const callFns = async (isInc = true) => {
        const vehicle: App.Vehicle = await getVehicleDataFx({
            vehicleId,
            vehicleType: initialVehicle?.vehicleType,
        });

        console.log("----- callFns AUTO UPDATE", autoUpdate);
        await getVehicleRouteLiveFx({
            id: vehicleId,
            dateFrom,
            vehicleType: initialVehicle?.vehicleType,
        });
        await getVehiclePointsFx({
            id: vehicleId,
            dateFrom,
            vehicleType: initialVehicle?.vehicleType,
        });

        if (currentActivity !== vehicle.activity && !!currentActivity) {
            await getVehicleRouteFx({
                id: vehicleId,
                dateFrom,
                vehicleType: initialVehicle?.vehicleType,
            });
            await getLastPointFx({
                id: vehicleId,
                vehicleType: initialVehicle?.vehicleType,
            });
        }
        if (isInc) {
            timer.current = setTimeout(() => {
                incAutoUpdate();
            }, DURATION);
        }
        setCurrentActivity(vehicle.activity);
    };

    useEffect(() => {
        const today = moment().format("YYYY-MM-DD");
        if (autoUpdate > 0 && dateFrom === today) {
            callFns();
        } else {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        }

        () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [autoUpdate, dateFrom]);

    useEffect(() => {
        console.log("currentLiveMode", currentLiveMode, autoUpdate)
        if (autoUpdate) {
            clearTimeout(timer.current);
            incAutoUpdate();
        }

    }, [currentLiveMode])
};

const PlatformProvider = ({ children }: any) => {
    if (Platform.OS === "ios" || true) {
        return <GestureHandlerRootView style={styles.container}>{children}</GestureHandlerRootView>
    } else {
    }
}

export default function VehicleSheet(props: VehicleSheetProps) {
    const {
        bottomSheetItemRef,
        snapPoints,
        closeVehicle,
        vehicleId,
        vehicles,
        mapRef,
        onChange,
    } = props;

    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId) as App.Vehicle;

    const {
        historyRoute,
        historyPoints,
        historyRouteLive,
        dateFrom,
        selectedHistoryItemId,
        vehicleSnapIndex,
        maxDateFrom,
    } = useUnit({
        historyRoute: $historyRoute,
        historyRouteLive: $historyRouteLive,
        dateFrom: $dateFrom,
        selectedHistoryItemId: $selectedHistoryItemId,
        historyPoints: $historyPoints,
        maxDateFrom: $maxDateFrom,
        vehicleSnapIndex: $vehicleSnapIndex,
    });

    // const currentView = useSharedValue<SubScreen>("Info");
    const [currentView, setCurrentView] = useState({ value: "Info" });

    useFollowMode(vehicleId, mapRef, vehicle);
    useLiveMode(vehicleId, mapRef, currentView.value, vehicle);
    useAutoUpdate(vehicle);

    const zoomOut = useCallback(async () => {
        setFollowMode(true);
        setLiveMode(false);
        setSelectedHistoryItemId("");

        const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

        if (vehicle) {
            console.log(
                "COORDS_2: ",
                Number(vehicle.last_status.latitude),
                Number(vehicle.last_status.longitude)
            );
            mapRef.current?.animateCamera({
                center: {
                    latitude: Number(vehicle.last_status.latitude),
                    longitude: Number(vehicle.last_status.longitude),
                },
                altitude: 1e4,
            });
        }
    }, [historyRoute, historyRouteLive, vehicles, vehicleId]);

    const zoomToPoint = useCallback(() => {
        const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
        if (
            vehicle &&
            vehicle?.last_status?.latitude &&
            vehicle?.last_status?.longitude
        ) {
            console.log("COORDS B:");
            mapRef.current?.animateCamera({
                center: {
                    latitude: Number(vehicle.last_status.latitude),
                    longitude: Number(vehicle.last_status.longitude),
                },
                altitude: 1e4,
            });
        }
    }, [vehicles, vehicleId]);

    const zoomToNewRoute = () => {
        // LIVEMODE
        setLiveMode(true);
        setSelectedHistoryItemId("");
        console.log("COORDS N");
        mapRef.current?.fitToCoordinates(historyRouteLive.map(mapLatLng));
    };

    const zoomToOldRoute = useCallback(async () => {
        setSelectedHistoryItemId("");
        setLiveMode(false);
        setFollowMode(false);

        const edgePadding = getEdgePadding({
            top: HEIGHT / 4,
            right: 100,
            bottom: HEIGHT / 4,
            left: 20,
        });

        const coords = [...historyRoute, ...historyRouteLive].map(mapLatLng);
        if (coords.length) {
            mapRef.current?.fitToCoordinates(
                [...historyRoute, ...historyRouteLive].map(mapLatLng)
            );
        }

        // }

        // mapRef.current?.fitToCoordinates(historyRoute.map(mapLatLng), { edgePadding });
    }, [historyRoute, historyRouteLive]);

    useEffect(() => {
        const today = moment().format("YYYY-MM-DD");
        // if (currentView.value === "History" && dateFrom !== today) {
        if (currentView.value === "History") {
            console.log("NOT TODAY");
            callHistory();
        }
    }, [dateFrom]);

    useEffect(() => {
        const today = moment().format("YYYY-MM-DD");
        if (currentView.value === "History" && dateFrom !== today) {
            zoomToOldRoute();
        }
        if (currentView.value === "History" && dateFrom === today) {
            if (historyRoute?.length) {
                zoomToPoint();
                setLiveMode(true);
            }
        }
    }, [dateFrom, historyRoute]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            handleClose();
            return true;
        });

        return () => {
            backHandler.remove();
        };
    }, []);

    const callHistory = useCallback(async () => {
        if (vehicleId) {
            console.log("----- callHistory");
            await getVehicleFx({ vehicleId, vehicleType: vehicle.vehicleType }); // info
            await getVehicleRouteFx({
                id: vehicleId,
                dateFrom,
                vehicleType: vehicle.vehicleType,
            }); // statuses
            await getVehiclePointsFx({
                id: vehicleId,
                dateFrom,
                vehicleType: vehicle.vehicleType,
            });
            await getLastPointFx({ id: vehicleId, vehicleType: vehicle.vehicleType });
            enableAutoUpdate();
        }
    }, [vehicleId, dateFrom]);

    const clearHistory = () => {
        clearHistoryForVehicle();
        // currentView.value = "Info";
        setCurrentView({ value: "Info" });
    };

    const handleClose = () => {
        closeVehicle();
        setVehicleId(null);
        clearHistory();
    };

    const handleRef = useRef(null);

    const HandleComponent = () => {
        return (
            <>
                <View style={styles.buttonRight} ref={handleRef}>
                    {currentView.value === "History" && (
                        <RoundButton onTap={zoomToOldRoute} onLongPress={zoomToNewRoute}>
                            <FitToMarkers />
                        </RoundButton>
                    )}
                    {currentView.value !== "History" && (
                        <RoundButton onTap={zoomOut}>
                            <TargetSVG />
                        </RoundButton>
                    )}
                </View>
                <View style={styles.button}>
                    <RoundButton onTap={handleClose}>
                        <CloseSvg color="black" />
                    </RoundButton>
                </View>
            </>
        );
    };

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (Math.round(event.nativeEvent.contentOffset.x) === Math.round(WIDTH)) {
            if (currentView.value === "Info") {
                setCurrentView({ value: "History" });
                callHistory();
            }
        }
        if (event.nativeEvent.contentOffset.x === 0) {
            if (currentView.value === "History") {
                setCurrentView({ value: "Info" });
                clearHistory();
            }
        }
    };

    if (!vehicle) {
        return null
    }



    return (

        <BottomSheet
            ref={bottomSheetItemRef}
            index={vehicleSnapIndex}
            snapPoints={snapPoints}
            onChange={onChange}
            handleComponent={HandleComponent}
            style={styles.bottomSheet}
        >
            <BottomSheetView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 4,
                        marginTop: 16,
                    }}
                >
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            backgroundColor:
                                currentView.value === "Info" ? "#007AFF" : "gray",
                            borderRadius: 4,
                        }}
                    ></View>
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            backgroundColor:
                                currentView.value === "History" ? "#007AFF" : "gray",
                            borderRadius: 4,
                        }}
                    ></View>
                </View>

                <VehicleInfo vehicle={vehicle} />

                <ScrollView
                    horizontal
                    snapToInterval={WIDTH}
                    scrollEventThrottle={1}
                    decelerationRate={0}
                    onScroll={onScroll}
                    showsHorizontalScrollIndicator={true}
                    indicatorStyle="black"
                >
                    {[
                        <View style={{ backgroundColor: "white" }} key={"Info"}>
                            <ScrollView
                                keyboardDismissMode="interactive"
                                keyboardShouldPersistTaps="never"
                                overScrollMode={"always"}
                                style={styles.scrollContainer}
                                key={"Scrollbar"}
                                indicatorStyle="white"
                                showsVerticalScrollIndicator={false}
                            >
                                <TripInfo vehicle={vehicle} key={"Scrollbar1"} />
                                {vehicle?.drivers?.map((driver) => (
                                    <DriverInfo
                                        key={`${driver?.id}`}
                                        vehicle={vehicle}
                                        driver={driver}
                                    />
                                ))}
                            </ScrollView>
                        </View>,
                        <HistorySheet
                            key={"History"}
                            mapRef={mapRef}
                            vehicle={vehicle}
                            dateFrom={dateFrom}
                            historyPoints={historyPoints}
                            maxDateFrom={maxDateFrom}
                            selectedHistoryItemId={selectedHistoryItemId}
                            vehicleSnapIndex={vehicleSnapIndex}
                        />,
                    ]}
                </ScrollView>
            </BottomSheetView>
        </BottomSheet>

    );
}

const styles = StyleSheet.create({
    container: {
        pointerEvents: "box-none",
        flex: 1,
        zIndex: Z_INDEXES.BOTTOM_SHEET
    },
    scrollContainer: {
        margin: 16,
        marginTop: 0,
        width: WIDTH - 32,
    },
    bottomSheet: {
        zIndex: 5,
    },
    vehicleList: {
        margin: 16,
        backgroundColor: "black",
    },
    button: {
        margin: 0,
        width: 64,
        position: "absolute",
        top: -64,
        left: 16,
    },
    buttonRight: {
        margin: 0,
        width: 64,
        position: "absolute",
        top: -64,
        right: 0,
    },
});