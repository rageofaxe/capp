import styled from "styled-components/native";
import { BaseButtonProps, ButtonCounter, ChecksGridButton, CloseButton, CountriesButton, PlatformButton, PlayButton, StopButton, TruckButton } from "./FilterButtons";

import { useUnit } from "effector-react";
import { BUTTON_SIZE } from "../../constants";
import { $pauseCount, $playCount, $selectedAttentionLevel, $selectedCountry, $selectedGroup, $selectedVehicleType, $trailerCount, $truckCount, setAttentionLevel, setVehicleType } from "../../models/filters/model";
import { setCountryList, setGroupList } from "../../models/ui/model";

export default (props: any) => {
    const { playCount, pauseCount, truckCount, trailerCount, selectedCountry, selectedGroup } = useUnit({
        playCount: $playCount,
        pauseCount: $pauseCount,
        truckCount: $truckCount,
        trailerCount: $trailerCount,
        selectedCountry: $selectedCountry,
        selectedGroup: $selectedGroup
    })

    const selectedVehicleType = useUnit($selectedVehicleType)
    const selectedAttentionLevel = useUnit($selectedAttentionLevel)
    
    const playButtonProps = {
        active: selectedAttentionLevel === "play",
        count: playCount,
        paired: "left",
        onTouchEnd: () => setAttentionLevel("play")
    } as BaseButtonProps

    const pauseButtonProps = {
        active: selectedAttentionLevel === "pause",
        count: pauseCount,
        paired: "right",
        onTouchEnd: () => setAttentionLevel("pause")
    } as BaseButtonProps

    const truckButtonProps = {
        active: selectedVehicleType === "truck",
        count: truckCount,
        paired: "left",
        onTouchEnd: () => setVehicleType("truck")
    } as BaseButtonProps

    const trailerButtonProps = {
        active: selectedVehicleType === "trailer",
        count: trailerCount,
        paired: "right",
        onTouchEnd: () => setVehicleType("trailer")
    } as BaseButtonProps

    return <FilterView>
        <GroupView>
            <PlayButton {...playButtonProps} />
            <StopButton {...pauseButtonProps} />
            <ButtonCounter {...playButtonProps} style={{ right: BUTTON_SIZE - 8 }} />
            <ButtonCounter {...pauseButtonProps} style={{ right: - 8 }} />
        </GroupView>
        <GroupView>
            <TruckButton {...truckButtonProps} />
            <PlatformButton {...trailerButtonProps} />
            <ButtonCounter {...truckButtonProps} style={{ right: BUTTON_SIZE - 8 }} />
            <ButtonCounter {...trailerButtonProps} style={{ right: - 8 }} />
        </GroupView>
        <ChecksGridButton disabled={false} count={1} active={!!selectedGroup} onTouchEnd={() => setGroupList(true)} />
        <CountriesButton disabled={false} count={1} active={!!selectedCountry} onTouchEnd={() => setCountryList(true)} />

        <CloseButton onTouchEnd={props.toggleFilter} disabled={false} count={1} />
    </FilterView>
}

const FilterView = styled.View`
    display: flex;
    gap: 8px;
    width: 100%;
    flex-direction: row;
`

const GroupView = styled.View`
    display: flex;
    flex-direction: row;
    `