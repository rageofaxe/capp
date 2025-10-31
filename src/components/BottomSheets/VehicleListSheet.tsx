import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Platform, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";

import { useKeyboard } from "@react-native-community/hooks";
import { useUnit } from "effector-react";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    DEFAULT_BSH_HEIGHT,
    DEFAULT_BSH_HEIGHT_DIFF,
    DEFAULT_BSH_HEIGHT_WITH_KEYBOARD,
    HEIGHT,
    Z_INDEXES,
} from "../../constants";
import {
    $ui,
    closeFilters,
    setVehiclesSnapIndex,
    toggleFilters,
} from "../../models/ui/model";
import { BaseButton } from "../Filters/FilterButtons";
import Filters from "../Filters/Filters";
import RoundButton from "../RoundButton";
import SearchBar from "../SearchBar";
import CloseIconSvg from "../SVG/CloseIcon";
import FiltersSvg from "../SVG/Filters";
import CountryList from "./CountryList";
import FitToMarkers from "./fitToMarkers.svg";
import GroupList from "./GroupList";
import VehicleList from "./VehicleList";

type VehicleListSheetProps = {
    vehicles: App.Vehicle[];
    bottomSheetListRef: React.RefObject<BottomSheetModal>;
    snapPoints: any;
    openVehicle: any;
    vehicleId: number | null;
    fitToSuppliedMarkers: any;
};

const PlatformProvider = ({ children }: any) => {
    if (Platform.OS === "ios" || true) {
        return <GestureHandlerRootView style={styles.container}>
            {children}
        </GestureHandlerRootView>
    } else {
    }
}

export default function VehicleListSheet(props: VehicleListSheetProps) {
    
    const {
        bottomSheetListRef,
        openVehicle,
        vehicles,
        vehicleId,
        snapPoints,
        fitToSuppliedMarkers
    } = props;

    const { keyboardShown } = useKeyboard();
    const { shownFilters, vehiclesSnapIndex, isCountryList, isGroupList } = useUnit($ui);

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! VehicleListSheet", !isCountryList && !isGroupList)

    const DefaultRegionButton = useCallback(
        () => (
            <>
                <View style={styles.button}>
                    <RoundButton onTap={() => fitToSuppliedMarkers(vehicles)}>
                        <FitToMarkers />
                    </RoundButton>
                </View>
                {(isCountryList || isGroupList) && (
                    <View style={styles.buttonClose}>
                        <RoundButton
                            style={{ backgroundColor: "#FFF0F4" }}
                            onTap={closeFilters}
                        >
                            <CloseIconSvg color={"#FF0041"} />
                        </RoundButton>
                    </View>
                )}
            </>
        ),
        [vehicles, isCountryList, isGroupList, vehiclesSnapIndex]
    );

    if (vehicleId !== null) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! VehicleListSheet null")
        return
    }

    return (
        <PlatformProvider {...props}>

            <BottomSheet
                ref={bottomSheetListRef}
                index={vehiclesSnapIndex}
                snapPoints={snapPoints}
                onChange={setVehiclesSnapIndex}
                enablePanDownToClose={false}
                handleComponent={DefaultRegionButton}
                style={styles.bottomSheet}
            >
                
                {!isCountryList && !isGroupList && (
                    <View
                        style={
                            {
                                height: keyboardShown
                                    ? DEFAULT_BSH_HEIGHT_WITH_KEYBOARD + 160
                                    : vehiclesSnapIndex == 2
                                        ? HEIGHT - DEFAULT_BSH_HEIGHT_DIFF + 50
                                        : DEFAULT_BSH_HEIGHT - 20,
                            }
                        }
                    >
                        <View
                            style={{
                                ...styles.vehicleListContainer,

                                height: keyboardShown
                                    ? DEFAULT_BSH_HEIGHT_WITH_KEYBOARD
                                    : vehiclesSnapIndex == 2
                                        ? HEIGHT - DEFAULT_BSH_HEIGHT_DIFF - Platform.select({android: 110, ios: 80})
                                        : DEFAULT_BSH_HEIGHT + 40,
                            }}
                        >
                            <VehicleList
                                vehicles={vehicles}
                                openVehicle={openVehicle}
                            ></VehicleList>
                        </View>
                        {shownFilters ? (
                            <View style={styles.searchWrapper}>
                                <Filters toggleFilter={toggleFilters} />
                            </View>
                        ) : (
                            <View style={styles.searchWrapper}>
                                <SearchBar
                                    bottomSheetListRef={bottomSheetListRef}
                                    setVehiclesSnapIndex={setVehiclesSnapIndex}
                                />

                                <BaseButton
                                    active={false}
                                    disabled={false}
                                    count={1}
                                    style={{ borderColor: "#6D6D6D" }}
                                    onTouchEnd={toggleFilters}
                                >
                                    <FiltersSvg />
                                </BaseButton>
                            </View>
                        )}
                    </View>
                )}

                {isCountryList && (
                    <CountryList
                        styles={styles}
                        isKeyBoard={keyboardShown}
                        vehiclesSnapIndex={vehiclesSnapIndex}
                    />
                )}

                {isGroupList && (
                    <GroupList
                        styles={styles}
                        isKeyBoard={keyboardShown}
                        vehiclesSnapIndex={vehiclesSnapIndex}
                    />
                )}
            </BottomSheet>

        </PlatformProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        pointerEvents: "box-none",
        flex: 1,
        zIndex: Z_INDEXES.BOTTOM_SHEET,
    },

    bottomSheet: {
        display: "flex",
        flex: 1
    },
    vehicleListContainer: {
        margin: 16,
    },
    button: {
        margin: 0,
        width: 64,
        position: "absolute",
        top: -64,
        right: 0,
    },
    buttonClose: {
        margin: 0,
        width: 64,
        position: "absolute",
        top: -64,
        left: 16,
    },
    searchWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        gap: 16,
    },
    searchScroll: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "flex-start",
    },
});