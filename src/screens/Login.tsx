import { NetInfoState, useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useMemo, useRef, useState } from "react";

import { useKeyboard } from "@react-native-community/hooks";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";
import LogoSVG from "../components/SVG/Logo";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUnit } from "effector-react";
import { HEIGHT, SAVED_LOGIN, SAVED_PASSWORD } from "../constants";
import "../models";
import { $strings } from "../models/settings/model";
import { authFx, getAccountNameFx } from "../models/vehicles/model";

export default function App() {
    const strings = useUnit<any>($strings);
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isEnabled, setEnabled] = useState(false);
    const navigation = useNavigation<any>();
    const keyboard = useKeyboard();
    const net = useNetInfo();

    useEffect(() => {
        (async () => {
            const login = (await AsyncStorage.getItem("SAVED_LOGIN")) as string;
            const password = (await AsyncStorage.getItem("SAVED_PASSWORD")) as string;

            if (!!login && !!password) {
                loginRef.current.setNativeProps({ text: login });
                passwordRef.current.setNativeProps({ text: password });
                setEnabled(true);

                await authFx({
                    login,
                    password,
                });
                const status = (await AsyncStorage.getItem("authStatus")) as string;
                if (status === "200") {
                    navigation.navigate("Main");
                    setLogin("");
                    setPassword("");
                    loginRef.current.setNativeProps({ text: "" });
                    passwordRef.current.setNativeProps({ text: "" });
                }
            }
        })();
    }, []);

    const toggleSwitch = () => {
        setEnabled((state) => !state);
    };


    const loginRef = useRef<any>({current: {}});
    const passwordRef = useRef<any>({current: {}});

    const auth = async (net: NetInfoState) => {
        if (!net.isConnected) {
            alert(strings.login.checkConnection);
            return;
        }
        await authFx({
            login,
            password,
            // login: "kost9test32133@yandex.ru",
            // password: "182635741623",
        });
        const status = (await AsyncStorage.getItem("authStatus")) as string;
        if (status === "200") {
            navigation.navigate("Main");
            if (isEnabled) {
                await AsyncStorage.setItem(SAVED_LOGIN, login);
                await AsyncStorage.setItem(SAVED_PASSWORD, password);
            } else {
                await AsyncStorage.setItem(SAVED_LOGIN, "");
                await AsyncStorage.setItem(SAVED_PASSWORD, "");
            }
            setLogin("");
            setPassword("");
            loginRef.current.setNativeProps({ text: "" });
            passwordRef.current.setNativeProps({ text: "" });
            console.log("200 !!!!!!", login);
            getAccountNameFx();
        } else {
            alert(strings.login.wrongCredentials);
        }
    };

    const validateLogin = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (login.length === 0) {
            setLoginError(strings.login.emptyLoginError)
        } else if (reg.test(login) === false) {
            setLoginError(strings.login.validLoginError)
        } else  {
            setLoginError("")
        }
    }

    const validatePassword = () => {
        if (password.length === 0) {
            setPasswordError(strings.login.passwordError)
        } else {
            setPasswordError("")
        }
    }

    const validateSubmit = () => {
        validatePassword()
        validateLogin()
    }

    const submitValidation = useMemo(() => !!login && !loginError && !!password, [login,loginError,password])

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="dark" backgroundColor="#EAFAF1" />

            <View style={styles.container}>
                <View
                    style={[
                        styles.logoContainer,
                        {
                            height: keyboard.keyboardShown
                                ? HEIGHT > 670 ? 120 : 80
                                : styles.logoContainer.height,
                        },
                    ]}
                >
                    <LogoSVG />
                    <Text style={styles.logoHeader}>{strings.login.h1}</Text>
                </View>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={styles.formHeader}>{strings.login.h2}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder={strings.login.email}
                        onChangeText={setLogin}
                        ref={loginRef}
                        onBlur={validateLogin}
                    />
                    {!!loginError && <Text style={styles.error}>{loginError}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder={strings.login.password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        ref={passwordRef}
                        onBlur={validatePassword}
                    />
                    {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}
                    <View style={styles.keepLogged}>
                        <Text style={styles.keepLabel}>{strings.login.label}</Text>
                        <Switch
                            trackColor={{ false: "#E6E6E6", true: "#E6E6E6" }}
                            thumbColor={isEnabled ? "#0070CE" : "#f4f3f4"}
                            ios_backgroundColor="#E6E6E6"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <TouchableHighlight>
                        <View style={[styles.button, submitValidation ? {} : styles.disabled]} onTouchStart={() => submitValidation ? auth(net) : validateSubmit()}>
                            <Text style={styles.buttonText}>{strings.login.button}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.footerContainer}></View>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    logoContainer: {
        marginTop: 32,
        gap: 16,
        height: HEIGHT / 4,
        justifyContent: "center",
        alignItems: "center",
    },
    logoHeader: {
        fontSize: 20,
        fontWeight: "300",
        textAlign: "center",
    },
    formContainer: {
        padding: 32,
        gap: 16,
    },
    formHeader: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },

    footerContainer: {
        height: HEIGHT / 2,
    },

    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderColor: "#CBCBCB",
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: "#0070CE",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11,
    },
    disabled: {
        backgroundColor: "#CBCBCB",
    },
    keepLogged: {
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    keepLabel: {
        fontWeight: "500",
        fontSize: 15,
    },
    buttonText: {
        fontSize: 15,
        color: "white",
    },
    error: {
        color: "red"
    }
});