import { useEffect } from "react";
import { Platform, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useUnit } from "effector-react";
import app from "../../app.json";
import { HEIGHT_SCREEN, SAVED_LOGIN, SAVED_PASSWORD } from "../constants";
import { clearFilters } from "../models/filters/model";
import { $strings } from "../models/settings/model";
import { $accountName, clearVehicles, getAccountNameFx } from "../models/vehicles/model";
import LogoSVG from "./SVG/Logo";

export default function MenuDrawer({ navigation }: DrawerContentComponentProps) {
    const accountName = useUnit($accountName);
    const strings = useUnit<any>($strings);

    useEffect(() => {
        getAccountNameFx();
    }, [accountName]);

    const logout = async () => {
        await AsyncStorage.setItem(SAVED_LOGIN, "");
        await AsyncStorage.setItem(SAVED_PASSWORD, "");
        navigation.navigate("Login");
        clearVehicles();
        clearFilters();
    };

    const openSettings = () => {
        navigation.navigate("SettingsA");
    }

    return (
        <View
            style={{
                height: Platform.select({
                    ios: HEIGHT_SCREEN,
                    android: HEIGHT_SCREEN - 100,
                }),
                justifyContent: "space-between",
                paddingVertical: 32,
                alignItems: "center",
            }}
        >
            <View style={{ width: "100%", alignItems: "center" }}>
                <LogoSVG style={{ marginVertical: 64 }} />
                <View
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: "#BDC6DC",
                        width: "80%",
                        paddingVertical: 12,
                    }}
                    key={accountName}
                >
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>{accountName}</Text>
                </View>
                <View
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: "#BDC6DC",
                        width: "80%",
                        paddingVertical: 12,
                    }}
                    onTouchStart={openSettings}
                    key={"settings"}
                >
                    <Text style={{ fontSize: 18 }}>{strings.settings.h1}</Text>
                </View>
                <View
                    onTouchStart={logout}
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: "#BDC6DC",
                        width: "80%",
                        paddingVertical: 12,
                    }}
                >
                    <Text style={{ fontSize: 17 }}>{strings.logout}</Text>
                </View>
            </View>

            <View>
                <Text>v{app.expo.version}</Text>
            </View>
        </View>
    );
}