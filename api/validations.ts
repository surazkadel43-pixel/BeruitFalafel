import { ImagePickerAsset } from "expo-image-picker";
import * as Yup from "yup";

export const authentication = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required").min(2, "First name must be at least 2 characters"),
  lastName: Yup.string().required("Last Name is required").min(2, "First name must be at least 2 characters"),
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

  image: Yup.mixed<File | ImagePickerAsset>().required("Image is required"),
});

export const createSideSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),

  price: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)")
    .required("Price is required"),

  discountedPrice: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)") // Ensures valid currency format
    .test("is-lower-or-equal", "Discounted price cannot be greater than the price", function (value) {
      const priceValue = this.parent.price; // Get the `price` field value

      if (!value || !priceValue) return true; // ✅ Skip validation if either value is empty

      // ✅ Remove `$` sign before parsing
      const numericDiscountedPrice = parseFloat(value.replace("$", ""));
      const numericPrice = parseFloat(priceValue.replace("$", ""));

      return numericDiscountedPrice <= numericPrice; // ✅ Compare as numbers
    }),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),

  foodTypes: Yup.array().min(1, "Please select at least one option").required("Side type is required"),
  items: Yup.array().min(1, "Please select at least one item").required("Items are required"),
  sauces: Yup.array().min(1, "Please select at least one item").required("sauces are required"),
  meats: Yup.array().min(1, "Please select at least one item").required("meats are required"),

  image: Yup.mixed<File | ImagePickerAsset>().required("Image is required"),
});

export const createProductSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  genericName: Yup.string().required("Generic name is required").min(2, "Generic name must be at least 2 characters"),
  price: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)")
    .required("Price is required"),

  discountedPrice: Yup.string()
    .matches(/^\$\d+(\.\d{1,2})?$/, "Invalid price format (e.g., $10 or $10.50)") // Ensures valid currency format
    .test("is-lower-or-equal", "Discounted price cannot be greater than the price", function (value) {
      const priceValue = this.parent.price; // Get the `price` field value

      if (!value || !priceValue) return true; // ✅ Skip validation if either value is empty

      // ✅ Remove `$` sign before parsing
      const numericDiscountedPrice = parseFloat(value.replace("$", ""));
      const numericPrice = parseFloat(priceValue.replace("$", ""));

      return numericDiscountedPrice <= numericPrice; // ✅ Compare as numbers
    }),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),

  foodTypes: Yup.array().min(1, "Please select at least one option").required("Side type is required"),
  items: Yup.array().min(1, "Please select at least one item").required("Items are required"),
  sauces: Yup.array().min(1, "Please select at least one item").required("sauces are required"),
  meats: Yup.array().min(1, "Please select at least one item").required("meats are required"),

  image: Yup.mixed<File | ImagePickerAsset>().required("Image is required"),
});

export const createPromotionSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  code: Yup.string()
    .required("Code is required")
    .min(6, "Code must be at least 6 characters")
    .max(10, "Code cannot be longer than 10 characters")
    .matches(/^[A-Z0-9]+$/, "Code must be uppercase and contain only letters or numbers"),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),

  image: Yup.mixed<File | ImagePickerAsset>().optional(),
  expiry: Yup.date().nullable().min(new Date(), "Expiry date cannot be in the past").required("Expiry date is required"),
});

export const changeNameSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastName: Yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
});
export const changePhoneNumberSchema = Yup.object({
  newPhoneNumber: Yup.string()
    .required("New phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  confirmPhoneNumber: Yup.string()
    .oneOf([Yup.ref("newPhoneNumber")], "Phone numbers must match")
    .required("Please confirm your phone number"),
});

export const changePasswordSchema = Yup.object({
  newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const createGenericItemSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),

  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),
  foodTypes: Yup.array().min(1, "Please select at least one option"),
});
