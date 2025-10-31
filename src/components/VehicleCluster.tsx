import styled from "styled-components/native";

export default function ({ count }: App.ClusterProps) {
    return (
        <BorderCircle>
            <Circle>
                <Count>{count}</Count>
            </Circle>
        </BorderCircle>
    );
}

const Count = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: white;
`;

const BorderCircle = styled.View`
    width: 40px;
    height: 40px;
    border: 1px solid #004776e5;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.View`
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background: #004776e5;
    display: flex;
    justify-content: center;
    align-items: center;
`;
