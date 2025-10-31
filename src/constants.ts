import { Dimensions, Platform } from "react-native";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("screen").height;

export const BASE_URL = "https://app.transinet.eu/";

const DBHF = {
    android: 130, // 260
    ios: 130 // 200
}

export const DEFAULT_BSH_HEIGHT = Platform.select({
    android: DBHF.android + 90,
    ios: DBHF.ios + 110,
}) as number;

export const DEFAULT_BSH_HEIGHT_DIFF = Platform.select({
    android: DBHF.android,
    ios: DBHF.ios,
}) as number;

export const DEFAULT_BSH_HEIGHT_WITH_KEYBOARD = Platform.select({
    // android: 390,
    android: DBHF.android + 230,
    ios: DBHF.ios + 80,
}) as number;

export const HEIGHT_SCREEN = Dimensions.get("screen").height;
// export const BUTTON_SIZE = WIDTH > 600 ? 32 : (WIDTH - (32 + 32 + 8)) / 7;
export const BUTTON_SIZE = 48;

export const SAVED_LOGIN = "SAVED_LOGIN";
export const SAVED_PASSWORD = "SAVED_PASSWORD";

export const COUNTRIES = [
    {
        code: "DE",
        label: "Germany",
    },
    {
        code: "FR",
        label: "France",
    },
    {
        code: "PL",
        label: "Poland",
    },
    {
        code: "BE",
        label: "Belgium",
    },
    {
        code: "NL",
        label: "Netherlands",
    },
    {
        code: "LU",
        label: "Luxembourg",
    },
    {
        code: "AT",
        label: "Austria",
    },
    {
        code: "CH",
        label: "Switzerland",
    },
    {
        code: "AM",
        label: "Armenia",
    },
    {
        code: "AZ",
        label: "Azerbaijan",
    },
    {
        code: "BY",
        label: "Belarus",
    },
    {
        code: "BG",
        label: "Bulgaria",
    },
    {
        code: "HR",
        label: "Croatia",
    },
    {
        code: "CY",
        label: "Cyprus",
    },
    {
        code: "CZ",
        label: "Czech Republic",
    },
    {
        code: "DK",
        label: "Denmark",
    },
    {
        code: "EE",
        label: "Estonia",
    },
    {
        code: "FI",
        label: "Finland",
    },
    {
        code: "GR",
        label: "Greece",
    },
    {
        code: "HU",
        label: "Hungary",
    },
    {
        code: "IS",
        label: "Iceland",
    },
    {
        code: "IE",
        label: "Ireland",
    },
    {
        code: "IT",
        label: "Italy",
    },
    {
        code: "KZ",
        label: "Kazakhstan",
    },
    {
        code: "KG",
        label: "Kyrgyzstan",
    },
    {
        code: "LV",
        label: "Latvia",
    },
    {
        code: "LI",
        label: "Liechtenstein",
    },
    {
        code: "LT",
        label: "Lithuania",
    },
    {
        code: "MT",
        label: "Malta",
    },
    {
        code: "NO",
        label: "Norway",
    },
    {
        code: "PT",
        label: "Portugal",
    },
    {
        code: "MD",
        label: "Republic of Moldova",
    },
    {
        code: "RO",
        label: "Romania",
    },
    {
        code: "RU",
        label: "Russia",
    },
    {
        code: "SK",
        label: "Slovakia",
    },
    {
        code: "SI",
        label: "Slovenia",
    },
    {
        code: "ES",
        label: "Spain",
    },
    {
        code: "SE",
        label: "Sweden",
    },
    {
        code: "TJ",
        label: "Tajikistan",
    },
    {
        code: "TR",
        label: "Turkey",
    },
    {
        code: "TM",
        label: "Turkmenistan",
    },
    {
        code: "GB",
        label: "United Kingdom",
    },
    {
        code: "UZ",
        label: "Uzbekistan",
    },
    {
        code: "MC",
        label: "Monaco",
    },
    {
        code: "AD",
        label: "Andorra",
    },
    {
        code: "SM",
        label: "San Marino",
    },
    {
        code: "BA",
        label: "Bosnia and Herzegovina",
    },
    {
        code: "MK",
        label: "The former Yugoslav Republic of Macedonia",
    },
    {
        code: "ME",
        label: "Montenegro",
    },
    {
        code: "AL",
        label: "Albania",
    },
    {
        code: "RS",
        label: "Serbia",
    },
    {
        code: "UA",
        label: "Ukraine",
    },
    {
        code: "IR",
        label: "Iran (Islamic Republic of)",
    },
    {
        code: "CN",
        label: "China",
    },
    {
        code: "MN",
        label: "Mongolia",
    },
    {
        code: "AU",
        label: "Australia",
    },
    {
        code: "AX",
        label: "Åland Islands",
    },
    {
        code: "DZ",
        label: "Algeria",
    },
    {
        code: "AS",
        label: "American Samoa",
    },
    {
        code: "AI",
        label: "Anguilla",
    },
    {
        code: "AO",
        label: "Angola",
    },
    {
        code: "AQ",
        label: "Antarctica",
    },
    {
        code: "AG",
        label: "Antigua and Barbuda",
    },
    {
        code: "AR",
        label: "Argentina",
    },
    {
        code: "AW",
        label: "Aruba",
    },
    {
        code: "AF",
        label: "Afghanistan",
    },
    {
        code: "BS",
        label: "Bahamas",
    },
    {
        code: "BD",
        label: "Bangladesh",
    },
    {
        code: "BB",
        label: "Barbados",
    },
    {
        code: "BH",
        label: "Bahrain",
    },
    {
        code: "BZ",
        label: "Belize",
    },
    {
        code: "BJ",
        label: "Benin",
    },
    {
        code: "BM",
        label: "Bermuda",
    },
    {
        code: "BO",
        label: "Bolivia",
    },
    {
        code: "BW",
        label: "Botswana",
    },
    {
        code: "BR",
        label: "Brazil",
    },
    {
        code: "IO",
        label: "British Indian Ocean Territory",
    },
    {
        code: "BN",
        label: "Brunei Darussalam",
    },
    {
        code: "BF",
        label: "Burkina Faso",
    },
    {
        code: "BI",
        label: "Burundi",
    },
    {
        code: "BT",
        label: "Bhutan",
    },
    {
        code: "VU",
        label: "Vanuatu",
    },
    {
        code: "VA",
        label: "Holy See (Vatican City)",
    },
    {
        code: "VE",
        label: "Venezuela",
    },
    {
        code: "VG",
        label: "British Virgin Islands",
    },
    {
        code: "VI",
        label: "United States Virgin Islands",
    },
    {
        code: "UM",
        label: "United States Minor Outlying Islands",
    },
    {
        code: "TL",
        label: "Timor-Leste",
    },
    {
        code: "VN",
        label: "Viet Nam",
    },
    {
        code: "GA",
        label: "Gabon",
    },
    {
        code: "HT",
        label: "Haiti",
    },
    {
        code: "GY",
        label: "Guyana",
    },
    {
        code: "GM",
        label: "Gambia",
    },
    {
        code: "GH",
        label: "Ghana",
    },
    {
        code: "GP",
        label: "Guadeloupe",
    },
    {
        code: "GT",
        label: "Guatemala",
    },
    {
        code: "GN",
        label: "Guinea",
    },
    {
        code: "GW",
        label: "Guinea-Bissau",
    },
    {
        code: "GG",
        label: "Guernsey",
    },
    {
        code: "GI",
        label: "Gibraltar",
    },
    {
        code: "HN",
        label: "Honduras",
    },
    {
        code: "HK",
        label: "Hong Kong",
    },
    {
        code: "GD",
        label: "Grenada",
    },
    {
        code: "GL",
        label: "Greenland",
    },
    {
        code: "GE",
        label: "Georgia",
    },
    {
        code: "GU",
        label: "Guam",
    },
    {
        code: "JE",
        label: "Jersey",
    },
    {
        code: "DJ",
        label: "Djibouti",
    },
    {
        code: "DM",
        label: "Dominica",
    },
    {
        code: "DO",
        label: "Dominican Republic",
    },
    {
        code: "EG",
        label: "Egypt",
    },
    {
        code: "ZM",
        label: "Zambia",
    },
    {
        code: "EH",
        label: "Western Sahara",
    },
    {
        code: "ZW",
        label: "Zimbabwe",
    },
    {
        code: "IL",
        label: "Israel",
    },
    {
        code: "IN",
        label: "India",
    },
    {
        code: "ID",
        label: "Indonesia",
    },
    {
        code: "JO",
        label: "Jordan",
    },
    {
        code: "IQ",
        label: "Iraq",
    },
    {
        code: "YE",
        label: "Yemen",
    },
    {
        code: "KP",
        label: "Korea, Democratic People's Republic of",
    },
    {
        code: "CV",
        label: "Cape Verde",
    },
    {
        code: "KY",
        label: "Cayman Islands",
    },
    {
        code: "KH",
        label: "Cambodia",
    },
    {
        code: "CM",
        label: "Cameroon",
    },
    {
        code: "CA",
        label: "Canada",
    },
    {
        code: "QA",
        label: "Qatar",
    },
    {
        code: "KE",
        label: "Kenya",
    },
    {
        code: "KI",
        label: "Kiribati",
    },
    {
        code: "CC",
        label: "Cocos (Keeling) Islands",
    },
    {
        code: "CO",
        label: "Colombia",
    },
    {
        code: "KM",
        label: "Comoros",
    },
    {
        code: "CG",
        label: "Congo",
    },
    {
        code: "CD",
        label: "Democratic Republic of the Congo",
    },
    {
        code: "CR",
        label: "Costa Rica",
    },
    {
        code: "CI",
        label: "Cote d'Ivoire",
    },
    {
        code: "CU",
        label: "Cuba",
    },
    {
        code: "KW",
        label: "Kuwait",
    },
    {
        code: "LA",
        label: "Lao People's Democratic Republic",
    },
    {
        code: "LS",
        label: "Lesotho",
    },
    {
        code: "LR",
        label: "Liberia",
    },
    {
        code: "LB",
        label: "Lebanon",
    },
    {
        code: "LY",
        label: "Libyan Arab Jamahiriya",
    },
    {
        code: "MU",
        label: "Mauritius",
    },
    {
        code: "MR",
        label: "Mauritania",
    },
    {
        code: "MG",
        label: "Madagascar",
    },
    {
        code: "YT",
        label: "Mayotte",
    },
    {
        code: "MO",
        label: "Macau",
    },
    {
        code: "MW",
        label: "Malawi",
    },
    {
        code: "MY",
        label: "Malaysia",
    },
    {
        code: "ML",
        label: "Mali",
    },
    {
        code: "MV",
        label: "Maldives",
    },
    {
        code: "MA",
        label: "Morocco",
    },
    {
        code: "MQ",
        label: "Martinique",
    },
    {
        code: "MH",
        label: "Marshall Islands",
    },
    {
        code: "MX",
        label: "Mexico",
    },
    {
        code: "MZ",
        label: "Mozambique",
    },
    {
        code: "MS",
        label: "Montserrat",
    },
    {
        code: "MM",
        label: "Burma",
    },
    {
        code: "NA",
        label: "Namibia",
    },
    {
        code: "NR",
        label: "Nauru",
    },
    {
        code: "NP",
        label: "Nepal",
    },
    {
        code: "NE",
        label: "Niger",
    },
    {
        code: "NG",
        label: "Nigeria",
    },
    {
        code: "AN",
        label: "Netherlands Antilles",
    },
    {
        code: "NI",
        label: "Nicaragua",
    },
    {
        code: "NU",
        label: "Niue",
    },
    {
        code: "NZ",
        label: "New Zealand",
    },
    {
        code: "NC",
        label: "New Caledonia",
    },
    {
        code: "IM",
        label: "Isle of Man",
    },
    {
        code: "SH",
        label: "Saint Helena",
    },
    {
        code: "TC",
        label: "Turks and Caicos Islands",
    },
    {
        code: "AE",
        label: "United Arab Emirates",
    },
    {
        code: "OM",
        label: "Oman",
    },
    {
        code: "PK",
        label: "Pakistan",
    },
    {
        code: "PW",
        label: "Palau",
    },
    {
        code: "PS",
        label: "Palestine",
    },
    {
        code: "PA",
        label: "Panama",
    },
    {
        code: "PG",
        label: "Papua New Guinea",
    },
    {
        code: "PY",
        label: "Paraguay",
    },
    {
        code: "PE",
        label: "Peru",
    },
    {
        code: "PN",
        label: "Pitcairn Islands",
    },
    {
        code: "PR",
        label: "Puerto Rico",
    },
    {
        code: "KR",
        label: "Korea, Republic of",
    },
    {
        code: "RE",
        label: "Reunion",
    },
    {
        code: "RW",
        label: "Rwanda",
    },
    {
        code: "SV",
        label: "El Salvador",
    },
    {
        code: "WS",
        label: "Samoa",
    },
    {
        code: "ST",
        label: "Sao Tome and Principe",
    },
    {
        code: "SA",
        label: "Saudi Arabia",
    },
    {
        code: "SZ",
        label: "Swaziland",
    },
    {
        code: "MP",
        label: "Northern Mariana Islands",
    },
    {
        code: "SC",
        label: "Seychelles",
    },
    {
        code: "BL",
        label: "Saint Barthelemy",
    },
    {
        code: "MF",
        label: "Saint Martin",
    },
    {
        code: "PM",
        label: "Saint Pierre and Miquelon",
    },
    {
        code: "SN",
        label: "Senegal",
    },
    {
        code: "VC",
        label: "Saint Vincent and the Grenadines",
    },
    {
        code: "KN",
        label: "Saint Kitts and Nevis",
    },
    {
        code: "LC",
        label: "Saint Lucia",
    },
    {
        code: "SG",
        label: "Singapore",
    },
    {
        code: "SY",
        label: "Syrian Arab Republic",
    },
    {
        code: "US",
        label: "United States",
    },
    {
        code: "SB",
        label: "Solomon Islands",
    },
    {
        code: "SO",
        label: "Somalia",
    },
    {
        code: "SD",
        label: "Sudan",
    },
    {
        code: "SR",
        label: "Suriname",
    },
    {
        code: "SL",
        label: "Sierra Leone",
    },
    {
        code: "TH",
        label: "Thailand",
    },
    {
        code: "TW",
        label: "Taiwan",
    },
    {
        code: "TZ",
        label: "United Republic of Tanzania",
    },
    {
        code: "TG",
        label: "Togo",
    },
    {
        code: "TK",
        label: "Tokelau",
    },
    {
        code: "TO",
        label: "Tonga",
    },
    {
        code: "TT",
        label: "Trinidad and Tobago",
    },
    {
        code: "TV",
        label: "Tuvalu",
    },
    {
        code: "TN",
        label: "Tunisia",
    },
    {
        code: "UG",
        label: "Uganda",
    },
    {
        code: "WF",
        label: "Wallis and Futuna Islands",
    },
    {
        code: "UY",
        label: "Uruguay",
    },
    {
        code: "FO",
        label: "Faroe Islands",
    },
    {
        code: "FM",
        label: "Micronesia, Federated States of",
    },
    {
        code: "FJ",
        label: "Fiji",
    },
    {
        code: "PH",
        label: "Philippines",
    },
    {
        code: "FK",
        label: "Falkland Islands (Malvinas)",
    },
    {
        code: "GF",
        label: "French Guiana",
    },
    {
        code: "PF",
        label: "French Polynesia",
    },
    {
        code: "TF",
        label: "French Southern and Antarctic Lands",
    },
    {
        code: "CF",
        label: "Central African Republic",
    },
    {
        code: "TD",
        label: "Chad",
    },
    {
        code: "CL",
        label: "Chile",
    },
    {
        code: "SJ",
        label: "Svalbard",
    },
    {
        code: "LK",
        label: "Sri Lanka",
    },
    {
        code: "EC",
        label: "Ecuador",
    },
    {
        code: "GQ",
        label: "Equatorial Guinea",
    },
    {
        code: "ER",
        label: "Eritrea",
    },
    {
        code: "ET",
        label: "Ethiopia",
    },
    {
        code: "ZA",
        label: "South Africa",
    },
    {
        code: "GS",
        label: "South Georgia South Sandwich Islands",
    },
    {
        code: "JM",
        label: "Jamaica",
    },
    {
        code: "JP",
        label: "Japan",
    },
    {
        code: "BV",
        label: "Bouvet Island",
    },
    {
        code: "NF",
        label: "Norfolk Island",
    },
    {
        code: "CX",
        label: "Christmas Island",
    },
    {
        code: "CK",
        label: "Cook Islands",
    },
    {
        code: "HM",
        label: "Heard Island and McDonald Islands",
    },
];

export const Z_INDEXES = {
    PROGRESS_BAR: 50,
    MAP: -1,
    BOTTOM_SHEET: 10,
};