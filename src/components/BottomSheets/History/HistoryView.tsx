import { useUnit } from "effector-react";
import { Text, View } from "react-native";
import { getAttentionLevel } from "../../../../utils";
import { WIDTH } from "../../../constants";
import { $strings } from "../../../models/settings/model";
import HalfSegment from "./HalfSegment";
import Point from "./Point";
import Segment from "./Segment";

type HistoryScrollView = {
    dateFrom: string;
    historyPoints: any[];
    vehicle: App.Vehicle;
    zoomToSegment: Function;
    zoomToPoint: Function;
    pendingPoints?: any;
    selectedHistoryItemId?: string;
};

export default (props: HistoryScrollView) => {
    const {
        vehicle,
        historyPoints,
        pendingPoints,
        selectedHistoryItemId,
        dateFrom,
        zoomToSegment,
        zoomToPoint,
    } = props;
    const strings = useUnit<any>($strings);
    const attentionLevel = getAttentionLevel(vehicle, vehicle.activity === "unknown");

    const isHalfSgement = (index: number, point: any) => {
        let condition = index === 0;
        if (vehicle.activity === "unknown" && index === 1) {
            return true;
        }
        return condition && !point.isInsteadHalfSegment && !point.isLastPoint;
    };

    return (
        <View style={{ paddingBottom: 20 }}>
            {/* <LastPoint /> */}
            {!historyPoints?.length && (
                <View>
                    {pendingPoints && <Text>{strings.history.loading}</Text>}
                    {!pendingPoints && <Text>{strings.history.noData}</Text>}
                </View>
            )}
            {!!historyPoints?.length &&
                historyPoints.map((point: any, index: number) => {
                    const nowPredicate = (now: boolean, i: number) => {
                        return now ? true : !!i;
                    };

                    return (
                        <View key={`${point.id}-${index}`} style={{ width: WIDTH - 32 }}>
                            {isHalfSgement(index, point) ? (
                                <HalfSegment
                                    point={point}
                                    vehicle={vehicle}
                                    dateFrom={dateFrom}
                                    flag="first"
                                />
                            ) : (
                                <Segment
                                    key={`segment${point.id}`}
                                    data={point}
                                    now={index === 0}
                                    highlight={
                                        selectedHistoryItemId === `segment${point.id}`
                                    }
                                    onPress={() => zoomToSegment(point)}
                                    vehicle={vehicle}
                                    dateFrom={dateFrom}
                                    index={index}
                                />
                            )}

                            <Point
                                key={`point${point.id}-${index}`}
                                data={point}
                                index={index}
                                highlight={selectedHistoryItemId === `point${point.id}`}
                                isFirst={index === 0}
                                onPress={() => zoomToPoint(point)}
                                attentionLevel={attentionLevel}
                                dateFrom={dateFrom}
                                isFirstSegment={nowPredicate(point.isLastPoint, index)}
                            />

                            {index === historyPoints.length - 1 &&
                                point.id !== "firstPoint" && (
                                    <HalfSegment
                                        point={point}
                                        vehicle={vehicle}
                                        dateFrom={dateFrom}
                                        flag="last"
                                    />
                                )}
                        </View>
                    );
                })}
        </View>
    );
};