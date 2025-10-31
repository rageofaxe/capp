import { createEvent, createStore, combine } from "effector";

export enum LiveModes {
    REGULAR = "REGULAR",
    POINT_IN_CENTER = "POINT_IN_CENTER",
    POINT_IN_CENTER_WITH_SEGMENT = "POINT_IN_CENTER_WITH_SEGMENT"
}

export const $isFollowMode = createStore(false)
export const $isLiveMode = createStore(false)
export const $currentLiveMode = createStore<LiveModes>(LiveModes.POINT_IN_CENTER)

export const $isCenterPoint = createStore(false)
export const $isCenterPointWithSegment = createStore(false)

export const $isFollowAndLiveMode = combine($isFollowMode, $isLiveMode, (follow, live) => {
    if (live) {
        return false
    } else {
        return follow
    }
})

export const setFollowMode = createEvent<boolean>()
export const setLiveMode = createEvent<boolean>()
export const setCenterPoint = createEvent<boolean>()
export const setCenterPointWithSegment = createEvent<boolean>()
export const setCurrentLiveMode = createEvent<LiveModes>()

$currentLiveMode.on(setCurrentLiveMode, (_, payload) => payload)


$isCenterPoint.on(setCenterPoint, (_, payload) => payload)
$isCenterPoint.on(setCenterPointWithSegment, () => false)

$isCenterPointWithSegment.on(setCenterPointWithSegment, (_, payload) => payload)
$isCenterPointWithSegment.on(setCenterPoint, () => false)

$isFollowMode.on(setFollowMode, (_, payload) => payload)    
$isLiveMode.on(setLiveMode, (_, payload) => payload)