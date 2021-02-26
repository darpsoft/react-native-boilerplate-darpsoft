import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import { Wrapper, Text, ControllerTextInput } from "@components/index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginStart } from "@redux/actions";

const getInputsForm = ({ control }) => {
  return [
    {
      status: true,
      label: "Teléfono",
      placeholder: "Ingrese un número de teléfono",
      name: "celphone",
      defaultValue: "1000000",
      rules: { required: { value: true, message: "Debes escribir un número telefonico" } },
    },
    {
      status: true,
      label: "Contraseña",
      placeholder: "Ingrese una contraseña",
      name: "password",
      defaultValue: "adminImpuesto21",
      secureTextEntry: true,
      rules: { required: { value: true, message: "Debe escribir una contraseña" } },
    },
  ];
};

const Login = () => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  const { control, handleSubmit, errors } = useForm();
  const inputsForm = useMemo(() => getInputsForm({ control }), []);
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    console.log("SE REGISTRARON LOS DATOS", values);
    dispatch(loginStart(values));
  };

  return (
    <Wrapper>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../assets/images/logo.png")} />
          <Text>Bienvenido</Text>
        </View>
        {inputsForm
          .filter((input) => input.status)
          .map((input, index) => (
            <ControllerTextInput
              key={index}
              {...input}
              errors={errors}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput {...input} style={styles.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} error={errors[input.name]} />
              )}
            />
          ))}

        <Button mode="contained" onPress={handleSubmit(handleRegister)}>
          Iniciar Sesión
        </Button>
      </View>
    </Wrapper>
  );
};

const useStyle = (theme) => StyleSheet.create({});

export default Login;
