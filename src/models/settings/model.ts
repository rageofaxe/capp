import { combine, createEvent, createStore } from "effector";
import createLocalStore from "../asyncStore";
import locales from "../../locales";

export const $locale = createStore<"en" | "de" | "ru" | null>("en");
export const $strings = combine($locale, (locale: keyof typeof locales) => locales[locale] || locales.en);

export const $isArchivedVehicles = createLocalStore("isArchivedVehicles")(false)

export const toggleArchivedVehicles = createEvent()
export const setLocale = createEvent<"en" | "de" | "ru" | null>()

$isArchivedVehicles.on(toggleArchivedVehicles, (state) => !state)
$locale.on(setLocale, (_, payload) => payload)