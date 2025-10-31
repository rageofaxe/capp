import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1166_7076)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#F0F0F0" />
        <Path
          d="M6.261 6.957h9.672A8.001 8.001 0 006.26.19v6.767zM4.174 6.956V.973A8.005 8.005 0 00.068 6.956h4.106zM4.174 9.043H.068a8.005 8.005 0 004.106 5.984V9.043zM6.261 9.043v6.767a8.001 8.001 0 009.671-6.766h-9.67z"
          fill="#D80027"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7076">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
