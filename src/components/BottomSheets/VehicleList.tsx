import { useUnit } from "effector-react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { $ui } from "../../models/ui/model";
import VehicleListItem from "../VehicleListItem";

import {
    $numberSorting,
    $searchedText,
    $statusSorting,
    toggleNumberSorting,
    toggleStatusSorting,
} from "../../models/filters/model";
import { $isArchivedVehicles, $strings } from "../../models/settings/model";
import SortTag from "../SortTag";


type Props = {
    vehicles: App.Vehicle[];
    openVehicle: Function;
};

export default (props: Props) => {
    const { vehicles, openVehicle } = props;
    const { vehiclesSnapIndex } = useUnit($ui);
    const strings = useUnit<any>($strings);
    const statusSorting = useUnit($statusSorting);
    const numberSorting = useUnit($numberSorting);
    const search = useUnit($searchedText)
    const isArchivedVehicles = useUnit($isArchivedVehicles)

    const filteredVehicles = vehicles.filter(v => !v.archived_at || search || isArchivedVehicles)

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.row}>
                    <Text style={styles.topBarLabel}>{strings.found}: </Text>
                    <Text style={styles.topBarLabelBold}>{filteredVehicles.length}</Text>
                </View>
                <View style={styles.gappedRow}>
                    <SortTag
                        active={!!numberSorting?.active}
                        status={numberSorting?.value}
                        label={strings.number}
                        onTouchEnd={() => toggleNumberSorting()}
                    />
                    <SortTag
                        active={!!statusSorting?.active}
                        status={statusSorting?.value}
                        label={strings.status}
                        onTouchEnd={() => toggleStatusSorting()}
                    />
                </View>
            </View>
            <ScrollView
                contentContainerStyle={styles.vehicleList}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
                overScrollMode={"always"}
            >
                {filteredVehicles.map((vehicle: App.Vehicle) => (
                    <VehicleListItem
                        {...vehicle}
                        key={vehicle.id}
                        openVehicle={() => openVehicle(vehicle)}
                        vehiclesSnapIndex={vehiclesSnapIndex}
                    />
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    bottomSheet: {
        display: "flex",
        height: "auto",
    },
    vehicleList: {
        marginHorizontal: 0,
        marginVertical: 0,
    },
    button: {
        margin: 0,
        width: 64,
        position: "absolute",
        top: -64,
        right: 0,
    },
    searchWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        gap: 16,
    },
    textInput: {
        alignSelf: "stretch",
        flex: 1,
        marginRight: 24,
        color: "black",
        textAlign: "left",
        height: 32,
    },
    topBar: {
        backgroundColor: "#F7F7F7",
        borderRadius: 4,
        padding: 8,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        flexDirection: "row",
    },
    row: {
        flexDirection: "row",
    },
    gappedRow: {
        flexDirection: "row",
        gap: 8,
    },
    topBarLabel: {
        fontSize: 15,
    },
    topBarLabelBold: {
        fontSize: 15,
        fontWeight: "700",
    },
});