import { useUnit } from "effector-react";
import moment from "moment";
import { Text, View } from "react-native";
import { getTime, getTimeByDuration, unixTime } from "../../../../utils";
import { $strings } from "../../../models/settings/model";
import Stopped from "../../SVG/Pause";
import Parked from "../../SVG/Stop";
import TripInfoSVG from "../../SVG/TripInfoSVG";
import { pointStyles } from "./styles";

const matchIcon = (kind: "parked" | "stopped") => {
    return (
        {
            stopped: Stopped,
            parked: Parked,
        }[kind] || null
    );
};

export default (props: any) => {
    const {
        data: { id, address, duration, final_status, initial_status, kind, isInsteadHalfSegment },
        highlight,
        dateFrom,
        attentionLevel,
        onPress,
        isFirst = false,
        isFirstSegment = false,
        index,
    } = props;

    const strings = useUnit<any>($strings);
    const isToday = dateFrom === moment().format("YYYY-MM-DD");
    const KindIcon = matchIcon(kind);

    const time = () => {
        if (isFirst && !isFirstSegment && attentionLevel !== "danger" && isToday) {
            return getTime(props.data?.activity_changed_at, strings);
        } else if (isFirst && attentionLevel === "danger" && isToday) {
            return getTimeByDuration(duration, strings);
        } else {
            return getTimeByDuration(
                unixTime(final_status.timestamp) - unixTime(initial_status.timestamp),
                strings
            );
        }
    };

    if (isInsteadHalfSegment || id === "firstPoint") {
        return <View testID={`pointTime${index}`} />;
    }

    return (
        <View onTouchEnd={onPress}>
            <View
                style={[
                    pointStyles.row,
                    pointStyles.border,
                    {
                        justifyContent: "space-between",
                        borderColor: highlight
                            ? "#007AFF"
                            : pointStyles.border.borderColor,
                    },
                ]}
            >
                <View style={[pointStyles.row, { flex: 1 }]}>
                    <View style={pointStyles.status}>
                        {!!KindIcon && <KindIcon color="white" />}
                    </View>
                    <TripInfoSVG.StartedSVG color={"#007AFF"} />
                    <Text testID={`pointTime${index}`}>{time() ? time() : " <1m"}</Text>
                </View>
                <View style={[pointStyles.time, { flex: 1 }]}>
                    <TripInfoSVG.AddressSVG color={"#007AFF"} />
                    <Text numberOfLines={1} ellipsizeMode="tail">
                        {address.text}
                    </Text>
                </View>
            </View>
        </View>
    );
};