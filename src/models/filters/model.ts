import { combine, createEvent, createStore } from "effector";
import { $vehicles } from "../vehicles/model";

// Utils

const mapVehicleType = (vehicleType: "truck" | "trailer") => (vehicle: App.Vehicle) => {
    vehicle.vehicleType = vehicleType;
    return vehicle;
};

const mapVehicles = (vehicles: App.Vehicles) => {
    const coupledVehicles = (vehicles)
    return [
        ...coupledVehicles.trucks.map(mapVehicleType("truck")),
        ...coupledVehicles.trailers.map(mapVehicleType("trailer")),
    ]
        .map((vehicle) => {
            vehicle.attentionLevel = vehicle.activity === "moving" ? "play" : "stop";
            return vehicle;
        })
        .filter((vehicle) => vehicle.last_status);
}
    

const toggleButton = (state: any, payload: any) => (state === payload ? null : payload);

const searchByField = (field: string, filter: string | null) =>
    field.toLowerCase().includes((filter || "").toLowerCase());
const getDriverName = (driver: App.Driver, drivers: any) => {
    return driver.first_name + driver.last_name;
};

// Stores

export const $selectedVehicleType = createStore<"truck" | "trailer" | null>(null);
export const $selectedAttentionLevel = createStore<"play" | "pause" | null>(null);
export const $selectedCountry = createStore<string | null>(null);
export const $selectedGroup = createStore<number | null>(null);
export const $searchedText = createStore<string | null>(null);
export const $isSearchedTextEditing = createStore(false);
export const $statusSorting = createStore<App.StatusSorting>({
    value: "desc",
    active: true,
});
export const $numberSorting = createStore<App.NumberSorting>({
    value: "alpha",
    active: false,
});

export const filterByVehicleType = (filter: any) => (v: App.Vehicle) =>
    v.vehicleType === filter || !filter;
export const filterByAttentionLevel =
    (filter: "play" | "pause" | null) => (v: App.Vehicle) =>
        // v.attentionLevel === filter || !filter || (v.attentionLevel === "stop" && filter === "pause");
        (filter === "play" && v.attentionLevel === filter) ||
        (filter === "pause" && (v.activity === "stopped" || v.activity === "parked")) ||
        !filter;
export const filterByCountry = (filter: any) => (v: App.Vehicle) =>
    v?.last_status?.country?.iso2 === filter || !filter;
export const filterByGroup = (filter: any) => (v: App.Vehicle) => {
    return v?.groups?.find((x) => x.id === filter) || !filter;
};
export const searchDrivers = (filter: string | null) => (v: App.Vehicle) => {
    return (
        searchByField(v.registration_number, filter) ||
        searchByField(v.last_address?.text || "", filter) ||
        searchByField(
            v.drivers?.[0] ? getDriverName(v.drivers[0], v.drivers) : "",
            filter
        )
    );
};

export const $truckCount = combine(
    $vehicles,
    $selectedAttentionLevel,
    $selectedCountry,
    $selectedGroup,
    $searchedText,
    (vehicles, selectedAttentionLevel, selectedCountry, selectedGroup, searchedText) =>
        mapVehicles(vehicles)
            .filter((vehicle) => vehicle.vehicleType === "truck")
            .filter(filterByAttentionLevel(selectedAttentionLevel))
            .filter(filterByCountry(selectedCountry))
            .filter(filterByGroup(selectedGroup))
            .filter(searchDrivers(searchedText)).length
);

export const $trailerCount = combine(
    $vehicles,
    $selectedAttentionLevel,
    $selectedCountry,
    $selectedGroup,
    $searchedText,
    (vehicles, selectedAttentionLevel, selectedCountry, selectedGroup, searchedText) =>
        mapVehicles(vehicles)
            .filter((vehicle) => vehicle.vehicleType === "trailer")
            .filter(filterByAttentionLevel(selectedAttentionLevel))
            .filter(filterByCountry(selectedCountry))
            .filter(filterByGroup(selectedGroup))
            .filter(searchDrivers(searchedText)).length
);

export const $playCount = combine(
    $vehicles,
    $selectedVehicleType,
    $selectedCountry,
    $selectedGroup,
    $searchedText,
    (vehicles, selectedVehicleType, selectedCountry, selectedGroup, searchedText) =>
        mapVehicles(vehicles)
            .filter((vehicle) => vehicle.attentionLevel === "play")
            .filter(filterByVehicleType(selectedVehicleType))
            .filter(filterByCountry(selectedCountry))
            .filter(filterByGroup(selectedGroup))
            .filter(searchDrivers(searchedText)).length
);

export const $pauseCount = combine(
    $vehicles,
    $selectedVehicleType,
    $selectedCountry,
    $selectedGroup,
    $searchedText,
    (vehicles, selectedVehicleType, selectedCountry, selectedGroup, searchedText) =>
        mapVehicles(vehicles)
            .filter(
                (vehicle) =>
                    vehicle.activity === "parked" || vehicle.activity === "stopped"
            )
            .filter(filterByVehicleType(selectedVehicleType))
            .filter(filterByCountry(selectedCountry))
            .filter(filterByGroup(selectedGroup))
            .filter(searchDrivers(searchedText)).length
);

export const $countriesCount = combine(
    $vehicles,
    $selectedVehicleType,
    $selectedAttentionLevel,
    $selectedGroup,
    $searchedText,
    (
        vehicles,
        selectedVehicleType,
        selectedAttentionLevel,
        selectedGroup,
        searchedText
    ) =>
        mapVehicles(vehicles)
            .filter(filterByVehicleType(selectedVehicleType))
            .filter(filterByAttentionLevel(selectedAttentionLevel))
            .filter(filterByGroup(selectedGroup))
            .filter(searchDrivers(searchedText))
);

export const $groupsCount = combine(
    $vehicles,
    $selectedVehicleType,
    $selectedAttentionLevel,
    $selectedCountry,
    $searchedText,
    (
        vehicles: App.Vehicles,
        selectedVehicleType: any,
        selectedAttentionLevel: any,
        selectedCountry: any,
        searchedText: string
    ) => {
        return mapVehicles(vehicles)
            .filter(filterByVehicleType(selectedVehicleType))
            .filter(filterByAttentionLevel(selectedAttentionLevel))
            .filter(filterByCountry(selectedCountry))
            .filter(searchDrivers(searchedText));
    }
);

export const $filteredVehicles = combine(
    $vehicles,
    $selectedVehicleType,
    $selectedAttentionLevel,
    $selectedCountry,
    $selectedGroup,
    $searchedText,
    (
        vehicles: App.Vehicles,
        selectedVehicleType: any,
        selectedAttentionLevel: any,
        selectedCountry: any,
        selectedGroup: any,
        searchedText: string
    ) => {
        return mapVehicles(vehicles)
            .filter(filterByVehicleType(selectedVehicleType))
            .filter(filterByAttentionLevel(selectedAttentionLevel))
            .filter(filterByCountry(selectedCountry))
            .filter(filterByGroup(selectedGroup))
            .filter(searchDrivers(searchedText));
    }
);

// Events

export const setVehicleType = createEvent<string | null>();
export const setAttentionLevel = createEvent<string | null>();
export const setCountry = createEvent<string | null>();
export const setGroup = createEvent<number | null>();
export const searchText = createEvent<string | undefined>();
export const setSearchedTextEditing = createEvent<boolean>();
export const toggleNumberSorting = createEvent();
export const toggleStatusSorting = createEvent();
export const clearFilters = createEvent();

$selectedVehicleType.on(setVehicleType, toggleButton).on(clearFilters, () => null);
$selectedAttentionLevel.on(setAttentionLevel, toggleButton).on(clearFilters, () => null);
$selectedCountry.on(setCountry, toggleButton).on(clearFilters, () => null);
$selectedGroup.on(setGroup, toggleButton).on(clearFilters, () => null);
$searchedText.on(searchText, (_, payload) => payload).on(clearFilters, () => null);
$isSearchedTextEditing.on(setSearchedTextEditing, (_, payload) => payload);

$numberSorting
    .on(toggleNumberSorting, (state) => ({
        active: true,
        value: !state?.active
            ? state.value
            : state?.value === "alpha"
            ? "number"
            : state?.value === "number"
            ? "complex"
            : "alpha",
    }))
    .on(toggleStatusSorting, (state) => ({
        ...state,
        active: false,
        value: state?.value || "alpha",
    }));

$statusSorting
    .on(toggleStatusSorting, (state) => ({
        active: true,
        value: !state?.active ? state.value : state?.value === "asc" ? "desc" : "asc",
    }))
    .on(toggleNumberSorting, (state) => ({
        ...state,
        active: false,
        value: state?.value || "asc",
    }));
