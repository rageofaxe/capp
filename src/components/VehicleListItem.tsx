import { useUnit } from "effector-react";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { useKeyboard } from "@react-native-community/hooks";
import { useCallback } from "react";
import { getAttentionLevel, getShortTime } from "../../utils";
import { WIDTH } from "../constants";
import { $searchedText } from "../models/filters/model";
import { $strings } from "../models/settings/model";
import HighlightText from "./HighlightText";
import Clock from "./SVG/Clock";
import Driver from "./SVG/Driver";
import ListMarker from "./SVG/ListMarker";
import PauseSVG from "./SVG/Pause";
import PlaySVG from "./SVG/Play";
import RepairSVG from "./SVG/Repair";
import StopSVG from "./SVG/Stop";
import SatSVG from "./SVG/TripInfoSVG/Sat";
import UnknownSVG from "./SVG/Unknown";
import VehiclesSVG from "./SVG/Vehicles";

const Time = (props: App.Vehicle) => {
    const Icon = {
        moving: PlaySVG,
        parked: StopSVG,
        stopped: PauseSVG,
        repair: RepairSVG,
        unknown: UnknownSVG,
    }[props?.activity];

    const iconColor = {
        success: "#2ecc71",
        warning: "#f5a623",
        danger: "#ff434b",
        unknown: "#ff434b",
    };

    const strings = useUnit($strings);
    const colorStyle = timeStyle[getAttentionLevel(props, props.activity === "unknown")];

    return (
        <View style={[timeStyle.common, colorStyle]}>
            {Icon && !props.archived_at && (
                <Icon
                    color={
                        iconColor[getAttentionLevel(props, props.activity === "unknown")]
                    }
                />
            )}

            {!!props.archived_at && <Text style={{fontWeight: "900"}}>A</Text>}

            <Text>{getShortTime(props.activity_changed_at, strings)}</Text>
        </View>
    );
};

export default (props: App.Vehicle & { vehiclesSnapIndex: number; openVehicle: any }) => {
    const ListMarkerSvg = useCallback(() => <ListMarker />, []);
    const DriverSvg = useCallback(() => <Driver />, []);
    const ClockSvg = useCallback(() => <Clock />, []);
    const searchedText = useUnit($searchedText);
    const { keyboardShown } = useKeyboard();

    const displayName = props.display_name;
    const address = props?.last_address?.text || "";
    const driver = props.drivers?.[0]?.last_name + props.drivers?.[0]?.first_name || "";

    const nodes = [displayName, address, driver]
        .join("")
        .split(new RegExp(`(${searchedText})`, "gi"));
    const isHighlighted = nodes.length === 3;
    const tap = Gesture.Tap().runOnJS(true).numberOfTaps(1).onEnd(props.openVehicle);
    const iconName = props.single_svg_id
        .replaceAll("-", "__")
        .replaceAll(".", "") as keyof typeof VehiclesSVG;

    const trailerIconName = props?.trailer?.single_svg_id
        .replaceAll("-", "__")
        .replaceAll(".", "") as keyof typeof VehiclesSVG;

    const VehicleIcon = VehiclesSVG[iconName];
    const VehicleTrailerIcon = VehiclesSVG[trailerIconName];

    return (
        <GestureDetector gesture={tap}>
            <View style={styles.container}>
                <View style={styles.rowBetween}>
                    <View style={[styles.row, styles.row66]}>
                        {/* <Text>{"props"} - {props?.last_status?.longitude} - {props?.last_status?.latitude}</Text> */}
                        <Time {...props} />
                        <HighlightText
                            highlight={searchedText}
                            style={styles.displayName}
                        >
                            {displayName} {props.trailer && ` + ${props?.trailer?.display_name}`}
                        </HighlightText>
                        {props.has_telematics && <SatSVG />}
                    </View>
                    <View style={{ alignItems: "flex-end", flexDirection: "row", gap: 8 }}>
                        <VehicleIcon
                            height="25"
                            width="50"
                            preserveAspectRatio="xMinYMin slice"
                        />

                        {props.trailer && <VehicleTrailerIcon
                            height="25"
                            width="100"
                            preserveAspectRatio="xMinYMin slice"
                        />}
                    </View>
                </View>
                {address && (
                    <View style={styles.row}>
                        <ListMarkerSvg />
                        <HighlightText
                            highlight={searchedText}
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                            style={styles.address}
                        >
                            {address}
                        </HighlightText>
                    </View>
                )}
                {((props.vehiclesSnapIndex === 2 && !keyboardShown) || isHighlighted) && (
                    <>
                        {props.drivers?.[0]?.last_name && (
                            <View style={styles.row}>
                                <DriverSvg />
                                <HighlightText
                                    highlight={searchedText}
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}
                                    style={styles.address}
                                >
                                    {props.drivers[0]?.first_name}{" "}
                                    {props.drivers[0]?.last_name}
                                </HighlightText>
                            </View>
                        )}
                        {props.activity_changed_at && (
                            <View style={styles.row}>
                                <ClockSvg />
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}
                                    style={styles.address}
                                >
                                    {moment(props.activity_changed_at).format(
                                        "DD.MM.YYYY, HH:mm"
                                    )}{" "}
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </GestureDetector>
    );
};

const timeStyle = StyleSheet.create({
    common: {
        borderRadius: 4,
        paddingHorizontal: 8,
        alignItems: "center",
        minWidth: 44,
        flexDirection: "row",
        gap: 8,
    },
    success: {
        backgroundColor: "#EAFAF1",
    },
    warning: {
        backgroundColor: "#FFF9CC",
    },
    danger: {
        backgroundColor: "#FFF0F4",
    },
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomColor: "#CFCDD1",
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    row66: {
        width: WIDTH - 128,
        overflow: "scroll",
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    address: {
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "left",
    },
    displayName: {
        fontSize: 15,
        fontWeight: "700",
        lineHeight: 18,
        letterSpacing: 0,
    },
});