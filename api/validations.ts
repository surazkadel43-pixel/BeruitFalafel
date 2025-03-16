import { ImagePickerAsset } from "expo-image-picker";
import * as Yup from "yup";

export const authentication = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("phone number is required")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  //   .required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const resetpassword = Yup.object({
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const authenticationEmail = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export const validationCode = Yup.object({
  code: Yup.string()
    .matches(/^\d{6}$/, "Code must be exactly 6 digits") // Regex for exactly 6 digits
    .required("Code is required"), // Ensures the field is not empty
});

export const groupSearch = Yup.object({
  orderId: Yup.string()
    .min(3, "Group name must be at least 3 characters")
    .max(25, "Group name must be at most 25 characters")
    .required("Group name is required"),
});

export const createItemSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),

  price: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)")
    .required("Price is required"),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),
  foodTypes: Yup.array().min(1, "Please select at least one option"),
});

export const createSauceSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),

  price: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)")
    .required("Price is required"),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),
  foodTypes: Yup.array().min(1, "Please select at least one option"),
});

export const createMeatSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),

  price: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)")
    .required("Price is required"),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),
  foodTypes: Yup.array().min(1, "Please select at least one option"),
});

export const createBeverageSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),

  price: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)")
    .required("Price is required"),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),

  drinkTypes: Yup.array().min(1, "Please select at least one option").required("Drink type is required"),

  image: Yup.mixed<File | ImagePickerAsset>()
  .required("Image is required")
});
