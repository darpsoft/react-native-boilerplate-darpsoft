import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, useTheme, Portal } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import TextApp from "@components/TextApp";
import ButtonApp from "@components/ButtonApp";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/**
 * Show Modal
 *
 * @param {object} params
 * @param {string} params.title
 * @param {string} params.secondTitle
 * @param {string} params.description
 * @param {boolean} params.visible
 * @param {function} params.onDismiss
 * @param {function} params.onCancel
 * @param {function} params.onOk
 * @param {string} params.textOk
 * @param {string} params.textCancel
 * @param {string} params.icon
 * @returns
 */

const ModalApp = ({
  visible,
  onDismiss,
  onOk,
  onLoad,
  onCancel,
  capitalize,
  textOk = "",
  textCancel = "",
  secondTitle = "",
  title = "",
  description = "",
  icon = "",
}) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  const largeButton = textOk === "" || textCancel === "";
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.containerStyle}>
        {icon !== "" && (
          <View style={{ alignItems: "center" }}>
            <Icon name={icon} size={42} color={theme.colors.primary} style={{ opacity: 0.7 }} />
          </View>
        )}
        {title !== "" && (
          <TextApp.Default
            fontSize="24"
            style={[
              { textAlign: "center", color: theme.colors.primary, marginBottom: 16, fontWeight: "700" },
              capitalize && { textTransform: "capitalize" },
            ]}
          >
            {title}
          </TextApp.Default>
        )}
        {description !== "" && (
          <TextApp.Default fontSize="20" style={{ textAlign: "center", marginVertical: 24, color: theme.colors.primary, opacity: 0.7 }}>
            {description}
          </TextApp.Default>
        )}
        {secondTitle !== "" && (
          <TextApp.Default fontSize="24" style={{ textAlign: "center", marginBottom: 24, color: theme.colors.primary }}>
            {secondTitle}
          </TextApp.Default>
        )}
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            {textOk !== "" && (
              <ButtonApp.Small
                style={[{ flex: 1, marginRight: 16 }, largeButton && { width: "100%" }]}
                onPress={onOk}
                loading={onLoad}
                disabled={onLoad}
              >
                {textOk}
              </ButtonApp.Small>
            )}
            {textCancel !== "" && (
              <ButtonApp.Small style={[{ flex: 1 }, largeButton && { width: "100%" }]} onPress={onCancel} mode="outline" disabled={onLoad}>
                {textCancel}
              </ButtonApp.Small>
            )}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const useStyle = (theme) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    containerStyle: {
      backgroundColor: theme.colors.white,
      padding: 20,
      marginHorizontal: 16,
      borderRadius: 16,
    },
  });

export default ModalApp;
