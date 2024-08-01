"use client";

import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useNotificationStore } from "@/store/notificationStore";

const signInSchema = z.object({
  identifier: z.string().min(1, "Email/Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LogInForm() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = signInSchema.safeParse(formData);

    if (!validationResult.success) {
      const validationErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        identifier: validationErrors.identifier?.[0] || "",
        password: validationErrors.password?.[0] || "",
      });
      return;
    }

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: formData.identifier,
        password: formData.password,
      });

      if (result.status === "complete") {
        addNotification("success", "Signed in successfully");
        router.push("/home");
      } else {
        addNotification("error", "Sign-in incomplete. Please try again.");
      }
    } catch (error) {
      addNotification("error", `Sign-in error: ${error}`);
    }
  };

  const signInWithGoogle = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/home",
      });
    } catch (error) {
      addNotification("error", `Google sign-in error: ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-lg p-8 bg-base-100 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          Welcome Back to Cloudinary Showcase
        </h2>
        <p className="text-sm text-base-content opacity-70 mb-4">
          Sign in to access and manage your media content
        </p>
        <button
          onClick={signInWithGoogle}
          className="btn btn-outline btn-primary w-full mb-4"
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
        <div className="divider">OR</div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="identifier" className="label">
              <span className="label-text">Email/Username</span>
            </label>
            <div className="relative">
              <input
                id="identifier"
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className={`input input-bordered w-full pl-10 bg-base-200 ${
                  errors.identifier ? "input-error" : ""
                }`}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content opacity-70" />
            </div>
            {errors.identifier && (
              <p className="text-sm text-error mt-1">{errors.identifier}</p>
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
          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-base-content opacity-70">
            Not a member yet?{" "}
            <Link href="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
