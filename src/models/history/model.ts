import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect, createEvent, createStore } from "effector";
import moment from "moment";
import { BASE_URL } from "../../constants";
import { setLiveMode } from "../modes";
import { getVehiclePointsHelper } from "./helpers";

export let VehiclePointsController = new AbortController();
export let VehicleRouteController = new AbortController();

export const currentDate = () => moment().format("YYYY-MM-DD");

const getOptions = (cookie: string): any => ({
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cookie: cookie,
  },
});

async function getStatuses(vehicleType: any, id: any, dateFrom: string, page = 1, initialStatuses: any[] = []): Promise<any[]> {
  const cookie = (await AsyncStorage.getItem("cookie")) as string;
  console.log("getStatuses", `${BASE_URL}new_map/statuses/${vehicleType}/${id}?q%5Bfrom%5D=${dateFrom}&q%5Bto%5D=${dateFrom}&page=${page}`)
  let statuses = await fetch(
    `${BASE_URL}new_map/statuses/${vehicleType}/${id}?q%5Bfrom%5D=${dateFrom}&q%5Bto%5D=${dateFrom}&page=${page}`,
    getOptions(cookie),
  ).then((result: any) => result.json());
  
  if (statuses.length === page * 5000) {
    return getStatuses(vehicleType, id, dateFrom, page + 1, [...initialStatuses, ...statuses])
  } else {
    return [...initialStatuses, ...statuses]
  }
}

export const $historyPoints = createStore([]);
export const $lastHistoryPoint = createStore([]);
export const $historyRoute = createStore([]);
export const $historyRouteOrigin = createStore([]);
export const $dateFrom = createStore(currentDate());
export const $maxDateFrom = createStore(currentDate());
export const $segmentRoute = createStore([]);
export const $selectedHistoryItemId = createStore<any>("");

export const setDateFrom = createEvent<string>();
export const setMaxDateFrom = createEvent<string>();
export const setSegmentRoute = createEvent<any>();
export const setSelectedHistoryItemId = createEvent<any>();

export const getVehicleRouteFx = createEffect(
  async ({ id, dateFrom, vehicleType }: any) => {
    let VehicleRouteController = new AbortController();
    const route = await getStatuses(vehicleType, id, dateFrom)

    if (VehicleRouteController.signal.aborted) {
      return [];
    }

    return route;
  },
);

export const getLastPointFx = createEffect(async ({ id, vehicleType }: any) => {
  const cookie = (await AsyncStorage.getItem("cookie")) as string;
  const lastPoint = await fetch(
    `${BASE_URL}new_map/vehicles/${vehicleType}/${id}/info`,
    getOptions(cookie),
  ).then((result: any) => result.json());

  return lastPoint;
});

export const clearHistoryForVehicle = createEvent();
export const enableAutoUpdate = createEvent();

export const getVehiclePointsFx = createEffect(
  async ({ id, dateFrom, vehicleType }: any) => {
    VehiclePointsController = new AbortController();
    const cookie = (await AsyncStorage.getItem("cookie")) as string;

    const lastPoint = await fetch(
      `${BASE_URL}new_map/vehicles/${vehicleType}/${id}/info`,
      getOptions(cookie),
    ).then((result: any) => result.json());

    let odometer = await getStatuses(vehicleType, id, dateFrom);

    let points = (
      await fetch(
        `${BASE_URL}new_map/points/${vehicleType}/${id}?q%5Bfrom%5D=${dateFrom}&q%5Bto%5D=${dateFrom}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: cookie,
          },
        },
      ).then((result: any) => result.json())
    )

    return getVehiclePointsHelper(
      { id, dateFrom, vehicleType },
      lastPoint,
      odometer,
      points,
    );
  },
);

$selectedHistoryItemId.on(setSelectedHistoryItemId, (_, payload) => payload);
$selectedHistoryItemId.on(setLiveMode, (_, payload) => (payload ? "" : _));

$historyPoints
  .on([clearHistoryForVehicle, setDateFrom], () => [])
  .on(
    getVehiclePointsFx.done,
    (_, payload) =>
      payload.result.map((point: any) => ({
        ...point,
        final_status: {
          ...point.final_status,
          latitude: Number(point.final_status.latitude),
          longitude: Number(point.final_status.longitude),
        },
      })),
  );

$lastHistoryPoint
  .on(getLastPointFx.done, (_, payload) => payload.result)
  .on(clearHistoryForVehicle, (_) => [])
  .on(setDateFrom, (_) => []);

$historyRouteOrigin
  .on(getVehicleRouteFx.done, (_, payload) => payload.result)
  .on(clearHistoryForVehicle, (_) => [])
  .on(setDateFrom, (_) => []);

$segmentRoute
  .on(clearHistoryForVehicle, (_) => [])
  .on(setDateFrom, (_) => [])
  .on(setSelectedHistoryItemId, (_, payload) => {
    return payload ? _ : [];
  })
  .on(setSegmentRoute, (_, payload) =>
    payload.map((point: any) => ({
      latitude: Number(point.latitude),
      longitude: Number(point.longitude),
    })));

$historyRoute
  .on(clearHistoryForVehicle, (_) => [])
  .on(setDateFrom, (_) => [])
  .on(
    getVehicleRouteFx.done,
    (_, payload) =>
      payload.result.map((point: any) => ({
        latitude: point.latitude,
        longitude: point.longitude,
      })),
  );

$dateFrom
  .on(setDateFrom, (state, payload) => {
    if (moment(payload).utc() <= moment().utc()) {
      return payload;
    }
    return state;
  })
  .on(setMaxDateFrom, (_, payload) => {
    return payload;
  });

$maxDateFrom.on(setMaxDateFrom, (_, payload) => {
  return payload;
});
