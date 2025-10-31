import { Text, View } from "react-native";
import TripInfoSVG from "./SVG/TripInfoSVG";
import DriverInfoSVG from "./SVG/DriverInfoSVG";

type IconTextProps = {
    label: string | null;
    icon: keyof typeof TripInfoSVG | keyof typeof DriverInfoSVG;
    bold?: boolean;
    msr?: string;
}

export default (props: IconTextProps) => {
    if (!props.label) {
        return null;
    }


    const Icon = {
        ...TripInfoSVG,
        ...DriverInfoSVG
    }[props.icon]

    return <View style={{ gap: 8, flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
        <Icon />
        <Text style={{ fontWeight: props.bold ? "600" : "300" }}>{props.label} {props?.msr}</Text>
    </View>
}