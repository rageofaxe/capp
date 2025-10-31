import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14 14.5a3 3 0 116 0 3 3 0 01-6 0zM4 9.5a3 3 0 106 0 3 3 0 00-6 0z"
        stroke="#000"
        strokeWidth={2}
      />
      <Path
        d="M16.959 9V2M6.958 15v7M16.959 22v-2M6.958 2v2"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
