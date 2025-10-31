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
        d="M14 14s2.1 0 1.5-1.5c-1-2.5-2.023-5.144-2.023-5.144-.792-1.215-1.962-1.332-2.83-.293l-.171.206c-.244.292-.577.238-.782-.111L7.22 2.938C6.519 1.745 5.217 1.5 4.663 2.793 3.285 6 2.715 7.356 1 12.5.5 14 2.5 14 2.5 14H14zm0-1.5l-1.252-3.634c-.408-.626-1.024-.692-1.477-.15l-.172.207c-.674.807-1.589.677-2.177-.326L6.447 4.378c-.287-.49-.759-.518-1.067-.059L2.5 12.5H14z"
        fill="gray"
        stroke="gray"
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
