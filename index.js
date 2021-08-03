import React, { useEffect } from "react";
import { AppRegistry, StatusBar } from "react-native";
import App from "./src/navigation";
import { name as appName } from "./app.json";

import { Provider as PaperProvider, useTheme } from "react-native-paper";
import { changeTheme } from "./src/assets/styles/themes";

import { Provider, useSelector } from "react-redux";
import reduxStore from "./src/redux";
import Config from "react-native-config";

export const storage = reduxStore();

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

function Main() {
  console.log(Config);
  useEffect(() => {
    console.log(`Versión ${Config.VERSION_NAME}`);
  }, []);

  return (
    <Provider store={storage}>
      <WithPaper />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
