
import styled from "styled-components/native"
import CloseIcon from "./SVG/CloseIcon"
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default (props: any) => {
    const tap = Gesture.Tap().runOnJS(true).numberOfTaps(1).onStart(props.onClose);

    return <GestureDetector gesture={tap}>
        <SearchTagView>
            {props.children}
            <CloseIcon color={"#66B9FF"} />
        </SearchTagView>
    </GestureDetector>
}

const SearchTagView = styled.View`
    background: #0070CE;
    border-radius: 16px;
    height: 32px;
    padding: 0px 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`