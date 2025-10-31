import { createStore, sample } from "effector";
import { setDateFrom } from "./history/model";
import { setVehicleId } from "./ui/model";
import moment from "moment";

const $currentDate = createStore(moment().format("YYYY-MM-DD"))

sample({
    target: setDateFrom,
    clock: setVehicleId,
    source: $currentDate
})