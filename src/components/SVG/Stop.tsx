import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
    return (
        <Svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M11.998.5v11c0 .273-.226.5-.5.5h-11a.504.504 0 01-.5-.5V.5c0-.273.227-.5.5-.5h11c.274 0 .5.227.5.5z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;
