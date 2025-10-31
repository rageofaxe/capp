import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={56}
        height={57}
        fill="none"
        {...props}
    >
        <G filter="url(#a)">
            <Rect
                width={48}
                height={48}
                x={4}
                y={2.5}
                fill="#fff"
                rx={24}
                shapeRendering="crispEdges"
            />
            <Path
                stroke="#000"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M36 21.5H20"
            />
            <Path
                stroke="#1C274C"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M36 26.5H20M36 31.5H20"
            />
        </G>
        <Defs></Defs>
    </Svg>
)
export default SvgComponent
