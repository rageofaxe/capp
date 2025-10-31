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
      <G clipPath="url(#clip0_1166_7110)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#F0F0F0" />
        <Path
          d="M.275 10.087a8.007 8.007 0 002.855 4.26v-4.26H.275zM7.304 15.97a8.003 8.003 0 008.42-5.883h-8.42v5.883zM15.724 5.913A8.003 8.003 0 007.304.03v5.883h8.42zM3.13 1.653a8.007 8.007 0 00-2.855 4.26H3.13v-4.26z"
          fill="#0052B4"
        />
        <Path
          d="M15.932 6.957H6.261V.19c-.74.164-1.44.43-2.087.783v5.984H.068a8.069 8.069 0 000 2.087h4.106v5.983a7.944 7.944 0 002.087.783V9.044h9.671a8.074 8.074 0 000-2.087z"
          fill="#D80027"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7110">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
