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
      <G clipPath="url(#clip0_1166_7193)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#F0F0F0" />
        <Path
          d="M15.502 10.783A7.982 7.982 0 0016 8c0-.979-.176-1.916-.498-2.783H.498A7.983 7.983 0 000 8c0 .978.176 1.916.498 2.783L8 11.478l7.502-.695z"
          fill="#0052B4"
        />
        <Path
          d="M8 16a8.003 8.003 0 007.502-5.217H.498A8.003 8.003 0 008 16z"
          fill="#D80027"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7193">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
