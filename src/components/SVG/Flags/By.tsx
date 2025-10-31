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
      <G clipPath="url(#clip0_1166_7024)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#FCFCFC" />
        <Path
          d="M3.305 7.42l-.87-1.577.87-1.553.87 1.553-.87 1.577zM1.565 7.42l-.87-1.577.87-1.553.87 1.553-.87 1.577zM3.305 11.71l-.87-1.577.87-1.553.87 1.553-.87 1.577zM1.565 11.71l-.87-1.577.87-1.553.87 1.553-.87 1.577zM4.174 1.553l-.246-.44a8.022 8.022 0 00-1.238.904l.614 1.113.87-1.577zM3.305 12.87l-.62 1.108c.38.339.794.642 1.236.905l.253-.46-.87-1.553z"
          fill="#A2001D"
        />
        <Path
          d="M4.87 10.087v5.277a8.003 8.003 0 0010.633-4.581L4.87 10.087z"
          fill="#6DA544"
        />
        <Path
          d="M15.502 10.783A8 8 0 004.87.636v10.147h10.634z"
          fill="#A2001D"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7024">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
