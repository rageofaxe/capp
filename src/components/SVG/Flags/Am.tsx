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
      <G clipPath="url(#clip0_1166_7001)">
        <Path
          d="M16 8c0-.979-.176-1.916-.498-2.783L8 4.87l-7.502.347A7.983 7.983 0 000 8c0 .979.176 1.916.498 2.783L8 11.13l7.502-.348A7.982 7.982 0 0016 8z"
          fill="#0052B4"
        />
        <Path
          d="M8 16a8.003 8.003 0 007.502-5.217H.498A8.003 8.003 0 008 16z"
          fill="#FF9811"
        />
        <Path
          d="M.498 5.217h15.004a8.003 8.003 0 00-15.004 0z"
          fill="#D80027"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7001">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
