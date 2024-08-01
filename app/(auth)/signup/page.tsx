"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoaded } = useSignUp();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = signUpSchema.safeParse(formData);

    if (!validationResult.success) {
      const validationErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        email: validationErrors.email?.[0] || "",
        password: validationErrors.password?.[0] || "",
        confirmPassword: validationErrors.confirmPassword?.[0] || "",
      });
      return;
    }

    if (!signUp) return;
    setIsSubmitting(true);
    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      addNotification(
        "success",
        "Sign up successful. Please check your email for verification."
      );
      setVerifying(true);
    } catch (error) {
      addNotification("error", `Sign up failed: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    if (!signUp) return;
    e.preventDefault();
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        addNotification("success", "Email verified successfully. Welcome!");
        router.push("/home");
      } else {
        addNotification("error", "Verification failed. Please try again.");
      }
    } catch (error) {
      addNotification("error", `Verification failed: ${error}`);
    }
  };

  if (verifying) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="card w-full max-w-lg p-8 bg-base-100 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
          <p className="text-sm text-base-content opacity-70 mb-4">
            Please enter the verification code sent to your email.
          </p>
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="verificationCode" className="label">
                <span className="label-text">Verification Code</span>
              </label>
              <input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="input input-bordered w-full bg-base-200"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Verify
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-lg p-8 bg-base-100 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Join Cloudinary Showcase</h2>
        <p className="text-sm text-base-content opacity-70 mb-4">
          Sign up to start showcasing your media content
        </p>
        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input input-bordered w-full pl-10 bg-base-200 ${
                  errors.email ? "input-error" : ""
                }`}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content opacity-70" />
            </div>
            {errors.email && (
              <p className="text-sm text-error mt-1">{errors.email}</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input input-bordered w-full pr-10 bg-base-200 ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-70 hover:opacity-100"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-error mt-1">{errors.password}</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input input-bordered w-full bg-base-200 ${
                errors.confirmPassword ? "input-error" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-error mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-base-content opacity-70">
            Already have an account?{" "}
            <Link href="/signin" className="link link-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
