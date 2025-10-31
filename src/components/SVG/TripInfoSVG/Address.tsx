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
        d="M2.167 6.762C2.167 3.496 4.77.833 8 .833s5.833 2.663 5.833 5.93c0 1.576-.45 3.269-1.243 4.732-.794 1.46-1.953 2.73-3.403 3.408a2.8 2.8 0 01-2.374 0c-1.45-.678-2.61-1.947-3.403-3.408-.794-1.463-1.243-3.156-1.243-4.733zM8 1.833c-2.661 0-4.833 2.199-4.833 4.93 0 1.397.401 2.927 1.122 4.254.722 1.33 1.742 2.416 2.947 2.98a1.8 1.8 0 001.528 0c1.205-.564 2.225-1.65 2.947-2.98.72-1.327 1.122-2.857 1.122-4.255 0-2.73-2.172-4.929-4.833-4.929zm0 3.334a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-2.5 1.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
        fill={props.color || "gray"}
        stroke={props.color || "gray"}
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
