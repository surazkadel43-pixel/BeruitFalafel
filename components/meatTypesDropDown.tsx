import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { List } from "react-native-paper";
import { IconButton } from "react-native-paper";

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

export function DrinkTypesCheckbox({ formik, valueName }: { formik: any; valueName: string }) {
  const drinkOptions = [
    { label: "Soda", value: "Soda" },
    { label: "Juice", value: "Juice" },
    { label: "Alcohol", value: "Alcohol" },
    { label: "Tea", value: "Tea" },
    { label: "Coffee", value: "Coffee" },
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
      <Text style={styles.label}>Select Bevrages Types:</Text>

      {drinkOptions.map((option) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="#ff9900" // Orange when checked
            unFillColor="#1a1f24"
            text={option.label}
            textStyle={[styles.checkboxLabel, { textDecorationLine: "none" }]}
            iconStyle={{ borderColor: "#ccc" }}
            isChecked={formik.values[valueName]?.includes(option.value)}
            onPress={() => toggleSelection(option.value)}
          />
        </View>
      ))}

      {/* ✅ Display selected items */}
      <Text style={styles.selectedText}>Selected: {formik.values[valueName]?.length > 0 ? formik.values[valueName].join(", ") : "None"}</Text>

      {/* ✅ Display error message if validation fails */}
      {formik.touched[valueName] && formik.errors[valueName] ? <Text style={styles.errorText}>{formik.errors[valueName]}</Text> : null}
    </View>
  );
}

export function BevragesTypesCheckbox({ formik, valueName, expanded = false }: { formik: any; valueName: string, expanded?: boolean  }) {
  
  const [isExpanded, setIsExpanded] = useState(expanded);
  const drinkOptions = [
    { label: "Soda", value: "Soda" },
    { label: "Juice", value: "Juice" },
    { label: "Alcohol", value: "Alcohol" },
    { label: "Tea", value: "Tea" },
    { label: "Coffee", value: "Coffee" },
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
    <View style={styles.accordionContainer}>
      <List.Accordion
        title="Select Beverage Types"
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        titleStyle={styles.accordionTitle} // Custom title style
        left={(props) => <List.Icon {...props} icon="glass-mug-variant" color="white" />}
        right={(props) => <List.Icon {...props} icon="chevron-down" color="white"  />} // Custom right icon
        style={styles.accordionBox} // Custom box styling
      >
        <View style={styles.container}>
          {drinkOptions.map((option) => (
            <View key={option.value} style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#ff9900" // Orange when checked
                unFillColor="#1a1f24"
                text={option.label}
                textStyle={[styles.checkboxLabel, { textDecorationLine: "none" }]}
                iconStyle={{ borderColor: "#ccc" }}
                isChecked={formik.values[valueName]?.includes(option.value)}
                onPress={() => toggleSelection(option.value)}
              />
            </View>
          ))}

          {/* ✅ Display selected items */}
          <Text style={styles.selectedText}>Selected: {formik.values[valueName]?.length > 0 ? formik.values[valueName].join(", ") : "None"}</Text>
        </View>
      </List.Accordion>

      {/* ✅ Display error message if validation fails */}
      {formik.touched[valueName] && formik.errors[valueName] ? <Text style={styles.errorText}>{formik.errors[valueName]}</Text> : null}
    </View>
  );
}

export function SidesTypesCheckbox({ formik, valueName, expanded = false, items= [] }: { formik: any; valueName: string, expanded?: boolean, items?: any[] }) {
  
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  const sidesOptions = [
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
    <View style={styles.accordionContainer}>
      <List.Accordion
        title="Select Sides Types"
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        titleStyle={styles.accordionTitle} // Custom title style
        left={(props) => <List.Icon {...props} icon="glass-mug-variant" color="white" />}
        right={(props) => <List.Icon {...props} icon="chevron-down" color="white"  />} // Custom right icon
        style={styles.accordionBox} // Custom box styling
      >
        <View style={styles.container}>
          {sidesOptions.map((option) => (
            <View key={option.value} style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#ff9900" // Orange when checked
                unFillColor="#1a1f24"
                text={option.label}
                textStyle={[styles.checkboxLabel, { textDecorationLine: "none" }]}
                iconStyle={{ borderColor: "#ccc" }}
                isChecked={formik.values[valueName]?.includes(option.value)}
                onPress={() => toggleSelection(option.value)}
              />
            </View>
          ))}

          {/* ✅ Display selected items */}
          <Text style={styles.selectedText}>Selected: {formik.values[valueName]?.length > 0 ? formik.values[valueName].join(", ") : "None"}</Text>
        </View>
      </List.Accordion>

      {/* ✅ Display error message if validation fails */}
      {formik.touched[valueName] && formik.errors[valueName] ? <Text style={styles.errorText}>{formik.errors[valueName]}</Text> : null}
    </View>
  );
}

export function ItemsCheckbox({ formik, valueName, expanded = false, items= [] }: { formik: any; valueName: string, expanded?: boolean, items?: any[] }) {
  
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  const sidesOptions = items.map(item => ({
    label: item.name, 
    value: item.name, // Using name as value
  }));
  

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
    <View style={styles.accordionContainer}>
      <List.Accordion
        title="Add Items"
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        titleStyle={styles.accordionTitle} // Custom title style
        left={(props) => <List.Icon {...props} icon="food" color="white" />}
        right={(props) => <List.Icon {...props} icon="chevron-down" color="white"  />} // Custom right icon
        style={styles.accordionBox} // Custom box styling
      >
        <View style={styles.container}>
          {sidesOptions.map((option) => (
            <View key={option.value} style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#ff9900" // Orange when checked
                unFillColor="#1a1f24"
                text={option.label}
                textStyle={[styles.checkboxLabel, { textDecorationLine: "none" }]}
                iconStyle={{ borderColor: "#ccc" }}
                isChecked={formik.values[valueName]?.includes(option.value)}
                onPress={() => toggleSelection(option.value)}
              />
            </View>
          ))}

          {/* ✅ Display selected items */}
          <Text style={styles.selectedText}>Selected: {formik.values[valueName]?.length > 0 ? formik.values[valueName].join(", ") : "None"}</Text>
        </View>
      </List.Accordion>

      {/* ✅ Display error message if validation fails */}
      {formik.touched[valueName] && formik.errors[valueName] ? <Text style={styles.errorText}>{formik.errors[valueName]}</Text> : null}
    </View>
  );
}
export function SauceCheckbox({ formik, valueName, expanded = false, items= [] }: { formik: any; valueName: string, expanded?: boolean, items?: any[] }) {
  
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  const sidesOptions = items.map(item => ({
    label: item.name, 
    value: item.name, // Using name as value
  }));
  

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
    <View style={styles.accordionContainer}>
      <List.Accordion
        title="Add Sauces"
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        titleStyle={styles.accordionTitle} // Custom title style
        left={(props) => <List.Icon {...props} icon="food" color="white" />}
        right={(props) => <List.Icon {...props} icon="chevron-down" color="white"  />} // Custom right icon
        style={styles.accordionBox} // Custom box styling
      >
        <View style={styles.container}>
          {sidesOptions.map((option) => (
            <View key={option.value} style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#ff9900" // Orange when checked
                unFillColor="#1a1f24"
                text={option.label}
                textStyle={[styles.checkboxLabel, { textDecorationLine: "none" }]}
                iconStyle={{ borderColor: "#ccc" }}
                isChecked={formik.values[valueName]?.includes(option.value)}
                onPress={() => toggleSelection(option.value)}
              />
            </View>
          ))}

          {/* ✅ Display selected items */}
          <Text style={styles.selectedText}>Selected: {formik.values[valueName]?.length > 0 ? formik.values[valueName].join(", ") : "None"}</Text>
        </View>
      </List.Accordion>

      {/* ✅ Display error message if validation fails */}
      {formik.touched[valueName] && formik.errors[valueName] ? <Text style={styles.errorText}>{formik.errors[valueName]}</Text> : null}
    </View>
  );
}

export function BevragesCheckbox({ formik, valueName, expanded = false, items= [] }: { formik: any; valueName: string, expanded?: boolean, items?: any[] }) {
  
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  const sidesOptions = items.map(item => ({
    label: item.name, 
    value: item.name, // Using name as value
  }));
  

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
    <View style={styles.accordionContainer}>
      <List.Accordion
        title="Add Beverages"
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        titleStyle={styles.accordionTitle} // Custom title style
        left={(props) => <List.Icon {...props} icon="glass-mug-variant" color="white" />}
        right={(props) => <List.Icon {...props} icon="chevron-down" color="white"  />} // Custom right icon
        style={styles.accordionBox} // Custom box styling
      >
        <View style={styles.container}>
          {sidesOptions.map((option) => (
            <View key={option.value} style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#ff9900" // Orange when checked
                unFillColor="#1a1f24"
                text={option.label}
                textStyle={[styles.checkboxLabel, { textDecorationLine: "none" }]}
                iconStyle={{ borderColor: "#ccc" }}
                isChecked={formik.values[valueName]?.includes(option.value)}
                onPress={() => toggleSelection(option.value)}
              />
            </View>
          ))}

          {/* ✅ Display selected items */}
          <Text style={styles.selectedText}>Selected: {formik.values[valueName]?.length > 0 ? formik.values[valueName].join(", ") : "None"}</Text>
        </View>
      </List.Accordion>

      {/* ✅ Display error message if validation fails */}
      {formik.touched[valueName] && formik.errors[valueName] ? <Text style={styles.errorText}>{formik.errors[valueName]}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  accordionContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "#ddd",
    backgroundColor: "#1a1f24",
  },
  accordionBox: {
    backgroundColor: "#1a1f24",
    paddingVertical: 10,
  },
  accordionTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "white", 
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#1a1f24",
    borderRadius: 10,
    borderWidth: 2,
    
    borderColor: "#fff",
  },
  accordion: {
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
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
    fontSize: 20,
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
    fontSize: 20,
    color: "#fff",

  },
});
