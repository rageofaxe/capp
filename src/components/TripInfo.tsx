import { useUnit } from "effector-react";
import moment from "moment";
import { View } from "react-native";
import styled from "styled-components/native";
import { getAttentionLevel, getTime } from "../../utils";
import PauseSVG from "../components/SVG/Pause";
import PlaySVG from "../components/SVG/Play";
import RepairSVG from "../components/SVG/Repair";
import StopSVG from "../components/SVG/Stop";
import UnknownSVG from "../components/SVG/Unknown";
import { $strings } from "../models/settings/model";
import { openMapApp } from "../utils";
import { formattedSpeed } from "../utils/formatted";
import IconText from "./IconText";
import TripInfoSVG from "./SVG/TripInfoSVG";

type Props = {
    vehicle: App.Vehicle;
};

const Time = (props: App.Vehicle) => {
    const Icon = {
        moving: PlaySVG,
        parked: StopSVG,
        stopped: PauseSVG,
        unknown: UnknownSVG,
        repair: RepairSVG
    }[props?.activity];

    const strings = useUnit<any>($strings);

    const iconColor = {
        success: "#2ecc71",
        warning: "#f5a623",
        danger: "#ff434b",
        unknown: "#ff434b",
    }[getAttentionLevel(props, props.activity === "unknown")]

    return (
        <View
            style={{ flexDirection: "row", gap: 8, alignItems: "center", marginLeft: 2 }}
        >
            {Icon && <Icon color={iconColor} />}
            <Text>{getTime(props?.activity_changed_at, strings)}</Text>
        </View>
    );
};

export default (props: Props) => {
    const {
        vehicle: { last_address, last_status, activity_changed_at, company, model, make },
    } = props;
    const strings = useUnit<any>($strings);

    return (
        <Card>
            <Row>
                <Col>
                    {/* <IconText label={"Drive"} icon={"SpeedSVG"} bold /> */}
                    <Time {...props.vehicle} />
                    <IconText
                        label={moment(activity_changed_at).format("DD.MM.YYYY, HH:mm")}
                        icon={"StartedSVG"}
                    />
                </Col>
                <Col>
                    <Outline
                        onTouchEnd={() =>
                            openMapApp(last_address?.latitude, last_address?.longitude)
                        }
                    >
                        <TripInfoSVG.Outline />
                    </Outline>
                </Col>
            </Row>
            <Col>
                <IconText label={formattedSpeed(last_status?.speed, strings)} icon={"SpeedSVG"} />
            </Col>
            <Col>
                <IconText label={last_address?.text} icon={"AddressSVG"} />
            </Col>
            <Col>
                <IconText label={`${make} ${model}`} icon={"BrandCarSVG"} />
            </Col>
            <Col>
                <IconText label={company?.name} icon={"CompanySVG"} />
            </Col>
            
            <Row>
                <Col>
                    <IconText
                        label={
                            last_status?.voltage_ext
                                ? last_status?.voltage_ext / 1000
                                : null
                        }
                        msr={strings.measures.v}
                        icon={"VoltageSVG"}
                    />
                    <IconText
                        label={last_status?.altitude}
                        msr={strings.measures.m}
                        icon={"AltitudeSVG"}
                    />
                </Col>
                <Col>
                    <IconText
                        label={last_status?.fuel_level}
                        msr={strings.measures.litres}
                        icon={"FuelSVG"}
                    />
                    <IconText
                        label={last_status?.satellites}
                        msr={strings.measures.sat}
                        icon={"SatSVG"}
                    />
                </Col>
                <Col>
                    <IconText label={last_status?.rpm} msr={strings.measures.rpm} icon={"RPMSVG"} />
                    <IconText label={last_status?.hdop} msr={strings.measures.hdop} icon={"HDOPSVG"} />
                </Col>
            </Row>
        </Card>
    );
};

const Row = styled.View`
    flex-direction: row;
    gap: 4px;
    width: 100%;
    justify-content: space-between;
`;

const Col = styled.View`
    flex-direction: column;
    padding: 0 16px;
    margin-bottom: 4px;
`;

const Card = styled.View`
    border-radius: 8px;
    background-color: #fafafa;
    margin: 16px 0;
    padding: 16px 0;
`;

const Text = styled.Text`
    font-size: 15px;
`;

const Outline = styled.View`
    background-color: #0070ce;
    padding: 8px;
    border-radius: 8px;
`;