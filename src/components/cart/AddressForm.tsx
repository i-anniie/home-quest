import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import PublicLayout from "@/layouts";
import { clearCart } from "@/redux/cartSlice";

// Validation schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  contactNo: Yup.number().required("Contact No is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  houseNo: Yup.string().required("House No is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  paymentMethod: Yup.string().required("Please select a payment method"), // Add validation for payment method
  message: Yup.string(),
});

// Form fields data with className for grid system
const formFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    className: "col-span-12 md:col-span-3",
  },
  {
    name: "contactNo",
    label: "Contact No",
    type: "text",
    className: "col-span-12 md:col-span-3",
  },
  { name: "email", label: "Email", type: "email", className: "col-span-12 md:col-span-3" },
  { name: "city", label: "City", type: "text", className: "col-span-12 md:col-span-3" },
  { name: "houseNo", label: "House No", type: "text", className: "col-span-12 md:col-span-3" },
  { name: "street", label: "Street", type: "text", className: "col-span-12 md:col-span-3" },
  { name: "state", label: "State", type: "text", className: "col-span-12 md:col-span-3" },
  { name: "pincode", label: "Pincode", type: "text", className: "col-span-12 md:col-span-3" },
  {
    name: "message",
    label: "Message",
    type: "textarea", // Define the type as "textarea" for auto-adjusting rows
    className: "col-span-12", // Use your grid system class
  },
];

const paymentMethods = [
  { id: "credit_card", label: "Credit Card" },
  { id: "debit_card", label: "Debit Card" },
  { id: "pay_later", label: "Pay Later" },
  { id: "net_banking", label: "Net Banking" },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    fullName: "",
    contactNo: "",
    email: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "", // Add paymentMethod to initial values
    message: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(clearCart());
    Swal.fire({
      title: "Order Placed Successfully!",
      text: "Your order will be processed soon.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      router.push("/properties");
    });
  };

  return (
    <PublicLayout>
      <div className="w-full mx-auto p-4 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Address Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-12 gap-2">
              {formFields.map(({ name, label, type, className }) => (
                <div key={name} className={`flex flex-col ${className}`}>
                  <label htmlFor={name} className="font-semibold">
                    {label}
                  </label>
                  <Field
                    as={type === "textarea" ? "textarea" : "input"} // Render textarea if type is "textarea"
                    name={name}
                    className="mt-1 p-2 border rounded-md"
                    rows="9" // Ensure the textarea auto-adjusts its rows
                  />
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              ))}
              {/* Payment Method */}
              <div className="col-span-12">
                <h2 className="text-xl font-semibold mb-4">Mode of Payment</h2>
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <Field
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        className="form-radio h-5 w-5 text-primary"
                      />
                      {method.label}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="paymentMethod"
                  component="div"
                  className="text-red-600 text-sm mt-2"
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-12 flex items-center justify-center pt-8">
                <button
                  type="submit"
                  className="btn-secondary w-full md:h-fit md:w-fit common-transition hover:bg-gray-600 hover:text-white"
                  disabled={isSubmitting}
                >
                  Place Order
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </PublicLayout>
  );
};

export default Checkout;
