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
      fill="gray"
      fillRule="evenodd"
      stroke="gray"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M6.167 10.762c0-3.266 2.603-5.929 5.833-5.929s5.833 2.663 5.833 5.93c0 1.576-.45 3.269-1.243 4.732-.794 1.46-1.953 2.73-3.403 3.408a2.8 2.8 0 0 1-2.374 0c-1.45-.678-2.61-1.948-3.403-3.408-.794-1.463-1.243-3.156-1.243-4.733ZM12 5.833c-2.661 0-4.833 2.199-4.833 4.93 0 1.397.401 2.927 1.122 4.254.722 1.33 1.742 2.416 2.947 2.98a1.8 1.8 0 0 0 1.527 0c1.206-.564 2.226-1.65 2.948-2.98.72-1.327 1.122-2.857 1.122-4.255 0-2.73-2.172-4.929-4.833-4.929Zm0 3.334a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-2.5 1.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
