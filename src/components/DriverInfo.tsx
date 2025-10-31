import { Image } from "expo-image";
import { Text, View, StyleSheet } from "react-native";
import { Linking } from "react-native";
import styled from "styled-components/native";
import IconText from "./IconText";
import DriverInfoSVG from "./SVG/DriverInfoSVG";
import { useEffect } from "react";

type DriverInfoProps = {
    vehicle: App.Vehicle;
    driver: App.Driver;
};

const ava = (photo: string) => {
    // return `https://app.transinet.eu/${photo}`;
    return 'https://app.transinet.eu/assets/logo-simple@2x-ac05656400550a6fc333b57ff14e8a7786f8058754102eda1c114f2c2a822556.png'
    
}

export default (props: DriverInfoProps) => {
    const { driver } = props;
    const callDriver = () => {
        Linking.openURL(`tel:${driver.phones[0].number}`);
    };

    const Avatar = driver?.photo_url && false ? (
        // <Image source={ava(driver?.photo_url)} style={style.avatar} contentFit="contain" />
        <Image
            style={style.avatar}
            source={{uri: ava(driver?.photo_url)}}
        />
    ) : (
        <EmptyAva>
            <DriverInfoSVG.PersonSVG />
        </EmptyAva>
    );

    return (
        <Card>
            <Row>
                <ColTop>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 8,
                            height: 32,
                        }}
                    >
                        {Avatar}
                        <Text style={{ marginLeft: 40 }}>
                            {driver.first_name} {driver.last_name}
                        </Text>
                    </View>
                </ColTop>
                <Col>
                    <Phone onTouchEnd={callDriver}>
                        <DriverInfoSVG.Phone />
                    </Phone>
                </Col>
            </Row>
            {/* <Col>
                <IconText label={"Non-stop driving"} icon={"GearSVG"} />
            </Col>
            <Col>
                <IconText label={"Today can drive"} icon={"GearSVG"} />
            </Col>
            <Col>
                <IconText label={"Week driving"} icon={"CalendarSVG"} />
            </Col>
            <Col>
                <IconText label={"2 weeks driving"} icon={"CalendarSVG"} />
            </Col> */}
        </Card>
    );
};

const style = StyleSheet.create({
    avatar: {
        ...StyleSheet.absoluteFillObject,
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});

const Row = styled.View`
    flex-direction: row;
    gap: 4px;
    width: 100%;
    justify-content: space-between;
`;

const Col = styled.View`
    flex-direction: column;
    padding: 0 16px;
`;

const ColTop = styled.View`
    flex-direction: column;
    padding: 0 8px;
`;

const Card = styled.View`
    border-radius: 8px;
    background-color: #fafafa;
    margin: 0 0 16px;
    padding: 16px 0;
`;

const Phone = styled.View`
    background-color: #0070ce;
    padding: 8px;
    border-radius: 8px;
`;

const EmptyAva = styled.View`
    background-color: #f2f0f4;
    border-radius: 24px;
    width: 32px;
    height: 32px;
    position: absolute;
    align-items: center;
    justify-content: center;
`;
