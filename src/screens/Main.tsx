import { useUnit } from "effector-react";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from "expo-status-bar";
import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { Animated, Dimensions, Platform, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView from "react-native-map-clustering";
import {
    Marker,
    PROVIDER_DEFAULT,
    Polyline,
} from "react-native-maps";

import RoundButton from "@/src/components/RoundButton";
import BurgerSvg from "@/src/components/SVG/Burger";
import ParkerMarker from "@/src/components/SVG/ParkedMarker";
import ReloadSvg from "@/src/components/SVG/Reload";
import StoppedMarker from "@/src/components/SVG/StoppedMarker";
import VehicleMarker from "@/src/components/VehicleMarker";
import { getMarkerLatLngBySnapIndex, mapLatLng } from "@/utils";
import useApp from "./useApp";

import VehicleCluster from "@/src/components/VehicleCluster";
import { HEIGHT, HEIGHT_SCREEN, WIDTH, Z_INDEXES } from "@/src/constants";
import "@/src/models";
import {
    $filteredVehicles,
    $numberSorting,
    $searchedText,
    $statusSorting,
} from "@/src/models/filters/model";
import { $historyRouteLive } from "@/src/models/history/autoupdate/model";
import {
    $dateFrom,
    $historyPoints,
    $historyRoute,
    $segmentRoute,
    setSegmentRoute,
    setSelectedHistoryItemId,
} from "@/src/models/history/model";
import "@/src/models/misc";
import { $isFollowMode, setFollowMode, setLiveMode } from "@/src/models/modes";
import { $isProgressBar } from "@/src/models/ui/model";
import { getVehiclesFx } from "@/src/models/vehicles/model";
import { getMapPadding, sortByNumber, sortByStatus } from "@/src/utils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { SafeAreaProvider } from "react-native-safe-area-context";
import VehicleListSheet from "../components/BottomSheets/VehicleListSheet";
import VehicleSheet from "../components/BottomSheets/VehicleSheet";
import { $isArchivedVehicles } from "../models/settings/model";

const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
};

const isInRange = (list: any[], value: number = 0) => {
    const numberedList = list.map((x) => Number(x));
    const min = Math.min(...numberedList);
    const max = Math.max(...numberedList);
    return min <= value && value <= max;
};

export default function App() {
    const {
        bottomSheetListRef,
        bottomSheetItemRef,
        mapRef,
        vehicleSnapIndex,
        vehiclesSnapIndex,
        openVehicle,
        openDefaultRegion,
        handleSheetVehicleChanges,
        vehicleId,
        fitToSuppliedMarkers,
        closeVehicle,
    } = useApp();

    const statusSorting = useUnit($statusSorting);
    const numberSorting = useUnit($numberSorting);
    const isProgressBar = useUnit($isProgressBar);
    const historyRoute = useUnit($historyRoute);
    const historyRouteLive = useUnit($historyRouteLive);
    const segmentRoute = useUnit($segmentRoute);
    const historyPoints = useUnit($historyPoints);
    const isFollowMode = useUnit($isFollowMode);
    const dateFrom = useUnit($dateFrom);
    // @ts-ignore
    const filteredVehicles = useUnit<App.Vehicle[]>($filteredVehicles);
    const [isInit, setInit] = useState(true);

    const lastSnapPoint = Platform.select({
        ios: Dimensions.get("screen").height - 110,
        // android: Dimensions.get("screen").height - 160,
        android: Dimensions.get("screen").height - 110,
        // ios: Dimensions.get("window").height - Dimensions.get("screen").scale * 38,
        // android: HEIGHT - Dimensions.get("screen").scale * 57,
    });

    const snapPoints = [80, 390, lastSnapPoint];

    const navigation: any = useNavigation();

    const duration = 60e3;

    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setPositionAsync('absolute')
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            (async function () {
                await getVehiclesFx({});
            })();

            let interval = setInterval(async () => {
                getVehiclesFx({});
            }, duration);

            return () => {
                clearInterval(interval);
            };
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            if (isInit && filteredVehicles?.length) {
                fitToSuppliedMarkers();
                setInit(false);
            }
        }, [filteredVehicles, isInit])
    );

    const getVehicles = () => {
        getVehiclesFx({});
    };

    const getToday = () => moment().format("YYYY-MM-DD");
    const spinValue = new Animated.Value(0);

    // @ts-ignore
    const unsortedVehicles = useUnit<App.Vehicle[]>($filteredVehicles);
    
    // @ts-ignore
    const vehicleIDsString = unsortedVehicles.map((x) => x.id).join("-");
    const mapVehicles = useMemo(() => unsortedVehicles, [vehicleIDsString]);
    const search = useUnit($searchedText)
    const isArchivedVehicles = useUnit($isArchivedVehicles)

    const filteredMapVehicles = mapVehicles.filter(v => !v.archived_at || search || isArchivedVehicles)

    const vehicles = statusSorting?.active
        ? unsortedVehicles.sort(sortByStatus(statusSorting))
        : numberSorting?.active
            ? unsortedVehicles.sort(sortByNumber(numberSorting))
            : unsortedVehicles;

    console.log("!!!!!!!!!!!unsortedVehicles", unsortedVehicles.length, vehicles.length)

    const zoomToSegment = (point: any) => {
        setLiveMode(false);
        setFollowMode(false);
        // mapRef.current?.fitToCoordinates(point.segment.map(mapLatLng), { edgePadding });
        mapRef.current?.fitToCoordinates(point.segment.map(mapLatLng));
        setSegmentRoute(point.segment);
        setSelectedHistoryItemId(`segment${point.id}`);
    };

    const zoomToPoint = (point: any) => {
        setLiveMode(false);
        setFollowMode(false);
        // mapRef.current?.fitToCoordinates([point.initial_status].map(mapLatLng), { edgePadding });
        // mapRef.current?.fitToCoordinates([point.initial_status].map(mapLatLng));
        mapRef.current?.animateCamera({
            altitude: 10e3,
            center: {
                latitude: point.initial_status.latitude,
                longitude: point.initial_status.longitude,
            },
        });
        setSegmentRoute(point.pointSegment);
        setSelectedHistoryItemId(`point${point.id}`);
    };



    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider style={styles.viewContainer}>
                {isProgressBar && <View style={styles.progressbar}></View>}
                <StatusBar style="dark" backgroundColor="#EAFAF1" />

                <RoundButton
                    onTap={() => navigation.openDrawer()}
                    style={{
                        position: "absolute",
                        top: 48,
                        left: 16,
                        zIndex: Z_INDEXES.PROGRESS_BAR - 1,
                    }}
                >
                    <BurgerSvg />
                </RoundButton>

                <RoundButton
                    style={{
                        zIndex: Z_INDEXES.PROGRESS_BAR + 11,
                        position: "absolute",
                        top: 48,
                        right: 16,
                    }}
                    onTap={getVehicles}
                >

                    <ReloadSvg />

                </RoundButton>
                
                {true && <MapView
                    ref={mapRef}
                    initialRegion={INITIAL_REGION}
                    style={styles.mapIos}
                    onTouchStart={() => {
                        if (vehicleId && isFollowMode) {
                            setFollowMode(false);
                        }
                    }}
                    toolbarEnabled={false}
                    rotateEnabled={false}
                    provider={PROVIDER_DEFAULT}
                    mapPadding={getMapPadding({
                        bottom: vehiclesSnapIndex === 0 ? 50 : HEIGHT / 2 - 20,
                        top: 20,
                        left: 20,
                        right: 20,
                    })}
                    key={vehicleId ? vehicleId : "map"}
                    renderCluster={(cluster) => {
                        const { id, geometry, onPress, properties } = cluster;

                        return (
                            <Marker
                                key={`cluster-${id}`}
                                coordinate={{
                                    longitude: geometry.coordinates[0],
                                    latitude: geometry.coordinates[1],
                                }}
                            >
                                <VehicleCluster count={properties.point_count} />
                            </Marker>
                        );
                    }}
                >
                    {!!vehicleId && !!historyRoute.length && (
                        <>
                            <Polyline
                                coordinates={historyRoute.map(mapLatLng)}
                                strokeColor="#07629E"
                                strokeWidth={4}
                                onPress={(e) => {
                                    console.log("ON TOUCH");
                                    historyPoints.forEach((point: any) => {
                                        const isEqualLatitudeForSegment = isInRange(
                                            point.segment.map((x: any) =>
                                                Number(x.latitude)
                                            ),
                                            e.nativeEvent.coordinate?.latitude
                                        );
                                        const isEqualLongitudeForSegment = isInRange(
                                            point.segment.map((x: any) =>
                                                Number(x.longitude)
                                            ),
                                            e.nativeEvent.coordinate?.longitude
                                        );

                                        const isEqualLatitudeForPoint = isInRange(
                                            point.pointSegment.map((x: any) =>
                                                Number(x.latitude)
                                            ),
                                            e.nativeEvent.coordinate?.latitude
                                        );
                                        const isEqualLongitudeForPoint = isInRange(
                                            point.pointSegment.map((x: any) =>
                                                Number(x.longitude)
                                            ),
                                            e.nativeEvent.coordinate?.longitude
                                        );

                                        if (
                                            isEqualLatitudeForPoint &&
                                            isEqualLongitudeForPoint
                                        ) {
                                            zoomToPoint(point);
                                            return;
                                        }
                                        if (
                                            isEqualLatitudeForSegment &&
                                            isEqualLongitudeForSegment
                                        ) {
                                            zoomToSegment(point);
                                        }
                                    });
                                }}
                            />

                            {/* LIVEMODE */}
                            {getToday() === dateFrom && (
                                <Polyline
                                    coordinates={historyRouteLive.map(mapLatLng)}
                                    strokeColor="#FF0000"
                                    strokeWidth={4}
                                />
                            )}

                            <Polyline
                                coordinates={segmentRoute}
                                strokeColor="#D855FF"
                                strokeWidth={5}
                            />
                            {historyPoints.map((point: any) => (
                                <Marker
                                    key={point.id}
                                    coordinate={{
                                        latitude: Number(point?.initial_status?.latitude),
                                        longitude: Number(
                                            point?.initial_status?.longitude
                                        ),
                                    }}
                                >
                                    {point.kind === "parked" && <ParkerMarker />}
                                    {point.kind === "stopped" && <StoppedMarker />}
                                </Marker>
                            ))}
                        </>
                    )}
                    {filteredMapVehicles
                        .filter(
                            (vehicle) =>
                                !(
                                    (vehicleId && vehicleId !== vehicle.id) && !!historyRoute?.length
                                )
                        )
                        .map((vehicle) => {
                            return (
                                <Marker
                                    key={vehicle.id}
                                    coordinate={getMarkerLatLngBySnapIndex(vehicle)}
                                    // @ts-ignore
                                    cluster={!vehicle._disableClustering}
                                    style={{
                                        zIndex: vehicle._zIndex || 1,
                                        position: "absolute",
                                    }}
                                    anchor={{ x: 0.15, y: 0.5 }}
                                    centerOffset={{ x: 45, y: 15 }}
                                    identifier={`marker-${vehicle.id}`}

                                    onPress={() => openVehicle(vehicle)}

                                // onTouchEnd={() => openVehicle(vehicle)}
                                // onTouchStart={() => openVehicle(vehicle)}
                                // {...Platform.select({
                                //     ios: { onPress: () => openVehicle(vehicle) },
                                //     android: { onPress: () => openVehicle(vehicle) },
                                // })}
                                >
                                    <VehicleMarker
                                        vehicle={vehicle}
                                        onPress={() => {
                                            console.log("MARKER", vehicle.id)
                                        }}
                                    />
                                    {/* <View style={{backgroundColor: "green", height: 100, width: 200, top: 0, position: "relative", flex: 1}}></View> */}
                                </Marker>
                            );
                        })}
                </MapView>}

                <VehicleListSheet
                    bottomSheetListRef={bottomSheetListRef}
                    snapPoints={snapPoints}
                    openVehicle={openVehicle}
                    vehicles={vehicles}
                    vehicleId={vehicleId}
                    fitToSuppliedMarkers={fitToSuppliedMarkers}
                />

                <VehicleSheet
                    bottomSheetItemRef={bottomSheetItemRef}
                    index={vehicleSnapIndex}
                    snapPoints={snapPoints}
                    onChange={handleSheetVehicleChanges}
                    vehicles={vehicles}
                    vehicleId={vehicleId}
                    closeVehicle={closeVehicle}
                    vehicleSnapIndex={vehicleSnapIndex}
                    mapRef={mapRef}
                    openVehicle={openVehicle}
                />
                
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    arrow: {
        height: 20,
        width: 5,
        backgroundColor: "blue",
        position: "relative",
        top: 50,
    },
    container: {
        flex: 1,
        // height: HEIGHT,
        // pointerEvents: "box-none"
    },
    viewContainer: { 
        flex: 1, 
        // ...StyleSheet.absoluteFillObject, 
        pointerEvents: "box-none" },
    mapIos: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    mapAndroid: {
        width: WIDTH,
        height: HEIGHT,
        zIndex: -1,
        position: "absolute",
        top: 0,
    },
    progressbar: {
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.5,
        top: 0,
        left: 0,
        height: HEIGHT_SCREEN,
        width: WIDTH,
        zIndex: Z_INDEXES.PROGRESS_BAR,
    },
});