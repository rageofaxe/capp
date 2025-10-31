import { useUnit } from "effector-react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { COUNTRIES, DEFAULT_BSH_HEIGHT, DEFAULT_BSH_HEIGHT_DIFF, HEIGHT } from "../../constants";
import { $countriesCount, $selectedCountry, setCountry } from "../../models/filters/model";
import Flags from "../SVG/Flags";
import RoundCheck from "../SVG/RoundCheck";

type CountryProps = {
    code: keyof typeof Flags;
    label: string;
    checked?: boolean;
    count?: number;
};

const getCountryLength = (countriesCount: any, country: any) => {
    return countriesCount.filter((vehicle: App.Vehicle) => vehicle?.last_status?.country?.iso2 === country.code).length;
}

const countries = COUNTRIES as CountryProps[]

export default (props: any) => {
    const { isKeyBoard, vehiclesSnapIndex, styles } = props;
    const selectedCountry = useUnit($selectedCountry)
    const countriesCount = useUnit($countriesCount)

    return (
        <View
            style={{
                margin: 16,
                height: isKeyBoard ? HEIGHT * 0.4 : vehiclesSnapIndex == 2 ? (HEIGHT - DEFAULT_BSH_HEIGHT_DIFF) : DEFAULT_BSH_HEIGHT,
            }}
        >
            <ScrollView
                contentContainerStyle={styles.vehicleList}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
                overScrollMode={"always"}
            >
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Select a country</Text>
                <View style={{ paddingBottom: 24 }}>
                    <Country
                        label="All countries"
                        code="globe"
                        checked={null === selectedCountry}
                        onTouchEnd={() => setCountry(null)}
                        count={countriesCount.length}
                    />
                    {countries.sort((a, b) => getCountryLength(countriesCount, b) - getCountryLength(countriesCount, a)).map((country) => {
                        const count = getCountryLength(countriesCount, country)
                        if (!count) {
                            return null;
                        }
                        return <Country
                            key={country.code}
                            {...country}
                            checked={country.code === selectedCountry}
                            count={count}
                            onTouchEnd={() => setCountry(country.code)}
                        />
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const Country = (props: CountryProps & { onTouchEnd: any }) => {
    const Flag = Flags[props.code]
    
    return (
        <CountryRow onTouchEnd={props.onTouchEnd}>
            <Centered>
                {props.code === "globe" ? <Flag color="#CFCDD1" /> : <Flag />}

                <Text>{props.label}</Text>
            </Centered>
            <Centered >
                <CounterView count={props.count}>
                    <CounterText>{props.count}</CounterText>
                </CounterView>
                <RoundCheck checked={!!props.checked} />
            </Centered>
        </CountryRow>
    );
};

const CountryRow = styled.View`
    justify-content: space-between;
    flex-direction: row;
    height: 40px;
    borderBottomWidth: 1px;
    borderColor: #F2F0F4;
`

const Centered = styled.View`
    align-items: center;
    gap: 12px;
    flex-direction: row;
`

const CounterView = styled.View<{ count?: number }>`
    background: ${props => !!props.count ? "#FF0041" : "#CFCDD1"};
    min-width: 15px;
    height: 22px;
    padding: 0px 4px;
    border-radius: 24px;
`

const CounterText = styled.Text`
    color: white
`


