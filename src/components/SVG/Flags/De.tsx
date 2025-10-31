import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"

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
      <G clipPath="url(#clip0_1084_47892)">
        <Path d="M0 10.667h16V16H0v-5.333z" fill="#FFCE00" />
        <Path d="M0 0h16v5.333H0V0z" fill="#000" />
        <Path d="M0 5.333h16v5.334H0V5.333z" fill="#D00" />
      </G>
      <Defs>
        <ClipPath id="clip0_1084_47892">
          <Rect width={16} height={16} rx={8} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
