import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useKeyboard } from "@react-native-community/hooks";
import { useCallback, useEffect, useState } from "react";
import { BUTTON_SIZE, WIDTH } from "../constants";
import {
    $isSearchedTextEditing,
    $searchedText,
    $selectedAttentionLevel,
    $selectedCountry,
    $selectedGroup,
    $selectedVehicleType,
    searchText,
    setAttentionLevel,
    setCountry,
    setGroup,
    setSearchedTextEditing,
    setVehicleType,
} from "../models/filters/model";
import {
    $vehiclesSnapIndex,
} from "../models/ui/model";
import { $vehicleGroups } from "../models/vehicles/model";
import Flags from "./SVG/Flags";
import TrailerSvg from "./SVG/Platform";
import PlaySvg from "./SVG/Play";
import SearchSvg from "./SVG/Search";
import StopSvg from "./SVG/Stop";
import TruckSvg from "./SVG/Truck";
import SearchTag from "./SearchTag";

type Props = {
    bottomSheetListRef: React.MutableRefObject<any>;
    setVehiclesSnapIndex: any;
};

type InputProps = {
    bottomSheetListRef: React.MutableRefObject<any>;
    searchText: any;
    setSearchedTextEditing: any;
    searchedText: string | null;
    setVehiclesSnapIndex: any;
};

const SearchInput = (props: InputProps) => {
    const {
        bottomSheetListRef,
        searchText,
        searchedText,
        setSearchedTextEditing,
        setVehiclesSnapIndex
    } = props;
    const vehiclesSnapIndex = useUnit($vehiclesSnapIndex);
    const [snapIndex, setSnapIndex] = useState<number>(1);
    const { keyboardShown } = useKeyboard();

    useEffect(() => {

        return () => {
            setSearchedTextEditing(false);
        };
    }, []);

    useEffect(() => {
        if (!keyboardShown && searchedText) {
            setSearchedTextEditing(false);
            searchText(searchedText);
        }
    }, [keyboardShown, searchedText]);

    const onChangeText = useCallback(
        (text: string) => {
            searchText(text);
        },
        [snapIndex]
    );

    const onPressIn = useCallback((e: any) => {
        
        setTimeout(() => {
            setSearchedTextEditing(true);
            bottomSheetListRef.current?.snapToIndex(2)
        }, 300);
    }, []);

    const onBlur = useCallback(() => {
        setSearchedTextEditing(false);
    }, []);

    return (
        <BottomSheetTextInput
            style={styles.textInput}
            onBlur={onBlur}
            onPressIn={onPressIn}
            onChangeText={onChangeText}
            keyboardType="web-search"
            inputMode="text"
            onEndEditing={() => console.log("END EDITING")}
        />
    );
};

export default (props: Props) => {
    const searchedText = useUnit($searchedText);
    const isSearchedTextEditing = useUnit($isSearchedTextEditing);
    const selectedVehicleType = useUnit($selectedVehicleType);
    const selectedAttentionLevel = useUnit($selectedAttentionLevel);
    const selectedCountry = useUnit($selectedCountry);
    const selectedGroup = useUnit($selectedGroup);
    const vehicleGroups = useUnit($vehicleGroups);
    const { bottomSheetListRef, setVehiclesSnapIndex } = props;

    const Flag = Flags[selectedCountry as keyof typeof Flags];
    const visibleTag = !!searchedText && !isSearchedTextEditing;

    return (
        <View style={styles.searchContainer}>
            {!visibleTag && <SearchSvg />}
            <ScrollView
                contentContainerStyle={styles.searchScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {visibleTag && (
                    <SearchTag onClose={() => searchText("")}>
                        <Text style={styles.searchedText}>{searchedText}</Text>
                    </SearchTag>
                )}
                {selectedVehicleType && (
                    <SearchTag onClose={() => setVehicleType(null)}>
                        {selectedVehicleType === "truck" ? (
                            <TruckSvg color={"white"} />
                        ) : (
                            <TrailerSvg color={"white"} />
                        )}
                    </SearchTag>
                )}

                {selectedAttentionLevel && (
                    <SearchTag onClose={() => setAttentionLevel(null)}>
                        {selectedAttentionLevel === "play" ? (
                            <PlaySvg color={"white"} />
                        ) : (
                            <StopSvg color={"white"} />
                        )}
                    </SearchTag>
                )}

                {selectedCountry && (
                    <SearchTag onClose={() => setCountry(null)}>
                        <Flag />
                    </SearchTag>
                )}

                {selectedGroup && (
                    <SearchTag onClose={() => setGroup(null)}>
                        <Text style={styles.searchedText}>
                            {vehicleGroups.find(({ id }) => id === selectedGroup)?.name}
                        </Text>
                    </SearchTag>
                )}

                {!visibleTag && (
                    <SearchInput
                        bottomSheetListRef={bottomSheetListRef}
                        searchText={searchText}
                        searchedText={searchedText}
                        setSearchedTextEditing={setSearchedTextEditing}
                        setVehiclesSnapIndex={setVehiclesSnapIndex}
                    />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    searchedText: {
        color: "white",
    },
    searchContainer: {
        borderRadius: 24,
        backgroundColor: "#F4F0F0",
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    searchScroll: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 8,
        // backgroundColor: 'red'
    },

    textInput: {
        width: WIDTH - 160,
        marginRight: 24,
        color: "black",
        height: BUTTON_SIZE,
    },
});
