import { combine, createEvent, createStore } from "effector";
import {
  setAttentionLevel,
  setCountry,
  setGroup,
  setVehicleType,
} from "../filters/model";

export const $shownFilters = createStore(false);
export const $vehiclesSnapIndex = createStore(1);
export const $vehicleSnapIndex = createStore(1);
export const $vehicleId = createStore<null | number>(null);
export const $isCountryList = createStore(false);
export const $isGroupList = createStore(false);
export const $isProgressBar = createStore(false);

export const toggleFilters = createEvent();
export const setVehiclesSnapIndex = createEvent<number>();
export const setVehicleSnapIndex = createEvent<number>();
export const setVehicleId = createEvent<null | number>();
export const setCountryList = createEvent<boolean>();
export const setGroupList = createEvent<boolean>();
export const closeFilters = createEvent();


$shownFilters.on(toggleFilters, (value) => !value);
$shownFilters.on(
  [setAttentionLevel, setVehicleType, setCountry, setGroup],
  () => false,
);

$isCountryList.on(setCountryList, (_, payload) => payload);
$isCountryList.on([setCountry, closeFilters], () => false);

$isGroupList.on(setGroupList, (_, payload) => payload);
$isGroupList.on([setGroup, closeFilters], () => false);

$vehiclesSnapIndex.on(setVehiclesSnapIndex, (_, payload) => payload >= 2 ? 2 : payload);
$vehicleSnapIndex.on(setVehicleSnapIndex, (_, payload) => payload >= 2 ? 2 : payload);
$vehicleId.on(setVehicleId, (_, payload) => payload);


export const $ui = combine(
  $shownFilters,
  $vehiclesSnapIndex,
  $vehicleSnapIndex,
  $vehicleId,
  $isCountryList,
  $isGroupList,
  (
    shownFilters,
    vehiclesSnapIndex,
    vehicleSnapIndex,
    vehicleId,
    isCountryList,
    isGroupList,
  ) => ({
    shownFilters,
    vehiclesSnapIndex,
    vehicleSnapIndex,
    vehicleId,
    isCountryList,
    isGroupList,
  }),
);
