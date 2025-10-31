import { useUnit } from "effector-react";
import { getLocales } from "expo-localization";
import { useEffect } from "react";
import { $locale, setLocale } from "../models/settings/model";

export default function () {
  const locale = useUnit($locale);
  const locales = getLocales();
  const languageCode = locales[0].languageCode || "";

  useEffect(() => {
    console.log("languageCode", languageCode)
    console.log("locale", locale)
    if (languageCode === "de") {
      setLocale("de");
    } else if (["ru", "be", "kk"].includes(languageCode)) {
      setLocale("ru");
      console.log("set ru");
    } else {
      setLocale("en");
    }
  }, [locale]);
}
