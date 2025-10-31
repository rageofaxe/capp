import { StyleSheet, TouchableOpacity } from "react-native";

export default (props: any) => {
    const { onTap, style, onLongPress } = props;

    const handleOnPress = () => {
        requestAnimationFrame(() => {
            onTap();
        });
    };

    const handleOnLongPress = () => {
        requestAnimationFrame(() => {
            if (onLongPress) {
                onLongPress();
            }
        });
    };

    return (
        <TouchableOpacity
            style={{ ...styles.button, ...style }}
            onLongPress={handleOnLongPress}
            onPress={handleOnPress}
        >
            {props.children}
        </TouchableOpacity>
    );

    // return (
    //     <TouchableOpacity
    //         style={{ ...styles.button, ...style }}
    //         onLongPress={onLongPress}
    //         onPress={onTap}
    //     >
    //         {props.children}
    //     </TouchableOpacity>
    // );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 24,
        width: 48,
        height: 48,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },
});
