import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

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
        onBlur={() => {
          formik.handleBlur(valueName); // Ensures validation happens on blur (including autofill)
          formik.validateField(valueName); // Explicitly trigger validation
        }}
        value={formik.values[valueName]}
        {...additionalProps}
      />

      {formik.touched[valueName] && formik.errors[valueName] ? (
        <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>{formik.errors[valueName]}</Text>
      ) : null}
    </>
  );
}

export function secureInputBuilder(placeholder: string, valueName: string, formik: any, additionalProps?: any) {
  return inputBuilder(placeholder, valueName, formik, { secureTextEntry: true, ...additionalProps });
}

const styles = StyleSheet.create({
  inputStyle: {
    //backgroundColor: "#1a1f24",
    color: "#fff",
    fontSize: 20,
    backgroundColor: "#1a1f24",
    height: 60,
    width: "95%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
