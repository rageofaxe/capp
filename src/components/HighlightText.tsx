import { View, Text } from "react-native";

type Props =
    | {
          highlight: string;
      }
    | any;

export default (props: Props) => {
    const { children, highlight, ...rest } = props;
    const text = children || "";

    const nodes = text.toString().split(new RegExp(`(${highlight})`, "gi"));
    const [firstNode, secondNode, ...restNodes] = nodes;
    const isHighlighted = nodes.length >= 3;

    return (
        <View style={{ flexDirection: "row" }}>
            {isHighlighted && nodes[1].toLowerCase() === highlight.toLowerCase() ? (
                <>
                    <Text {...rest}>{firstNode.replaceAll(",", "")}</Text>
                    <Text {...rest} style={{ ...rest.style, color: "#FF0041" }}>
                        {secondNode.replaceAll(",", "")}
                    </Text>
                    <Text {...rest}>{restNodes.join("").replaceAll(",", "")}</Text>
                </>
            ) : (
                <Text {...rest}>{text}</Text>
            )}
        </View>
    );
};
