import styled from "styled-components/native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons/faArrowDownAZ'
import { faArrowDown19 } from '@fortawesome/free-solid-svg-icons/faArrowDown19'
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons/faArrowDownShortWide'
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons/faArrowDownLong'
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons/faArrowUpLong'

type SortTagProps = {
    active: boolean;
    label?: string;
    status?: App.NumberSorting['value'] | App.StatusSorting['value'];
    onTouchEnd?: any;
}

const getColor = (props: SortTagProps) => props.active ? "#0070CE" : "#CFCDD1"
const getIconByStatus = (status: App.NumberSorting['value'] | App.StatusSorting['value']) => ({
    "number": faArrowDown19,
    "alpha": faArrowDownAZ,
    "complex": faArrowDownShortWide,
    "asc": faArrowDownLong,
    "desc": faArrowUpLong
}[status])

export default (props: SortTagProps) => {
    const { label, active, onTouchEnd } = props

    return <Wrapper active={active} onTouchEnd={onTouchEnd}>
        <Text active={active}>{label}</Text>
        {props?.status && <FontAwesomeIcon icon={getIconByStatus(props?.status)} color={getColor(props)} size={12} />}
    </Wrapper>
}

const Wrapper = styled.View<SortTagProps>`
    border: 1px solid ${getColor};
    height: 24px;
    border-radius: 24px;
    padding: 0 8px;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`

const Text = styled.Text<SortTagProps>`
    color: ${props => props.active ? "#0070CE" : "#CFCDD1"};
`