import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.657 11.657a1 1 0 000-1.414L7.414 6l4.243-4.243A1 1 0 0010.243.343L6 4.586 1.757.343A1 1 0 00.343 1.757L4.586 6 .343 10.243a1 1 0 001.414 1.414L6 7.414l4.243 4.243a1 1 0 001.414 0z"
        fill={props.color}
      />
    </Svg>
  )
}

export default SvgComponent
