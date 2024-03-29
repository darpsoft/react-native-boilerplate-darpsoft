import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import "react-native-gesture-handler";

import { useSelector } from "react-redux";

// Auth
import Home from "@screens/Home";

// Inicio
import Login from "@screens/Login";
import Register from "@screens/Register";

import { database } from "@database";

const { height } = Dimensions.get("window");

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const UserStackScreen = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        initialRouteName: "Home",
        activeTintColor: theme.colors.accent,
        inactiveTintColor: theme.colors.inactiveS,
        allowFontScaling: false,
        style: {
          backgroundColor: theme.colors.surfaceTop,
          borderTopEndRadius: 5,
          borderTopStartRadius: 5,
          overflow: "hidden",
          position: "absolute",
          height: height / 12.8,
        },
      }}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Meses" component={Home} />
      <Tab.Screen name="Membresia" component={Home} />
      <Tab.Screen name="Planes" component={Home} />
    </Tab.Navigator>
  );
};

const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

export const Root = () => {
  const { auth } = useSelector((store) => store);

  return (
    <RootStack.Navigator
      initialRouteName="Auth"
      headerMode="none"
      mode="card"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {auth?.tokenUser === null ? (
        <>
          <RootStack.Screen name="AuthStack" component={AuthStackScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen name="UserStack" component={UserStackScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

/**
 * Cuando se agregue un nuevo persis,
 * se tiene que colocar aquí
 */
// eslint-disable-next-line prefer-const
let firstLoad = {
  auth: true,
};

const PersisReducer = () => {
  const auth = useSelector(({ auth }) => auth);

  useEffect(() => {
    saveReducerData("auth", auth);
  }, [auth]);

  /**
   * Función para guardar los datos cuando se actualice el Storage,
   * en este caso solo guardará <auth>
   */
  async function saveReducerData(nameReducer, storage) {
    if (!firstLoad[nameReducer]) {
      await database[nameReducer].set(storage, "object");
    } else {
      firstLoad[nameReducer] = false;
    }
  }

  return <View />;
};

const AppCreate = () => {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Root loading={false} />
      <PersisReducer />
    </NavigationContainer>
  );
};

export default AppCreate;
