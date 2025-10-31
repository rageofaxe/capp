import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
    return (
        <Svg
            width={12}
            height={16}
            viewBox="0 0 16 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14.927 5.25v11.786c0 .145-.053.27-.16.376a.515.515 0 01-.376.16h-4.286a.515.515 0 01-.377-.16.515.515 0 01-.159-.376V5.25c0-.145.053-.27.16-.377a.515.515 0 01.376-.159h4.286c.145 0 .27.053.376.16.107.105.16.23.16.376zm-7.5 0v11.786c0 .145-.054.27-.16.376a.515.515 0 01-.376.16H2.605a.515.515 0 01-.377-.16.515.515 0 01-.159-.376V5.25c0-.145.053-.27.16-.377a.515.515 0 01.376-.159h4.286c.145 0 .27.053.376.16a.515.515 0 01.16.376z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;
