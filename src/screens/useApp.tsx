import BottomSheet from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import { useCallback, useRef, useState } from "react";
import { Platform } from "react-native";
import "react-native-gesture-handler";
import MapView, { Camera } from "react-native-maps";
import { getMarkerLatLngBySnapIndex, mapLatLng } from "../../utils";
import { $filteredVehicles } from "../models/filters/model";
import { setFollowMode } from "../models/modes";
import {
    $vehicleId,
    $vehicleSnapIndex,
    $vehiclesSnapIndex,
    setVehicleId,
    setVehicleSnapIndex,
} from "../models/ui/model";
import { setMarkerOverCluster } from "../models/vehicles/model";

export default (): App.MainProps => {
    const vehiclesSnapIndex = useUnit($vehiclesSnapIndex);
    const vehicleSnapIndex = useUnit($vehicleSnapIndex);
    const vehicleId = useUnit($vehicleId);
    // @ts-ignore
    const vehicles = useUnit<App.Vehicle[]>($filteredVehicles);
    const [savedCamera, saveCamera] = useState();
    // @ts-ignore
    // const filteredVehicles = useUnit<App.Vehicle[]>($filteredVehicles)

    const bottomSheetListRef = useRef<BottomSheet>(null);
    const bottomSheetItemRef = useRef<BottomSheet>(null);
    const mapRef = useRef<MapView>();

    const handleSheetVehicleChanges = useCallback((index: number) => {
        // if (index === 0) {
        //     setVehicleId(null);
        //     setVehicleSnapIndex(1);
        //     bottomSheetItemRef.current?.snapToIndex(1);
        // } else {
        //     setVehicleSnapIndex(index);
        // }
        setVehicleSnapIndex(index);
    }, []);

    const openDefaultRegion = () => {
        const region: Camera = {
            center: {
                latitude: 52.5,
                longitude: 19.2,
            },
            pitch: 0.5,
            heading: 0.5,
            altitude: 0.5,
            zoom: 1,
        };

        // mapRef.current?.animateCamera(region, {duration: 1e3});
    };

    const openVehicle = async (vehicle: App.Vehicle) => {
        setVehicleId(vehicle.id);
        const camera = await mapRef.current?.getCamera();

        const region: Camera = {
            center: getMarkerLatLngBySnapIndex(vehicle),
            pitch: 0.5,
            heading: 0.5,
            altitude: 10000,
            zoom: 10,
        };
        if (vehicleId) {
            Platform.select({
                ios: mapRef.current?.animateCamera(region, { duration: 1e3 }),
                android: mapRef.current?.setCamera({ ...region, zoom: 14 }),
            });
            return;
        }

        if (vehicle?.last_address?.latitude) {
            setMarkerOverCluster(vehicle);
            setFollowMode(true);
            // setVehicleId(vehicle.id);
            Platform.select({
                ios: mapRef.current?.animateCamera(region, { duration: 1e3 }),
                android: mapRef.current?.setCamera({ ...region, zoom: 14 }),
            });

            saveCamera(camera as any);
        } else {
            // setVehicleId(vehicle.id);
        }

        // setDateFrom(moment().format("YYYY-MM-DD"));
    };

    const closeVehicle = useCallback(() => {
        mapRef.current?.animateCamera(savedCamera as any, { duration: 1e3 });
    }, [savedCamera]);

    const fitToSuppliedMarkers = useCallback(() => {
        setVehicleId(null);
        if (vehicles.length) {
            mapRef.current?.fitToCoordinates(
                vehicles.map((vehicle) => mapLatLng(vehicle?.last_status))
            );
        }

        // const { latitude, longitude } = findCenter(vehicles);

        // if (!isInitial) {
        //     await mapRef?.current?.animateCamera(
        //         {
        //             heading: 1,
        //             pitch: 1,
        //             altitude: 61e6,
        //             zoom: 1,
        //             center: { latitude, longitude },
        //         },
        //         {duration: 1e3}
        //     );
        // } else {
        //     await mapRef?.current?.animateCamera(
        //         {
        //             heading: 1,
        //             pitch: 1,
        //             altitude: 61e6,
        //             zoom: 1,
        //         },
        //         {duration: 1e3}
        //     );
        // }

        // setTimeout(async () => {
        //     mapRef.current?.fitToElements();
        // }, 1000);
    }, [vehicles]);

    return {
        bottomSheetItemRef,
        bottomSheetListRef,
        vehicleSnapIndex,
        vehiclesSnapIndex,
        mapRef,
        vehicleId,
        handleSheetVehicleChanges,
        openDefaultRegion,
        openVehicle,
        closeVehicle,
        fitToSuppliedMarkers,
    };
};
