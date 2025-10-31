import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: any) {
  return (
    <Svg
      width={23}
      height={22}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_2182_12172)">
        <Rect x={5.40918} y={3} width={12} height={12} rx={6} fill="#E68F00" />
        <Rect
          x={4.90918}
          y={2.5}
          width={13}
          height={13}
          rx={6.5}
          stroke="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.938 11.449s4.122.05 4.122 0h.82v-4.92H8.938v4.92z"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.938 11.461h2.118s.05-4.932 0-4.932H8.938v4.932zm2.824 0h2.118V6.53h-2.118v4.932z"
          fill="#fff"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default SvgComponent
