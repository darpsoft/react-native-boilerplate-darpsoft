import React, { useEffect } from "react";
import { AppRegistry, StatusBar } from "react-native";
import App from "./src/navigation";
import { name as appName } from "./app.json";

import { Provider as PaperProvider, useTheme } from "react-native-paper";
import { changeTheme } from "./src/assets/styles/themes";

import { Provider, useSelector } from "react-redux";
import reduxStore from "./src/redux";
import Config from "react-native-config";
import SplashScreen from "@components/SplashScreen";
import { useReducerCustom } from "@utils/customHooks";
import { database } from "./src/database";

export const getStorageAsync = async () => {
  const auth = await database.auth.get("object");
  return { ...(auth ?? {}) };
};

const WithStatusBar = () => {
  const theme = useTheme();
  return (
    <>
      <StatusBar backgroundColor={theme.colors.surfaceNav} animated barStyle={theme.dark ? "light-content" : "dark-content"} />
      <App />
    </>
  );
};

const WithPaper = () => {
  const { theme } = useSelector(({ settings }) => settings);
  return (
    <PaperProvider theme={changeTheme(theme)}>
      <WithStatusBar />
    </PaperProvider>
  );
};

const initialState = {
  loading: true,
  reducers: null,
};

function Main() {
  const [state, dispatchComponent] = useReducerCustom(initialState);

  useEffect(() => {
    console.log(`Versión ${Config.VERSION_NAME}`);
    initialRequest();
  }, []);

  const initialRequest = async () => {
    !state.loading && dispatchComponent({ loading: true });
    const reducers = await getStorageAsync();
    dispatchComponent({ loading: false, reducers });
  };

  if (state.loading) return <SplashScreen />;

  return (
    <Provider store={reduxStore(state.reducers)}>
      <WithPaper />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
