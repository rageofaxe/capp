import { useUnit } from "effector-react";
import moment from "moment";
import { Text, View } from "react-native";
import { getAttentionLevel } from "../../../../utils";
import { $strings } from "../../../models/settings/model";
import { segmentStyle } from "./styles";

export default (props: { vehicle: App.Vehicle; point: any; flag: "first" | "last", dateFrom: string }) => {
    const { point, vehicle, flag, dateFrom } = props;
    const strings = useUnit<any>($strings);
    // const attentionLevel = vehicle.activity === "unknown" ? "unknown" : getAttentionLevel(vehicle);
    const attentionLevel = getAttentionLevel(vehicle);

    const iconColor = {
        success: "#2ecc71",
        warning: "#f5a623",
        danger: "#ff434b",
    }[attentionLevel];

    const isLastPoint = point.id === vehicle.last_stop_point.id;

    // const isMoving =
    //     vehicle.activity === "moving" || ["warning", "danger"].includes(attentionLevel);
    // const backgroundColor = isLastPoint && isMoving ? iconColor : "#BBB";

    const backgroundColor = isLastPoint && flag === "first" ? iconColor : "#BBB";

    const firstPointBetweenDays =
        flag === "first" &&
        moment(point.final_status.timestamp).format("YYYY-MM-DD") !==
            moment(point.initial_status.timestamp).format("YYYY-MM-DD");

    const firstHalfSegmentTime =
        attentionLevel === "success" && !firstPointBetweenDays
            ? strings.history.now
            : moment(point.final_status.timestamp).format("HH:mm");

    const lastHalfSegmentTime = moment(point.initial_status.timestamp).format("HH:mm");
    const time = flag === "first" ? firstHalfSegmentTime : lastHalfSegmentTime;
    const printDateIfIsPrevDay = (date: any) => 
        time !== '00:00' 
        && dateFrom !== moment(date).format("YYYY-MM-DD") 
        && flag === "last" 
            ? `(${moment(date).format("DD.MM")})` 
            : '';
    return (
        <View style={segmentStyle.timeLast}>
            <View style={[segmentStyle.ball, { backgroundColor }]}></View>
            <Text testID={`halfsegment-${flag}`}>
                {time} {printDateIfIsPrevDay(point.initial_status.timestamp)}
            </Text>
        </View>
    );
};