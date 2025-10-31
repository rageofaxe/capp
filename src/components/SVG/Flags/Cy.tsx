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
      <G clipPath="url(#clip0_1166_7068)">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16z" fill="#FCFCFC" />
        <Path
          d="M12.522 6.957h-1.043a3.478 3.478 0 01-6.957 0H3.479c0 2.069 1.39 3.813 3.287 4.35-.208.396-.177.893.12 1.264l1.137-.911 1.137.911c.3-.374.33-.878.115-1.275a4.524 4.524 0 003.247-4.34z"
          fill="#6DA544"
        />
        <Path
          d="M5.217 6.609s0 1.739 1.74 1.739l.347.348H8s.348-1.044 1.043-1.044c0 0 0-.696.696-.696h1.043s-.347-1.39 1.392-2.434l-.696-.348S9.043 5.913 7.304 5.565v.696H6.61l-.348-.348-1.044.696z"
          fill="#FFDA44"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1166_7068">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
