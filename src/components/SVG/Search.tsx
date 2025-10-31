import * as React from "react"
import Svg, { G, Circle, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G stroke="#7D7D7D" strokeWidth={2} clipPath="url(#a)">
      <Circle cx={7.667} cy={7.667} r={6.333} />
      <Path strokeLinecap="round" d="m12.333 12.333 2.334 2.334" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
