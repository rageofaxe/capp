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
      <G clipPath="url(#clip0_1166_7090)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#F0F0F0" />
        <Path
          d="M16 8A8.003 8.003 0 0010.783.498v15.004A8.003 8.003 0 0016 8z"
          fill="#D80027"
        />
        <Path
          d="M0 8a8.003 8.003 0 005.217 7.502V.498A8.003 8.003 0 000 8z"
          fill="#0052B4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7090">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
