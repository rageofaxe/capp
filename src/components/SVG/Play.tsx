import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.31 7.242L.935 13.008c-.243.133-.438.015-.438-.258V1.25c0-.273.195-.39.438-.258L11.31 6.758c.242.133.242.351 0 .484z"
        fill={props.color}
      />
    </Svg>
  )
}

export default SvgComponent
