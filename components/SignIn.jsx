import Modal from "./Modal";
import Link from "next/link";
// import { login } from "@/actions/loginAction";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

export default function SignIn(props) {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const onClick = (provider) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(() => {
      login(values).then((data) => {
        setErrorMessage(data?.error);
        setSuccessMessage(data?.success);
      });
    });
  };

  return (
    <Modal
      showModal={props.showModal}
      setShowModal={props.setShowModal}
      isAuthenticated={props.isAuthenticated}
      className="max-w-[400px] py-3 px-7"
    >
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8f8f8f] to-black text-center mt-5 mb-2">
        Sign In
      </h1>

      {/* social auth buttons */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-white text-black border border-1 border-light-300 rounded-full"
          onClick={() => {
            onClick("google");
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>

          <span>Sign in with Google</span>
        </button>
      </div>

      {/* or */}
      <div className="flex items-center justify-center mt-4">
        <p className="px-4 text-sm text-dark-200">or</p>
      </div>

      <form className="mt-4 grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute top-0 left-0 flex items-center h-full px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-dark-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </label>
          <input
            disabled={isPending}
            {...form.register("email")}
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your email"
            className="w-[100%] px-4 pl-12 py-3 bg-light-100 rounded-xl outline-none focus:bg-white transition-all focus:shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)]"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="password"
            className="absolute top-0 left-0 flex items-center h-full px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-dark-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </label>
          <input
            disabled={isPending}
            {...form.register("password")}
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            className="w-[100%] px-4 pl-12 py-3 bg-light-100 rounded-xl outline-none focus:bg-white transition-all focus:shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)]"
          />
        </div>

        <div
          className={cn(
            "text-center p-5 text-green-600",
            successMessage ? "" : "hidden"
          )}
          id="successDiv"
        >
          {successMessage}
        </div>
        <div
          className={cn(
            "text-center p-5 text-red-600",
            errorMessage ? "" : "hidden"
          )}
          id="errorDiv"
        >
          {errorMessage}
        </div>

        <button
          className="px-2 py-4 rounded-full w-full flex gap-2 justify-center bg-black text-white disabled:opacity-50"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Processing...' : 'Sign In'}

        </button>
      </form>
      <div className="py-4 text-sm text-dark-200  text-center flex justify-between">
        <button className="hover:text-black">Sign Up</button>
        <Link href="/forgot-password" className="hover:text-black">
          Forgot password?
        </Link>
      </div>
    </Modal >
  );
}
