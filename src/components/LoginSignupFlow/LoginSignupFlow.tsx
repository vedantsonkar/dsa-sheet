import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Modal from "../Modal/Modal";
import { getUserData, login, signup } from "../../services/api";
import { useUser } from "../../contexts/UserContext";
import Button from "../Button/Button";

const signupValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name must not include numbers.")
    .required("Name is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters.")
    .max(16, "Password must not exceed 16 characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one letter, one number, and one special character."
    )
    .required("Password is required."),
});

const LoginSignupModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    loginModalOpen,
    selectedTab,
    setLoginModalOpen,
    updateUser,
    setSelectedTab,
  } = useUser();

  const handleSignup = useCallback(
    async (values: { name: string; email: string; password: string }) => {
      try {
        await signup(values);
        const user = await getUserData();
        updateUser(user);
        setLoginModalOpen(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        let errorMessage = "Failed to signup. Please try again.";
        if (
          err?.response?.data?.error &&
          typeof err?.response?.data?.error === "string"
        ) {
          errorMessage = err?.response?.data?.error;
        }
        setError(errorMessage);
        console.error("Signup error:", err);
      }
    },
    [updateUser, setLoginModalOpen]
  );

  const signupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: handleSignup,
  });

  const onClose = useCallback(() => {
    setLoginModalOpen(false);
  }, [setLoginModalOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      const user = await getUserData();
      updateUser(user);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage = "Invalid credentials. Please try again.";
      if (
        err?.response?.data?.error &&
        typeof err?.response?.data?.error === "string"
      ) {
        errorMessage = err?.response?.data?.error;
      }
      setError(errorMessage);
      console.error("Error", err);
    }
  };

  return (
    <Modal
      isOpen={loginModalOpen}
      onClose={onClose}
      customClasses="backdrop-blur-lg shadow-lg bg-opacity-80 bg-white"
    >
      <div className="bg-lightgrey p-1 flex items-center justify-center gap-x-4 rounded-3xl w-[80%] mx-auto mb-6">
        <Button
          variant="secondary"
          label="Login"
          onClick={() => setSelectedTab("Login")}
          customClasses={
            selectedTab === "Login"
              ? "bg-white rounded-3xl text-black transition-colors w-full flex-1"
              : "bg-lightgrey transition-colors flex-1 rounded-3xl"
          }
        />
        <Button
          variant="secondary"
          label="Signup"
          onClick={() => setSelectedTab("Signup")}
          customClasses={
            selectedTab === "Signup"
              ? "bg-white rounded-3xl text-black transition-colors w-full flex-1"
              : "bg-lightgrey transition-colors flex-1 rounded-3xl"
          }
        />
      </div>
      {selectedTab === "Login" ? (
        <>
          <h2 className="text-center text-2xl font-bold text-black">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4 mt-4 text-black">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="Password"
              />
            </div>
            <Button
              label="Login"
              customClasses="w-full py-[0.654rem]"
              type="submit"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl font-bold text-black">Signup</h2>
          <form
            onSubmit={signupFormik.handleSubmit}
            className="space-y-4 mt-4 text-black"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={signupFormik.values.name}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Name"
              />
              {signupFormik.touched.name && signupFormik.errors.name && (
                <p className="text-red-500 text-sm">
                  {signupFormik.errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupFormik.values.email}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
              {signupFormik.touched.email && signupFormik.errors.email && (
                <p className="text-red-500 text-sm">
                  {signupFormik.errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                  id="password"
                  name="password"
                  value={signupFormik.values.password}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  className="w-full p-2 border border-gray-300 rounded-md pr-10" // Add padding for the icon
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {signupFormik.touched.password &&
                signupFormik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {signupFormik.errors.password}
                  </p>
                )}
            </div>
            <Button
              label="Signup"
              customClasses="w-full py-[0.654rem]"
              type="submit"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </>
      )}
    </Modal>
  );
};

export default LoginSignupModal;
