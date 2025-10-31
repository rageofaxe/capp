import styled from "styled-components/native";
import VehiclesSVG from "./SVG/Vehicles"
import { getAttentionLevel } from "../../utils";

type Props = {
    vehicle: App.Vehicle;
};

export default (props: Props) => {
    const {
        vehicle: { country, registration_number, company, model, make, single_svg_id, activity },
    } = props;

    const iconName = single_svg_id.replaceAll("-", "__").replaceAll(".", "") as keyof typeof VehiclesSVG

    const VehicleIcon = VehiclesSVG[iconName]

    return (
        <Card>
            <Row>
                <Col>
                    <RegNumberView>
                        {country?.iso2 && (
                            <CountryCodeView>
                                <CountryCode>{country?.iso2}</CountryCode>
                            </CountryCodeView>
                        )}
                        <RegNumber>{registration_number}</RegNumber>
                    </RegNumberView>                    
                </Col>
                <Col>
                    <VehicleIcon height="25" width="50" preserveAspectRatio="xMinYMin slice"  />
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
`;

const Card = styled.View`
    padding: 16px;
    padding-bottom: 0px;
    background-color: white;
`;

const RegNumberView = styled.View`
    border: 1px solid #49494a;
    border-radius: 4px;
    flex-direction: row;
    margin-bottom: 8px;
`;

const CountryCodeView = styled.View`
    background-color: #49494a;
    padding: 0 4px;
`;

const CountryCode = styled.Text`
    color: white;
    font-size: 15px;
`;

const RegNumber = styled.Text`
    color: #49494a;
    margin: 0 4px;
    font-size: 15px;
`;

const RegularText = styled.Text`
    font-size: 15px;
`;
