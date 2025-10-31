import { StyleSheet } from "react-native";

export const segmentStyle = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#BBB",
        height: 36,
        marginVertical: 8,
        paddingHorizontal: 8,
        borderLeftWidth: 0,
        flexDirection: "row",
    },
    half: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 36,
        flex: 1,
    },
    row4: {
        flex: 0.8,
    },
    row1: {
        flex: 0.2,
    },
    ball: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    time: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    timeLast: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginLeft: 6,
    },
    success: {
        backgroundColor: "#0afa72",
    },
    warning: {
        backgroundColor: "#ffe20a",
    },
    danger: {
        backgroundColor: "#ff3d71",
    },
    triangleRight: {
        transform: [{ rotate: "90deg" }],
    },
});

export const pointStyles = StyleSheet.create({
    circle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#9B9B9B",
        marginRight: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    border: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#BBB",
        height: 36,
    },
    status: {
        marginRight: 16,
        backgroundColor: "#E68F00",
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        width: 28,
        borderRadius: 4,
        marginLeft: 4,
    },
    time: {
        marginRight: 16,
        paddingRight: 8,
        flexDirection: "row",
        gap: 4,
    },
    distance: {
        // marginRight: 16,
    },
    speed: {
        // marginRight: 16,
    },
    rest: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
});