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
      <G clipPath="url(#clip0_1166_7098)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#F0F0F0" />
        <Path
          d="M8 5.913h7.724a7.956 7.956 0 00-.898-2.087H8v2.087zM3.02 14.26h9.96a8.04 8.04 0 001.846-2.086H1.174c.49.799 1.116 1.505 1.846 2.087zM2.783 1.936a8.04 8.04 0 00-1.609 1.89h1.609v-1.89zM8 8V5.913H4.87V8H2.783V5.913H.276a8.009 8.009 0 000 4.174h15.448C15.904 9.422 16 8.722 16 8H8zM8 0C6.89 0 5.831.227 4.87.636v3.19H8V1.74h4.98A7.966 7.966 0 008 0z"
          fill="#338AF3"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7098">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
