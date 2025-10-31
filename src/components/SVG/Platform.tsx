import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={16}
      height={12}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.08 7.294H7.567L6.88 8.5a.236.236 0 01-.324.087l-.404-.23a.238.238 0 01-.09-.324l.422-.738h-4.6v.708a.234.234 0 01-.238.234h-.466a.236.236 0 01-.238-.234v-.708h-.47A.47.47 0 010 6.824V1.412c0-.26.21-.47.47-.47h15.06c.26 0 .47.21.47.47v5.412c0 .26-.21.47-.47.47h-.366l.421.738a.236.236 0 01-.089.323l-.404.231a.238.238 0 01-.324-.087l-.688-1.205zm-1.374.47a1.647 1.647 0 100 3.295 1.647 1.647 0 000-3.294zm0 .942a.706.706 0 110 1.412.706.706 0 010-1.412zM8.94 7.765a1.647 1.647 0 100 3.294 1.647 1.647 0 000-3.294zm0 .941a.706.706 0 110 1.412.706.706 0 010-1.412z"
        fill={props.color}
      />
    </Svg>
  )
}

export default SvgComponent
