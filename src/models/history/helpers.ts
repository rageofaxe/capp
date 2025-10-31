import moment from "moment";

const getDistanceByTimestamp = (segment: any) => {
  return segment.reduce((acc: number, cur: any) => acc + cur.odometer, 0);
};

const getSegment = (
  prevTimestamp: any,
  timestamp: any,
  odometer: any,
  isLastPoint = false,
) => {
  const prevTimestampUnix = new Date(prevTimestamp).getTime();
  const currentTimestampUnix = new Date(timestamp).getTime();
  let result = isLastPoint
    ? odometer.filter((odometerItem: any) => {
      return new Date(odometerItem.timestamp).getTime() > prevTimestampUnix;
    })
    : odometer.filter(
      (odometerItem: any) =>
        new Date(odometerItem.timestamp).getTime() < currentTimestampUnix &&
        new Date(odometerItem.timestamp).getTime() >= prevTimestampUnix,
    );
  return result
};

const getSegmentForPoint = (
  prevTimestamp: any,
  timestamp: any,
  odometer: any,
) => {
  return odometer.filter(
    (odometerItem: any) =>
      new Date(odometerItem.timestamp).getTime() <=
        new Date(timestamp).getTime() &&
      new Date(odometerItem.timestamp).getTime() >=
        new Date(prevTimestamp).getTime(),
  );
};

export const getVehiclePointsHelper = (
  { id, dateFrom, vehicleType }: any,
  lastPoint: any,
  odometer: any[],
  points: any[],
) => {
  points = points.filter((x: any) => x.kind !== "country_entrance");
  let prevTimestamp = odometer[0]?.timestamp;
  let prevPoint: any = {};
  const today = moment().format("YYYY-MM-DD")

  const entity = lastPoint?.[vehicleType === "truck" ? "trucks" : "trailers"]
    ?.[0];
  const entityTruck = lastPoint?.trucks?.[0];

  const additionalPoint = {
    address: { text: entity.last_address.text },
    kind: entity.kind,
    id: null,
    final_status: {
      ...entity?.last_status,
      latitude: entity?.last_address?.latitude,
      longitude: entity?.last_address?.longitude,
    },
    initial_status: {
      ...entity?.last_status,
      latitude: entity?.last_address?.latitude,
      longitude: entity?.last_address?.longitude,
    },
    duration: moment().unix() -
      moment(entity?.last_stop_point?.final_status?.timestamp).unix(),
  };

  // if (entityTruck?.state === "in_trip" && entity.activity === "unknown") {
  //   points = [...points, additionalPoint];
  // }

  // if (
  //   dateFrom ===
  //     moment(points[0].initial_status.timestamp).format("YYYY-MM-DD") &&
  //   dateFrom === moment(points[0].final_status.timestamp).format("YYYY-MM-DD")
  // ) {
  //   let firstPoint = {
  //     address: { text: entity.last_address.text },
  //     kind: entity.kind,
  //     id: null,
  //     final_status: {
  //       ...entity?.last_status,
  //       latitude: entity?.last_address?.latitude,
  //       longitude: entity?.last_address?.longitude,
  //       timestamp: moment(dateFrom).subtract({ second: 0 }),
  //     },
  //     initial_status: {
  //       ...entity?.last_status,
  //       latitude: entity?.last_address?.latitude,
  //       longitude: entity?.last_address?.longitude,
  //       timestamp: null,
  //     },
  //   };

  //   // points = [firstPoint, ...points];
  // }

  // if (dateFrom !== moment().format("YYYY-MM-DD")) {
  //   let lastPoint = {
  //     address: { text: entity.last_address.text },
  //     kind: entity.kind,
  //     id: "lastPoint",
  //     descr: "LASTPOINT",
  //     final_status: {
  //       ...entity?.last_status,
  //       latitude: entity?.last_address?.latitude,
  //       longitude: entity?.last_address?.longitude,
  //       timestamp: moment(dateFrom).add({ hours: 24, minute: 0 }),
  //     },
  //     initial_status: {
  //       ...entity?.last_status,
  //       latitude: entity?.last_address?.latitude,
  //       longitude: entity?.last_address?.longitude,
  //       timestamp: moment(dateFrom).add({ day: 24, minute: 0 }),
  //     },
  //   };
  //   // points = [...points, lastPoint];
  // }

  if (
    moment(points[0].initial_status.timestamp).format("YYYY-MM-DD") === dateFrom && dateFrom !== today
  ) {
    let firstPoint = {
      address: { text: entity.last_address.text },
      kind: entity.kind,
      id: "firstPoint",
      isInsteadHalfSegment: false,
      final_status: {
        ...entity?.last_status,
        latitude: entity?.last_address?.latitude,
        longitude: entity?.last_address?.longitude,
        timestamp: moment(dateFrom).subtract({ second: 0 }),
      },
      initial_status: {
        ...entity?.last_status,
        latitude: entity?.last_address?.latitude,
        longitude: entity?.last_address?.longitude,
        timestamp: moment(dateFrom).subtract({ second: 0 }),
      },
    };
    
    points = [firstPoint, ...points];
  } 

  if (
    moment(points[points.length - 1].final_status.timestamp).format("YYYY-MM-DD") === dateFrom && dateFrom !== today
  ) {
    let lastPoint = {
      address: { text: entity.last_address.text },
      kind: entity.kind,
      id: "lastPoint",
      descr: "LASTPOINT",
      isInsteadHalfSegment: true,
      final_status: {
        ...entity?.last_status,
        latitude: entity?.last_address?.latitude,
        longitude: entity?.last_address?.longitude,
        timestamp: moment(dateFrom).add({ hours: 24, minute: 0 }),
      },
      initial_status: {
        ...entity?.last_status,
        latitude: entity?.last_address?.latitude,
        longitude: entity?.last_address?.longitude,
        timestamp: moment(dateFrom).add({ day: 24, minute: 0 }),
      },
    };
    points = [...points, lastPoint];
  }

  const mappedResult = points
    .reverse()
    .reduce((acc: any, point: App.Point, index: number) => {
      const lastPointDay = moment(
        entity?.last_stop_point?.final_status?.timestamp,
      ).format("YYYY-MM-DD");
      let isLastPoint = entity?.activity === "moving" &&
        entity?.last_stop_point?.id === point.id &&
        lastPointDay === dateFrom;

      let pointDuration = isLastPoint
        ? moment().unix() - moment(point?.final_status?.timestamp).unix()
        : moment(prevPoint?.initial_status?.timestamp).unix() -
          moment(point?.final_status?.timestamp).unix();

      if (
        index === 0 &&
        entityTruck?.state === "in_trip" &&
        entity.activity === "unknown"
      ) {
        pointDuration = moment(entity?.last_status?.timestamp).unix() -
          moment(point?.final_status?.timestamp).unix();
        isLastPoint = true;
      }

      if (prevPoint.id === "lastPoint") {
        pointDuration = moment(dateFrom).add({ hours: 24, minute: 0 }).unix() - moment(point?.final_status?.timestamp).unix()
      }      

      const segment = getSegment(
        point?.final_status?.timestamp,
        prevTimestamp,
        odometer,
        isLastPoint,
      );

      const result = {
        ...point,
        activity_changed_at: entity?.activity_changed_at,
        odometer: getDistanceByTimestamp(segment),
        segment,
        state: entityTruck?.state,
        pointSegment: getSegmentForPoint(
          point?.initial_status?.timestamp,
          point?.final_status?.timestamp,
          odometer,
        ),
        //   pointSegment: [],
        isLastPoint,
        pointDuration,
        prevTimestamp,
        prevPoint,
      };
      prevPoint = point;
      prevTimestamp = point?.final_status?.timestamp;
      return [...acc, result];
    }, []);

  return mappedResult;
};
