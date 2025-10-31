import { useUnit } from "effector-react";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";

import 'moment/locale/de';
import 'moment/locale/ru';
import { mapLatLng } from "../../../utils";
import {
    getVehiclePointsFx,
    setDateFrom,
    setMaxDateFrom,
    setSegmentRoute,
    setSelectedHistoryItemId,
} from "../../models/history/model";


import Arrow from "../SVG/Arrow";

import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { HEIGHT, WIDTH } from "../../constants";
import { setFollowMode, setLiveMode } from "../../models/modes";
import { $locale, $strings } from "../../models/settings/model";
import HistoryView from "./History/HistoryView";


export type HistorySheetProps = {
    vehicle: App.Vehicle;
    mapRef: React.RefObject<MapView>;
    selectedHistoryItemId: string;
    historyPoints: any[];
    vehicleSnapIndex: number;
    dateFrom: string;
    maxDateFrom: string;
};

export default function HistorySheet(props: HistorySheetProps) {
    
    
    const {
        vehicle,
        mapRef,
        selectedHistoryItemId,
        historyPoints,
        vehicleSnapIndex,
        dateFrom,
        maxDateFrom,
    } = props;

    const strings = useUnit<any>($strings);
    const locale = useUnit<any>($locale);

    useEffect(() => {
        moment.locale(locale);
        LocaleConfig.defaultLocale = locale
    }, [locale])

    useEffect(() => {
        setDateFrom(moment(vehicle.activity_changed_at).format("YYYY-MM-DD"));
        setMaxDateFrom(moment(vehicle.last_status.timestamp).format("YYYY-MM-DD"));
    }, [vehicle.activity_changed_at]);

    const [isCalendar, setCalendar] = useState(false);

    const zoomToSegment = (point: any) => {
        setLiveMode(false);
        setFollowMode(false);
        mapRef.current?.fitToCoordinates(point.segment.map(mapLatLng));
        setSegmentRoute(point.segment);
        setSelectedHistoryItemId(`segment${point.id}`);
    };

    const pendingPoints = useUnit(getVehiclePointsFx.pending);

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
        <View style={{ marginHorizontal: 16, width: WIDTH - 32 }}>
            <ScrollView
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
                overScrollMode={"always"}
                style={[
                    styles.container,
                    vehicleSnapIndex === 2
                        ? { maxHeight: HEIGHT - 240 }
                        : { maxHeight: 340 },
                ]}
            >
                <TouchableOpacity
                    style={styles.calendarLabelView}
                    onPress={() => setCalendar((state) => !state)}
                >
                    <Text style={styles.calendarLabelText}>
                        
                        {moment(dateFrom,).calendar().split(strings.history.calendarDivider)[0]},{" "}
                        {moment(dateFrom).format("dddd DD MMM ")}
                    </Text>
                    <View
                        style={{
                            transform: [{ rotate: isCalendar ? "180deg" : "0deg" }],
                        }}
                    >
                        <Arrow />
                    </View>
                </TouchableOpacity>
                {isCalendar && (
                    <Calendar
                        initialDate={
                            moment(maxDateFrom).utc() <= moment(dateFrom).utc()
                                ? maxDateFrom
                                : dateFrom
                        }
                        style={{ paddingBottom: 20 }}
                        maxDate={maxDateFrom}
                        onDayPress={(day: any) => {
                            if (dateFrom !== day.dateString) {
                                setDateFrom(day.dateString);
                            }

                            setCalendar(false);
                        }}
                        markingType="custom"
                        // hideExtraDays={true}
                        markedDates={{
                            [moment().format("YYYY-MM-DD")]: {
                                customStyles: {
                                    text: { color: "#007AFF" },
                                    container: {
                                        borderRadius: 0,
                                        borderColor: "#007AFF",
                                        borderWidth: 2,
                                    },
                                },
                            },

                            [dateFrom]: {
                                selected: true,
                                customStyles: {
                                    container: {
                                        borderRadius: 0,
                                        backgroundColor: "#007AFF",
                                    },
                                },
                            },
                        }}
                    />
                )}
                {!isCalendar && (
                    <HistoryView
                        vehicle={vehicle}
                        dateFrom={dateFrom}
                        historyPoints={historyPoints}
                        pendingPoints={pendingPoints}
                        selectedHistoryItemId={selectedHistoryItemId}
                        zoomToPoint={zoomToPoint}
                        zoomToSegment={zoomToSegment}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 330,
        width: WIDTH - 32,
    },
    calendarLabelText: {
        fontWeight: "700",
        fontSize: 15,
        textTransform: "capitalize"
    },
    calendarLabelView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
        marginBottom: 16,
        flex: 1,
    },
});