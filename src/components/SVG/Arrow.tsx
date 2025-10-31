import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={14}
      height={8}
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.646.646a.5.5 0 01.708 0L7 6.293 12.646.646a.501.501 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
        fill="#007AFF"
        stroke="#007AFF"
        strokeWidth={0.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
