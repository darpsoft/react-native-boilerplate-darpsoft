import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import TextApp from "@components/TextApp";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "@redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };

  const signOut = () => {
    dispatch(signoutSuccess());
  };

  return (
    <View style={styles.containers}>
      <TextApp.Default>Hello world</TextApp.Default>
      <Button mode="outlined" style={{ marginTop: 32 }} onPress={signOut}>
        Cerrar sesión
      </Button>
    </View>
  );
};

const useStyle = (theme) => StyleSheet.create({});

export default Home;
