import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function inputBuilder(placeholder: string, valueName: string, formik: any, additionalProps?: any, ref?: any) {
  return (
    <>
      <TextInput
        ref={ref}
        style={StyleSheet.compose(
          styles.inputStyle,
          additionalProps?.style || {} // Use additionalProps style if provided
        )}
        placeholder={placeholder}
        placeholderTextColor={"#fff"}
        onChangeText={formik.handleChange(valueName)}
        onBlur={formik.handleBlur(valueName)}
        value={formik.values[valueName]}
        {...additionalProps}
      />

      {formik.touched[valueName] && formik.errors[valueName] ? (
        <Text style={{ fontSize: 18, color: "red", paddingHorizontal: 15, paddingLeft: 20 }}>{formik.errors[valueName]}</Text>
      ) : null}
    </>
  );
}

export function secureInputBuilder(placeholder: string, valueName: string, formik: any, additionalProps?: any) {
  // return inputBuilder(placeholder, valueName, formik, { secureTextEntry: true, ...additionalProps });
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor={"#fff"}
        onChangeText={formik.handleChange(valueName)}
        onBlur={formik.handleBlur(valueName)}
        value={formik.values[valueName]}
        secureTextEntry={secureText}
        {...additionalProps}
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.iconStyle} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color="#fff" />
      </TouchableOpacity>
      {formik.touched[valueName] && formik.errors[valueName] ? (
        <Text style={{ fontSize: 18, color: "red", paddingHorizontal: 15, paddingLeft: 20 }}>{formik.errors[valueName]}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    color: "#fff",
    fontSize: 18,
    backgroundColor: "#1a1f24",
    height: 60,
    // width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    position: "relative",
    //paddingHorizontal: 5,
    justifyContent: "center",
  },
  iconStyle: {
    position: "absolute",
    right: 20,
    top: 30,
  },
});
