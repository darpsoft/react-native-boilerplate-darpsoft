import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import { updateReduxAuthStart } from "@redux/actions";
import { customUseReducer } from "@utils/customHooks";
import { storage } from "../../index";

var { height } = Dimensions.get("window");
// Auth
import Home from "@screens/Home";

// Inicio
import Login from "@screens/Login";
import Register from "@screens/Register";

// SplashScreen
import SplashScreen from "@components/SplashScreen";
import { throttle } from "lodash";
import { database } from "@database";

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

export const Root = ({ loading }) => {
  const { auth } = useSelector((store) => store);
  if (loading) {
    return <SplashScreen />; // OPTIONAL: Aquí podría estar el SplashScreen (Donde se tenga que cargar algo) **(Opcional)
  }
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

const initialState = {
  loading: true,
};

export default AppCreate = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [state, dispatchComponent] = customUseReducer(initialState);

  useEffect(() => {
    initialRequest();
    suscribeStorage();
  }, []);

  const initialRequest = async () => {
    return new Promise((resolve, reject) => {
      dispatch(updateReduxAuthStart({ resolve, reject }));
    })
      .then((res) => {
        console.log(res);
        dispatchComponent({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        dispatchComponent({ loading: false });
      });
  };

  /**
   * Función para guardar los datos cuando se actualice el Storage, en este caso solo guardará <user, auth>
   */
  const suscribeStorage = () => {
    storage.subscribe(
      throttle(() => {
        const { auth } = storage.getState();
        database.auth.set(auth, "object");
      }, 200)
    );
  };
  return (
    <NavigationContainer theme={theme}>
      <Root loading={state.loading} />
    </NavigationContainer>
  );
};
