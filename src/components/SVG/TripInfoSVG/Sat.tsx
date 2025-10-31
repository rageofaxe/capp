import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

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
      <G clipPath="url(#clip0_1478_25587)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.42 1.95L1.09 6.02a.5.5 0 10.486.875l5.79-3.217a3.985 3.985 0 00.67 3.579L2.98 12.313a.5.5 0 00.707.707l5.056-5.056a3.985 3.985 0 003.579.67l-3.217 5.79a.5.5 0 10.874.486l4.072-7.33a3.983 3.983 0 00-5.632-5.63zm5.095 4.727a2.983 2.983 0 00-4.192-4.192c.057.114.134.26.237.432.288.48.776 1.165 1.567 1.956.791.791 1.477 1.28 1.956 1.567.172.103.318.18.432.237zm-.805.703a10.834 10.834 0 01-1.93-1.452L9.458 7.248c.965.686 2.247.73 3.252.13zm-3.96-.838a2.986 2.986 0 01-.13-3.252l.083.142c.281.468.716 1.086 1.37 1.788L8.75 6.542z"
          fill="gray"
          stroke="gray"
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1478_25587">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
