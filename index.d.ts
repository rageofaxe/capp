declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
namespace App {
  export type Credential = {
    login: string;
    password: string;
  };

  export type ClusterProps = {
    count: number;
  };
  export type Kind = string;

  export type Couple = {
    truck_id: number;
    trailer_id: number;
  };

  export type Driver = {
    id: number;
    first_name: string;
    last_name: string;
    photo_url: string;
    channel_id: number;
    phones: [
      {
        country_image_uri: string;
        number: string;
      },
    ];
  };

  export type Group = {
    id: number;
    name: string;
  };

  export type Vehicle = {
    id: number;
    registration_number: string;
    display_name: string;
    has_telematics: boolean;
    kind: Kind;
    activity: "parked" | "stopped" | "moving" | "unknown";
    activity_changed_at: string;
    archived_at: any;
    gsm: any;
    odometer: string;
    phones_count: number;
    duration_stats: any;
    autotrips_in_month: any;
    has_online_drivers: any;
    body_kind: any;
    partner: any;
    odometer_stats: any;
    last_auto_trip: any;
    single_svg_id: string;
    couple_svg_id: string[];
    state:
      | "at_point"
      | "cancelled"
      | "expired"
      | "finished"
      | "in_trip"
      | "not_loaded"
      | "planned";
    last_address: {
      latitude: string;
      longitude: string;
      text: string;
    };
    last_status: {
      id: number;
      created_at: string;
      border_crossing_id: any;
      engine_started: any;
      angle: number;
      total_odometer: number;
      latitude: string;
      longitude: string;
      timestamp: string;
      speed: number;
      total_fuel: number;
      voltage_ext: number;
      fuel_level: number;
      rpm: number;
      satellites: number;
      hdop: number;
      altitude: number;
      country: {
        iso2: string;
        name: string;
      };
    };
    last_stop_point: {
      id: number;
      kind: string;
      address: {
        text: string
      },
      initial_status: {
        id: number;
        timestamp: string;
      },
      final_status: {
        id: number;
        timestamp: string;
      }
    };
    _disableClustering: boolean;
    _zIndex: number;
    drivers: Driver[];
    vehicleType: string;
    country: null | {
      iso2: string;
      name: string;
    };
    groups: Group[];
    attentionLevel: "play" | "stop";
    company: {
      id: number;
      name: string;
    };
    make: string;
    model: string;
    rpm: string | null;
    hdop: string | null;
    rpm: string | null;
    voltage_ext: string | null;
    speed: string | null;
  };

  // export type Trailer = Truck;

  export type Vehicles = {
    trucks: Truck[];
    trailers: Trailer[];
    couples?: Couple[];
  };

  // export type Vehicle = Truck | Trailer

  export type MainProps = {
    bottomSheetItemRef: any;
    bottomSheetListRef: any;
    vehicleSnapIndex: any;
    vehiclesSnapIndex: any;
    mapRef: React.MutableRefObject<MapView>;
    vehicleId: number | null;
    handleSheetVehicleChanges: any;
    openDefaultRegion: any;
    openVehicle: any;
    closeVehicle: any;
    fitToSuppliedMarkers: any;
  };

  type Sorting<Values> = {
    value: Values;
    active: boolean;
  };

  export type NumberSorting = Sorting<"alpha" | "number" | "complex">;
  export type StatusSorting = Sorting<"asc" | "desc">;

  export interface Point {
    address: Point.Address
    duration: number
    final_status: Point.Status
    id: number
    initial_status: Point.Status
    kind: string
  }

  namespace Point {
    
    
    export interface Address {
      text: string
    }
    export interface Status {
      altitude: number
      angle: number
      border_crossing_id: any
      country: Country
      created_at: string
      engine_started: boolean
      fuel_level: any
      hdop: number
      id: number
      latitude: string
      longitude: string
      rpm: any
      satellites: number
      speed: number
      timestamp: string
      total_fuel: any
      total_odometer: any
      voltage_ext: number
    }
    
    export interface Country {
      iso2: string
      name: string
    }
  }
}
