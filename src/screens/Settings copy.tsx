
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';

import BackArrowSVG from "../components/SVG/BackArrow";

import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useUnit } from "effector-react";
import { HEIGHT } from "../constants";
import "../models";
import { $currentLiveMode, LiveModes, setCenterPoint, setCenterPointWithSegment, setCurrentLiveMode } from "../models/modes";
import { $isArchivedVehicles, $locale, $strings, toggleArchivedVehicles } from "../models/settings/model";

export default function Settings() {
    const { navigate } = useNavigation<any>();
    const strings = useUnit<any>($strings);
    const locale = useUnit<any>($locale);
    const currentLiveMode = useUnit($currentLiveMode)
    const isArchivedVehicles = useUnit($isArchivedVehicles) as boolean

    const back = () => {
        navigate("Main")
    }

    const toggleSwitchArchive = () => {
        toggleArchivedVehicles()
    }

    const changeLiveMode = (mode: LiveModes) => {
        setCurrentLiveMode(mode)
        if (mode === LiveModes.REGULAR) {
            setCenterPoint(false)
            setCenterPointWithSegment(false)
        }
        if (mode === LiveModes.POINT_IN_CENTER) {
            setCenterPoint(true)
            setCenterPointWithSegment(false)
        }
        if (mode === LiveModes.POINT_IN_CENTER_WITH_SEGMENT) {
            setCenterPoint(false)
            setCenterPointWithSegment(true)
        }
    }

    const liveModeOptions = [
        { label: strings.settings.liveModes.point, value: LiveModes.POINT_IN_CENTER, key: LiveModes.POINT_IN_CENTER },
        { label: strings.settings.liveModes.pointWithSegment, value: LiveModes.POINT_IN_CENTER_WITH_SEGMENT, key: LiveModes.POINT_IN_CENTER_WITH_SEGMENT },
        { label: strings.settings.liveModes.segment, value: LiveModes.REGULAR, key: LiveModes.REGULAR },
    ]

    console.log("SETTINGS")

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="dark" backgroundColor="#EAFAF1" />

            <View style={styles.container}>
                <View style={[styles.row, { marginBottom: 48 }]}>
                    <TouchableOpacity onPress={back}><BackArrowSVG /></TouchableOpacity>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>{strings.settings.h1}</Text>
                    </View>
                    <View ><Text></Text></View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.groupText}>{strings.settings.general}</Text>
                </View>
                <View style={[styles.optionView, styles.row]}>
                    <View><Text style={styles.optionText}>{strings.settings.archivedObjects}</Text></View>
                    <Switch
                        trackColor={{ false: "#E6E6E6", true: "#E6E6E6" }}
                        thumbColor={isArchivedVehicles ? "#0070CE" : "#f4f3f4"}
                        ios_backgroundColor="#E6E6E6"
                        onValueChange={toggleSwitchArchive}
                        value={isArchivedVehicles}
                    />
                </View>
                <View style={[styles.optionView, styles.row]}>
                    <View><Text style={styles.optionText}>{strings.settings.liveMode}</Text></View>
                    <RNPickerSelect
                        onValueChange={(itemValue: LiveModes) => {
                            console.log("itemValue", itemValue)
                            if (itemValue) {
                                changeLiveMode(itemValue)
                            }
                        }}
                        placeholder={{}}
                        value={currentLiveMode}
                        items={liveModeOptions}

                    >
                        <View style={pickerSelectStyles.select}>
                            <Text>{liveModeOptions.find(o => o.value === currentLiveMode)?.label}</Text>
                            <View style={pickerSelectStyles.icon} />
                        </View>
                    </RNPickerSelect>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 4,
        borderWidth: 0,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        textAlign: "right",
        width: 160,
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'red',
        width: 200,
        paddingRight: 130, // to ensure the text is never behind the icon,
    },
    inputIOSContainer: { pointerEvents: "none", color: "red" },
    icon: {
        borderBottomColor: "blue",
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        width: 10,
        height: 10,
        borderStyle: "solid",
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        marginTop: 6,
    }, select: {
        flexDirection: "row", 
        gap: 16, 
        paddingRight: 20, 
        paddingVertical: 10,
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 24
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    titleView: {

    },
    titleText: {
        fontSize: 17,
        fontWeight: "900",
    },
    groupText: {
        color: "#3C3C4399"
    },
    optionView: {
        borderBottomColor: "#C6C6C8",
        borderBottomWidth: 1,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    optionText: {
        fontSize: 17
    },
    formContainer: {
        padding: 32,
        gap: 16,
    },
    formHeader: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },

    footerContainer: {
        height: HEIGHT / 2,
    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderColor: "#CBCBCB",
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: "#0070CE",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11,
    },
    keepLogged: {
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    keepLabel: {
        fontWeight: "500",
        fontSize: 15,
    },
    buttonText: {
        fontSize: 15,
        color: "white",
    },
    picker: {
        height: 50,
        width: 200,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
    },
});