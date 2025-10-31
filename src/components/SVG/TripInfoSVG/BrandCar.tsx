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
        d="M4 5.781c0-2.312 8-2.349 8 0v6.771s-1.486.6-4 .6c-2.514 0-4-.6-4-.6V5.781z"
        stroke={props.color || "gray"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.334 9.333h7.333"
        stroke={props.color || "gray"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.5 12v0A1.5 1.5 0 012 10.5V3a2 2 0 012-2h8a2 2 0 012 2v7.378c0 .896-.726 1.622-1.622 1.622v0"
        stroke={props.color || "gray"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 11.333h.667M5.5 11.333h.667M4 13v1c0 .368.298.667.667.667h1A.667.667 0 006.333 14v-.667M12 13v1a.667.667 0 01-.666.667h-1A.667.667 0 019.667 14v-.667"
        stroke={props.color || "gray"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
