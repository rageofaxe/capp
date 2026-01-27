import { Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";
import { getAttentionLevel } from "../../utils";
import PauseSVG from "../components/SVG/Pause";
import PlaySVG from "../components/SVG/Play";
import RepairSVG from "../components/SVG/Repair";
import StopSVG from "../components/SVG/Stop";
import UnknownSVG from "../components/SVG/Unknown";

export default function VehicleMarker(props: { vehicle: App.Vehicle, onPress: any }) {
    
    const Icon = {
        moving: PlaySVG,
        parked: StopSVG,
        stopped: PauseSVG,
        unknown: UnknownSVG,
        repair: RepairSVG
    }[props.vehicle.activity];

    const iconColor = {
        success: "#2ecc71",
        warning: "#f5a623",
        danger: "#ff434b",
        unknown: "#ff434b",
    }[getAttentionLevel(props.vehicle, props.vehicle.activity === "unknown")];

    return (
        <Wrapper>
            <Buble>
                <Content>
                    <Icon style={{ marginLeft: 4 }} color={iconColor} />
                    <RegistrationNumber>
                        {props.vehicle.registration_number}
                    </RegistrationNumber>
                </Content>
                <Triangle
                    isMargin={
                        props.vehicle.activity === "unknown" ||
                        props.vehicle.activity === "moving"
                    }
                />
            </Buble>
            <Circle>
                <Dot></Dot>
                <ArrowWrapper angle={props.vehicle.last_status.angle}><Arrow></Arrow></ArrowWrapper>
            </Circle>
        </Wrapper>
    );
}

const _Triangle = (props: any) => {
    return (
        <Svg
            width={22}
            height={10}
            viewBox="0 0 22 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M6.5 0h15L14 9.5 6.5 0z" fill="#fff" />
            <Path d="M8 0h12l-6 8-6-8z" fill="#004776" />
        </Svg>
    );
};

const Wrapper = styled.View`
    position: relative;
    top: ${Platform.select({ android: "-20px", ios: "-20px" })};
    padding: 0px;
    height: 80px;
    width: 100px;
`;

const Content = styled.View`
    flex-direction: row;
    gap: 16px;
    padding: 2px 4px 2px;
    align-items: center;
`;

const Circle = styled.View`
    width: 14px;
    height: 14px;
    background-color: white;
    border-radius: 10px;
    border: 3px solid #004776;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-left: 8px;
    position: relative;
    z-index: 5;
`;

const ArrowWrapper = styled.View<any>`
    width: 32px;
    height: 8px;
    transform: rotate(${props => props.angle - 90}deg);
    position: absolute;
    top: 0px;
    left: -12px;
    position: absolute;
    z-index: 1;
`;

const Arrow = styled.View`
    width: 12px;
    height: 8px;
    margin-left: 19px;
    margin-top: -1px;
    
    borderStyle: solid;
    borderLeftWidth: 5px;
    borderRightWidth: 5px;
    borderBottomWidth: 10px;
    borderLeftColor: transparent;
    borderRightColor: transparent;
    borderBottomColor: #004776;
    transform: rotate(90deg);
`

const Dot = styled.View`
    width: 4px;
    height: 4px;
    border-radius: 3px;
    background-color: #004776;
`;

const Buble = styled.View`
    min-width: 93px;
    height: 26px;
    background: #004776;
    border-radius: 4px;
    border: 1px solid white;
    position: relative;
    align-items: flex-start;
`;

const Triangle = styled(_Triangle)`
    position: absolute;
    top: ${Platform.select({ android: "2px", ios: "4px" })};
`;

const RegistrationNumber = styled.Text`
    color: white;
    font-size: 13px;
    font-weight: 500;
`;