import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="gray"
        fillRule="evenodd"
        stroke="gray"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.5}
        d="M12 5.833a6.167 6.167 0 1 0 0 12.334 6.167 6.167 0 0 0 0-12.334ZM4.833 12a7.167 7.167 0 1 1 14.334 0 7.167 7.167 0 0 1-14.334 0ZM12 8.833a.5.5 0 0 1 .5.5v2.46l1.52 1.52a.5.5 0 0 1-.707.707l-1.667-1.666A.5.5 0 0 1 11.5 12V9.333a.5.5 0 0 1 .5-.5Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M4 4h16v16H4z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
