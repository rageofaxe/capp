import * as React from "react"
import Svg, { Path } from "react-native-svg"

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
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2.5a.833.833 0 100 1.667A.833.833 0 004 2.5zm-1.833.833a1.833 1.833 0 013.597-.5H11A2.833 2.833 0 0111 8.5H5a1.833 1.833 0 100 3.667h7.126l-.48-.48a.5.5 0 11.707-.707l1.334 1.333a.5.5 0 010 .707l-1.333 1.334a.5.5 0 01-.708-.708l.48-.48H5A2.833 2.833 0 015 7.5h6a1.833 1.833 0 000-3.667H5.764a1.834 1.834 0 01-3.597-.5z"
        fill={props.color || "#fff"}
        stroke={props.color || "#fff"}
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
