import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function CheckBoxExample({ formik, valueName }: { formik: any; valueName: string }) {
  const foodOptions = [
    { label: "Vegan", value: "V" },
    { label: "Dairy-Free", value: "DF" },
    { label: "Meat", value: "M" },
    { label: "Gluten-Free", value: "GF" },
    { label: "Nuts-Free", value: "NF" },
  ];

  const toggleSelection = (value: string) => {
    let currentValues = formik.values[valueName] || [];

    if (currentValues.includes(value)) {
      currentValues = currentValues.filter((item: string) => item !== value);
    } else {
      currentValues = [...currentValues, value];
    }

    formik.setFieldValue(valueName, currentValues);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select The Food Types:</Text>

      {foodOptions.map((option) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="#00ff00" // Green when checked
            unFillColor="#1a1f24"
            text={option.label}
            textStyle={[styles.checkboxLabel, { textDecorationLine: "none" }]}
            iconStyle={{ borderColor: "#ccc" }}
            isChecked={formik.values[valueName]?.includes(option.value)}
            onPress={() => toggleSelection(option.value)}
          />
        </View>
      ))}

      {/* ✅ Display selected items as before */}
      <Text style={styles.selectedText}>Selected: {formik.values[valueName]?.length > 0 ? formik.values[valueName].join(", ") : "None"}</Text>

      {/* ✅ Display error message if validation fails */}
      {formik.touched[valueName] && formik.errors[valueName] ? <Text style={styles.errorText}>{formik.errors[valueName]}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#1a1f24",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    paddingHorizontal: 15,
    paddingLeft: 20,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
  },
});
