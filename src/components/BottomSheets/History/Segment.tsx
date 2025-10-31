import { useUnit } from "effector-react";
import moment from "moment";
import { Text, View } from "react-native";
import { getAttentionLevel, getAttentionLevelByTimestamp, getTimeByDuration } from "../../../../utils";
import { $strings } from "../../../models/settings/model";
import TripInfoSVG from "../../SVG/TripInfoSVG";
import { pointStyles, segmentStyle } from "./styles";
import Triangle from "./Triangle";

export default (props: any) => {
    const {
        data: {
            id,
            pointDuration,
            final_status,
            odometer,
            prevPoint,
            isInsteadHalfSegment
        },
        highlight,
        onPress,
        now,
        vehicle,
        index,
        dateFrom
    } = props;    

    const strings = useUnit<any>($strings);
    const printDateIfIsPrevDay = (date: string) => dateFrom !== moment(date).format("YYYY-MM-DD") ? `(${moment(date).format("DD.MM")})` : '';
    const distance = odometer / 1000;
    const kmh = (mps: number) => (mps / 1000) * 3600;

    const nowStatus = getAttentionLevelByTimestamp(final_status.timestamp) as
        | "danger"
        | "success"
        | "warning";

    const attentionLevel = getAttentionLevel(vehicle, vehicle.activity === "unknown");

    const printPrevDate = attentionLevel === "success" && now
    ? strings.history.now
    : `${moment(prevPoint?.initial_status?.timestamp).format(
        "HH:mm"
    )}`

    const iconColor = {
        success: "#2ecc71",
        warning: "#f5a623",
        danger: "#ff434b",
        unknown: "#ff434b",
    }[attentionLevel];

    if (isInsteadHalfSegment) {
        return null;
    }

    return (
        <View style={{ flexDirection: "row" }}>
            <View style={[segmentStyle.row1]}>
                <View style={{ paddingLeft: 6 }}>
                    <View style={segmentStyle.time}>
                        {now ? (
                            <Triangle
                                style={[
                                    segmentStyle.triangleRight,
                                    { borderBottomColor: now ? iconColor : iconColor },
                                ]}
                            />
                        ) : (
                            <View
                                style={[
                                    segmentStyle.ball,
                                    {
                                        backgroundColor: now
                                            ? segmentStyle[nowStatus].backgroundColor
                                            : pointStyles.border.borderColor,
                                    },
                                ]}
                            ></View>
                        )}

                        <Text testID={`segmentTimeInitial${index}`}>
                            {printPrevDate} 
                            {printPrevDate !== '00:00' && printDateIfIsPrevDay(prevPoint?.initial_status?.timestamp)}
                        </Text>
                    </View>
                    <View
                        style={{
                            borderColor: pointStyles.border.borderColor,
                            borderLeftWidth: 1,
                            height: 16,
                            marginLeft: 3,
                        }}
                    ></View>
                    <View style={segmentStyle.time}>
                        <View
                            style={[
                                segmentStyle.ball,
                                { backgroundColor: pointStyles.border.borderColor },
                            ]}
                        ></View>
                        <Text testID={`segmentTimeFinal${index}`}>{`${moment(final_status.timestamp).format("HH:mm")} ${printDateIfIsPrevDay(final_status.timestamp)}`}</Text>
                    </View>
                </View>
            </View>

            <View
                style={[
                    segmentStyle.container,
                    segmentStyle.row4,
                    {
                        borderColor: highlight
                            ? "#007AFF"
                            : pointStyles.border.borderColor,
                    },
                ]}
                onTouchEnd={onPress}
            >
                <View style={[segmentStyle.half, { flex: 0.34 }]}>
                    <View style={pointStyles.row}>
                        <TripInfoSVG.Outline color={"#007AFF"} />
                        <Text testID={`segmentDistance${index}`}>{distance.toFixed(1)} km</Text>
                    </View>
                </View>
                <View style={[segmentStyle.half, { flex: 0.66 }]}>
                    <View style={pointStyles.row}>
                        <TripInfoSVG.StartedSVG color={"#007AFF"} />
                        <Text testID={`segmentDuration${index}`}>{getTimeByDuration(pointDuration, strings)}</Text>
                    </View>

                    <View style={pointStyles.row}>
                        <TripInfoSVG.SpeedSVG color={"#007AFF"} />
                        <Text>{Math.round(kmh(odometer / pointDuration))} km/h</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
