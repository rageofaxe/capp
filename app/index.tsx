import { createDrawerNavigator } from "@react-navigation/drawer";

import MenuDrawer from "@/src/components/MenuDrawer";
import Login from "@/src/screens/Login";
import Main from "@/src/screens/Main";
import Settings from "@/src/screens/Settings";

import useLocales from "@/src/locales/useLocales";
import { Platform } from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

if (Platform.OS === "ios") {
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,  // Disable strict mode
  });
}

console.log("INIT");

const Drawer = createDrawerNavigator<{
  Main: undefined;
  Login: undefined;
  SettingsA: undefined;
}>();

export default () => {
  useLocales()
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <MenuDrawer {...props} />}
    >
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="SettingsA"
        component={Settings}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen name="Main" component={Main} />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};
