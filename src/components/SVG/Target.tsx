import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={2}
      d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
    />
    <Path
      stroke="#000"
      strokeWidth={1.5}
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M2 12h2M20 12h2M12 4V2M12 22v-2"
    />
  </Svg>
)
export default SvgComponent
