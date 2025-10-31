import { Linking, PixelRatio, Platform } from "react-native";
import { secondsFromNow } from "../utils";
import { HEIGHT, HEIGHT_SCREEN } from "./constants";

export const getEdgePadding = (padding: ({top: number, right: number, bottom: number, left: number})) => {
  const iosEdgePadding = { top: 100, right: 50, bottom: 300, left: 50 };

  const androidEdgePadding = {
      top: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.top),
      right: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.right),
      bottom: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.bottom),
      left: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.left),
  }

  return (Platform.OS === 'android') ? androidEdgePadding : iosEdgePadding;
}

export const getMapPadding = (padding: ({top: number, right: number, bottom: number, left: number})) => {
  const iosEdgePadding = padding;

  const androidEdgePadding = {
      top: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.top),
      right: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.right),
      bottom: PixelRatio.getPixelSizeForLayoutSize(HEIGHT_SCREEN / 4 - 40),
      left: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.left),
  }

  return (Platform.OS === 'android') ? androidEdgePadding : iosEdgePadding;
}

const mapByStatus = (vehicle: App.Vehicle) => {
  return {
    "moving": 4,
    "stopped": 3,
    "parked": 2,
    "unknown": 1,
  }[vehicle.activity];
};

export const sortByStatus =
  (statusSorting: App.StatusSorting) => (a: App.Vehicle, b: App.Vehicle) => {

    // return statusSorting.value === "asc"
    //   ? mapByStatus(a) - mapByStatus(b) || new Date(b.activity_changed_at).getTime() - new Date(a.activity_changed_at).getTime()
    //   : mapByStatus(b) - mapByStatus(a) || new Date(a.activity_changed_at).getTime() - new Date(b.activity_changed_at).getTime()

    const compareByStatus = (a: any, b: any) => mapByStatus(a) - mapByStatus(b)
    // const compareByTime = (a: any, b: any) => new Date(a?.last_status?.timestamp).getTime() - new Date(b?.last_status?.timestamp).getTime()
    const compareByTime = (a: any, b: any) => new Date(a?.activity_changed_at).getTime() - new Date(b?.activity_changed_at).getTime()

    if (statusSorting.value === "asc") {
      if (a.activity === "moving") {
        return compareByStatus(a, b) || compareByTime(b, a)
      } else {
        return compareByStatus(a, b) || compareByTime(a, b)
      }
    } else {
      if (a.activity === "moving") {
        return compareByStatus(b, a) || compareByTime(a, b)
      } else {
        return compareByStatus(b, a) || compareByTime(b, a)
      }
    }

    
    
  };

export const sortByNumber =
  (numberSorting: App.NumberSorting) => (a: App.Vehicle, b: App.Vehicle) => {
    const extractNumber = (vehicle: App.Vehicle): number => {
      const result = [
        Number(
          /\d{5}|\d{4}|\d{3}|\d{2}|\d{1}/g.exec(vehicle["registration_number"]),
        ) || [0],
      ][0];

      return typeof result === "number" ? result : result[0];
    };

    const extractLetters = (vehicle: App.Vehicle) =>
      vehicle["registration_number"].split(" ")[0];

    if (numberSorting.value === "number") {
      return extractNumber(a) - extractNumber(b);
    } else if (numberSorting.value === "alpha") {
      return extractLetters(a).localeCompare(extractLetters(b));
    } else if (numberSorting.value === "complex") {
      return (
        extractLetters(a).localeCompare(extractLetters(b)) ||
        extractNumber(a) - extractNumber(b)
      );
    } else {
      return 0;
    }
  };

export const openMapApp = (lat: string, lng: string) => {
  const scheme = Platform.select({
    ios: "maps://0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${lat},${lng}`;
  const label = "Custom Label";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  }) as string;

  Linking.openURL(url);
};
