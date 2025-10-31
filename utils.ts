import { LatLng } from "react-native-maps";
import moment from "moment";

export const WARNING_TIME_LIMIT = 2400; // 40 minutes
export const DANGER_TIME_LIMIT = 21600; // 6 hours

export function secondsFromNow(timestamp: string): number {
    return moment().diff(moment(timestamp), "s");
}

export function momentDuration(duration: number) {
    return moment.isDuration(duration) ? duration : moment.duration(duration, "s");
}

export function unixTime(time: any) {
    return moment(time).unix();
}

export const mapLatLng = (item: any) => ({
    ...item,
    latitude: Number(item.latitude),
    longitude: Number(item.longitude),
});

export const getMarkerLatLng = (vehicle: App.Vehicle): LatLng => ({
    latitude: Number(vehicle?.last_address?.latitude) || 0,
    longitude: Number(vehicle?.last_address?.longitude) || 0,
});

export const getMarkerLatLngBySnapIndex = (vehicle: App.Vehicle): LatLng => ({
    latitude: Number(vehicle?.last_status?.latitude),
    longitude: Number(vehicle?.last_status?.longitude),
});

export const getTimeByDuration = (diffS: number, strings: any) => {
    const days = Math.floor(diffS / 86400);
    const hrs = Math.floor((diffS % 86400) / 3600);
    const mins = Math.round(((diffS % 86400) % 3600) / 60);

    if (diffS < 60) {
        return `<1${strings.measures.m}`;
    }

    const result = [
        [days, strings.measures.d],
        [hrs, strings.measures.h],
        [mins, strings.measures.m],
    ]
        .filter(([x]) => x)
        .map((x) => x.join(""))
        .join(" ");

    return result;
};

export const getTime = (date: string, strings: any) => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diffMs / 86400000);
    const hrs = Math.floor((diffMs % 86400000) / 3600000);
    const mins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    const result = [
        [days, strings.measures.d],
        [hrs, strings.measures.h],
        [mins, strings.measures.m],
    ]
        .filter(([x]) => x)
        .map((x) => x.join(""))
        .join(" ");

    return result;
};

export const getShortTime = (date: string, strings: any) => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diffMs / 86400000);
    const hrs = Math.floor((diffMs % 86400000) / 3600000);

    let mins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    let dmns = [
        [days, strings.measures.d],
        [hrs, strings.measures.h],
        [mins, strings.measures.m],
    ];

    if (hrs >= 10 && days < 1) {
        dmns = dmns.slice(0, 2);

        if (mins <= 15) {
            dmns[1][0] = dmns[1][0] + "¼";
        }
        if (15 < mins && mins <= 30) {
            dmns[1][0] = dmns[1][0] + "½";
        }
        if (30 < mins && mins <= 45) {
            dmns[1][0] = dmns[1][0] + "¾";
        }
    }

    if (days >= 1) {
        dmns = dmns.slice(0, 2);
    }

    if (days >= 10 && days < 100) {
        dmns = dmns.slice(0, 1);

        if (hrs <= 15) {
            dmns[0][0] = dmns[0][0] + "¼";
        }
        if (15 < hrs && hrs <= 30) {
            dmns[0][0] = dmns[0][0] + "½";
        }
        if (30 < hrs && hrs <= 45) {
            dmns[0][0] = dmns[0][0] + "¾";
        }
    }

    if (days >= 100) {
        dmns = dmns.slice(0, 1);
    }

    const result = dmns
        .filter(([x]) => x)
        .map((x) => x.join(""))
        .join("");

    return result;
};

type AttentionLevel = "play" | "pause" | "unknown" | "stop";

export function attentionLevel(vehicle: App.Vehicle): AttentionLevel {
    const diff = secondsFromNow(vehicle?.last_status?.timestamp);
    if (diff <= WARNING_TIME_LIMIT) {
        return "play";
    } else if (diff <= DANGER_TIME_LIMIT) {
        return "pause";
    } else if (DANGER_TIME_LIMIT <= diff) {
        return "unknown";
    } else {
        return "stop";
    }
}

export function getAttentionLevelByTimestamp(
    timestamp: string,
    isDanger: boolean = false
): "success" | "danger" | "warning" {
    const diff = secondsFromNow(timestamp);

    if (isDanger) {
        return "danger";
    }

    if (diff <= WARNING_TIME_LIMIT) {
        return "success";
    } else if (diff <= DANGER_TIME_LIMIT) {
        return "warning";
    } else {
        return "danger";
    }
}

export function getPointAttentionLevel(
    point: any,
    isDanger: boolean = false
): "success" | "danger" | "warning" | "unknown" {
    const diff =
        unixTime(point.final_status.timestamp) - unixTime(point.initial_status.timestamp);

    if (isDanger) {
        return "unknown";
    }

    if (diff <= WARNING_TIME_LIMIT) {
        return "success";
    } else if (diff <= DANGER_TIME_LIMIT) {
        return "warning";
    } else {
        return "danger";
    }
}

export function getAttentionLevel(
    vehicle: App.Vehicle,
    isDanger: boolean = false
): "success" | "danger" | "warning" {
    const diff = secondsFromNow(vehicle?.last_status?.timestamp);

    if (isDanger) {
        return "danger";
    }

    if (diff <= WARNING_TIME_LIMIT) {
        return "success";
    } else if (diff <= DANGER_TIME_LIMIT) {
        return "warning";
    } else {
        return "danger";
    }
}

// export function findCenter(markers: { lat: number; lng: number }[]) {
export function findCenter(markers: App.Vehicle[]) {
    let lat = 0;
    let lng = 0;

    for (let i = 0; i < markers.length; ++i) {
        lat += Number(markers[i]?.last_address?.latitude) || 0;
        lng += Number(markers[i]?.last_address?.longitude) || 0;
    }

    lat /= markers.length;
    lng /= markers.length;

    return { latitude: lat, longitude: lng };
}