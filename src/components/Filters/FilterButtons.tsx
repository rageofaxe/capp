import { Dimensions, StyleProp, Text, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import CloseIcon from "../SVG/CloseIcon"
import GlobeIcon from "../SVG/Globe"
import ChecksGridIcon from "../SVG/ChecksGrid"
import PlatformIcon from "../SVG/Platform"
import TruckIcon from "../SVG/Truck"
import PlayIcon from "../SVG/Play"
import StopIcon from "../SVG/Stop"
import { BUTTON_SIZE } from "../../constants";

export type BaseButtonProps = {
    active: boolean;
    disabled?: boolean;
    icon?: any;
    count?: number;
    paired?: "left" | "right";
    onTouchEnd?: any;
    style?: StyleProp<ViewStyle>;
    children?: any;
}

const COUNTER_SIZE = 16;

const COLORS = {
    ROSE: "#FF0041",
    WHITE: "white",
    BLUE: "#0070CE",
    GRAY: "#CCCCCC",
    DARK_GRAY: "#6D6D6D"
}

const getColor = (primary: string, secondary: string, disabled = COLORS.GRAY) => (props: BaseButtonProps) => {
    if (props.disabled || props.count === 0) {
        return disabled
    }
    return props.active ? primary : secondary
}

const getBackgroundColorByActive = (props: any) => getColor(COLORS.BLUE, COLORS.WHITE)(props)
const getColorByActive = (props: any) => getColor(COLORS.WHITE, COLORS.BLUE, COLORS.WHITE)(props)

const BaseButtonView = styled.View<BaseButtonProps>`
    width: ${BUTTON_SIZE}px;
    height: ${BUTTON_SIZE}px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    border-top-left-radius: ${props => props.paired === "right" ? 0 : 8}px;
    border-bottom-left-radius: ${props => props.paired === "right" ? 0 : 8}px;
    border-top-right-radius: ${props => props.paired === "left" ? 0 : 8}px;
    border-bottom-right-radius: ${props => props.paired === "left" ? 0 : 8}px;
    background: ${getBackgroundColorByActive};
    border: 1px solid ${getColor(COLORS.BLUE, COLORS.BLUE)};
    borderLeftWidth: ${props => props.paired === "right" ? 0 : 1}px;
    z-index: 1;
`

const BaseButtonWrapper = styled.View`
    height: ${BUTTON_SIZE}px;
    width: ${BUTTON_SIZE}px;
`

export const ButtonCount = styled.View<BaseButtonProps>`
    position: absolute;
    right: -8px;
    top: -8px;
    background: ${getColor(COLORS.ROSE, COLORS.WHITE)};
    min-width: ${COUNTER_SIZE}px;
    height: ${COUNTER_SIZE + 4}px;
    align-items: center;
    border-radius: ${COUNTER_SIZE * 1.5}px;
    border: 1px;
    border-color: ${getColor(COLORS.ROSE, COLORS.BLUE)};
    color: black; 
    display: flex;
    padding: 2px 4px;
    z-index: 41;
`

export const ButtonCountText = styled.Text<BaseButtonProps>`
    line-height: 14px;
    font-size: 12px;
    color: ${getColor(COLORS.WHITE, COLORS.BLUE)};
`

export const ButtonCounter = (props: BaseButtonProps) => {
    return !!(props.count) && !(props.disabled) && <ButtonCount {...props} >
        <ButtonCountText disabled={props.disabled} active={props.active} count={props.count}>{props.count}</ButtonCountText>
    </ButtonCount>
}

export const BaseButton = (props: BaseButtonProps) => <BaseButtonWrapper style={props.style}>
    {!!(props.count) && !(props.disabled) ? <BaseButtonView {...props}></BaseButtonView> : <BaseButtonView {...props} onTouchEnd={() => {}}></BaseButtonView>}
    
    
</BaseButtonWrapper>

export const PlayButton = (props: BaseButtonProps) => <BaseButton {...props}><PlayIcon color={getColorByActive(props)} /></BaseButton>
export const StopButton = (props: BaseButtonProps) => <BaseButton {...props}><StopIcon color={getColorByActive(props)} /></BaseButton>
export const TruckButton = (props: BaseButtonProps) => <BaseButton {...props}><TruckIcon color={getColorByActive(props)} /></BaseButton>
export const PlatformButton = (props: BaseButtonProps) => <BaseButton {...props}><PlatformIcon style={23} color={getColorByActive(props)} /></BaseButton>
export const ChecksGridButton = (props: BaseButtonProps) => <BaseButton {...props}><ChecksGridIcon color={getColorByActive(props)} /></BaseButton>
export const CountriesButton = (props: BaseButtonProps) => <BaseButton {...props}><GlobeIcon color={getColorByActive(props)} /></BaseButton>

export const CloseButton = (props: any) => <BaseButton {...props} style={{ borderColor: COLORS.DARK_GRAY, marginLeft: 4 }}><CloseIcon color={COLORS.DARK_GRAY} /></BaseButton>

