import { useUnit } from "effector-react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { DEFAULT_BSH_HEIGHT, DEFAULT_BSH_HEIGHT_DIFF, HEIGHT } from "../../constants";
import { $groupsCount, $selectedGroup, setGroup } from "../../models/filters/model";
import { $vehicleGroups } from "../../models/vehicles/model";
import RoundCheck from "../SVG/RoundCheck";

type GroupProps = {
    id: number;
    name: string;
    checked?: boolean;
    count?: number;
};

const getGroupLength = (groupsCount: any, group: any) => {
    return groupsCount.filter((vehicle: App.Vehicle) => vehicle?.groups.find(g => g.id === group.id)).length
}

export default (props: any) => {
    const { isKeyBoard, vehiclesSnapIndex, styles } = props;
    const selectedGroup = useUnit($selectedGroup)
    const groupsCount = useUnit($groupsCount)
    const groups = (useUnit($vehicleGroups)).sort((a: any, b: any) => {
        return getGroupLength(groupsCount, b) - getGroupLength(groupsCount, a)
    })

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
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Select a group</Text>
                <View style={{ paddingBottom: 24 }}>
                    <Group
                        name="All groups"
                        id={0}
                        checked={null === selectedGroup}
                        onTouchEnd={() => setGroup(null)}
                        count={groupsCount.length}
                    />
                    {groups.map((group: GroupProps) => {
                        let count = getGroupLength(groupsCount, group)

                        if (!count) {
                            return null
                        }

                        return <Group
                            key={group.id}
                            {...group}
                            checked={group.id === selectedGroup}
                            // @ts-ignore
                            count={count}
                            onTouchEnd={() => setGroup(group.id)}
                        />
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const Group = (props: GroupProps & { onTouchEnd: any }) => {
    
    return (
        <GroupRow onTouchEnd={props.onTouchEnd}>
            <Centered>
                <Text>{props.name}</Text>
            </Centered>
            <Centered >
                <CounterView count={props.count}>
                    <CounterText>{props.count}</CounterText>
                </CounterView>
                <RoundCheck checked={!!props.checked} />
            </Centered>
        </GroupRow>
    );
};

const GroupRow = styled.View`
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

const CounterView = styled.View<{count?: number}>`
    background: ${props => !!props.count ? "#FF0041" : "#CFCDD1"};
    min-width: 15px;
    height: 22px;
    padding: 0px 4px;
    border-radius: 24px;
`

const CounterText = styled.Text`
    color: white
`


