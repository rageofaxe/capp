import { View, StyleSheet } from "react-native";

export default (props: any) => {
    const styles = StyleSheet.create({
        triangle: {
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderBottomWidth: 8,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: "red",
        },
    });
    return <View style={[styles.triangle, props.style]} />;
};