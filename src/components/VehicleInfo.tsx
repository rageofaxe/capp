import { View } from "react-native";
import styled from "styled-components/native";
import VehiclesSVG from "./SVG/Vehicles";

type Props = {
    vehicle: App.Vehicle;
};

export default (props: Props) => {
    const {
        vehicle: { country, registration_number, company, model, make, single_svg_id, activity, trailer },
    } = props;

    const iconName = single_svg_id.replaceAll("-", "__").replaceAll(".", "") as keyof typeof VehiclesSVG
    const iconTrailerName = trailer?.single_svg_id.replaceAll("-", "__").replaceAll(".", "") as keyof typeof VehiclesSVG

    const VehicleIcon = VehiclesSVG[iconName]
    const VehicleTrailerIcon = VehiclesSVG[iconTrailerName]

    return (
        <Card>
            <Row>
                <Col>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <RegNumberView>
                            {country?.iso2 && (
                                <CountryCodeView>
                                    <CountryCode>{country?.iso2}</CountryCode>
                                </CountryCodeView>
                            )}
                            <RegNumber>{registration_number}</RegNumber>

                        </RegNumberView>
                        {trailer && <RegNumberView>
                            {trailer?.country?.iso2 && (
                                <CountryCodeView>
                                    <CountryCode>{trailer?.country?.iso2}</CountryCode>
                                </CountryCodeView>
                            )}
                            <RegNumber>{trailer?.registration_number}</RegNumber>

                        </RegNumberView>}
                    </View>
                </Col>
                <Col>
                    <View style={{ flexDirection: "row" }}>
                        <VehicleIcon height="25" width="50" preserveAspectRatio="xMinYMin slice" />
                        {trailer && <VehicleTrailerIcon height="25" width="50" preserveAspectRatio="xMinYMin slice" />}
                    </View>
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
