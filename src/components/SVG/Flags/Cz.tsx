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
      <G clipPath="url(#clip0_1166_7072)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#F0F0F0" />
        <Path
          d="M7.304 8s-4.956 5.658-4.96 5.657A8 8 0 0016 8H7.303z"
          fill="#D80027"
        />
        <Path
          d="M2.343 2.343a8 8 0 000 11.314L8 8 2.343 2.343z"
          fill="#0052B4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7072">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
