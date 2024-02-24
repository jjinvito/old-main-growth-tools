import Image from "next/image";
import { signIn } from "next-auth/react";
import { registerNewUser } from "@/actions/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition, useEffect } from "react";
import { RegisterSchema } from "@/schemas";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { BsExclamationTriangle } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { verifyPaymentSuccess } from "@/actions/stripe/verify-payment-success";
import Link from "next/link";

export const SignUpForm = () => {
  const searchParams = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const session_id = searchParams.get("session_id");
  const [email, setEmail] = useState("");
  const [isValidSession, setIsValidSession] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    if (session_id) {
      verifyPaymentSuccess(session_id).then((result) => {
        if (result.success) {
          setEmail(result.email);
          setValue("email", result.email);
          setIsValidSession(true);
          setVerificationMessage(result.message);
          setSuccessMessage(result.message);
        } else {
          setVerificationMessage(result.error || "Verification failed.");
          // Optionally, redirect or take other actions
        }
      });
    }
  }, [session_id]);

  const onClick = (provider) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  const onSubmit = (values) => {
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(() => {
      registerNewUser(values).then((data) => {
        setErrorMessage(data.error);
        if (data.success) {
          setSuccessMessage(data.success);
        }
      });
    });
  };

  if (!isValidSession && session_id) {
    return (
      <div className="flex flex-col justify-center items-center h-[78vh] gap-10">
        {!verificationMessage ? (
          <>
            <BeatLoader />
            <p className="text-2xl">Verifying Payment...</p>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center gap-2">
              <RxCrossCircled className="text-red-700 text-4xl" />
              <p className="text-2xl">Payment Verification Failed</p>
            </div>
            <Link className="text-xl rounded-full p-4" href="/">
              Back to Home Page
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-3/5 gap-10 customFont">
      <div className="flex justify-center items-center flex-col gap-5 text-slate-600">
        <h1 className="font-bold text-6xl  text-black">Sign Up</h1>

        <p className="w-96 text-center">
          Browse through hundreds of unique tools to boost your marketing &
          startup
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-start gap-7"
      >
        <input
          className="w-[467px] h-[56px] rounded-full border-2 p-4 drop-shadow-xl"
          disabled={isPending}
          {...register("name")}
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          required
        />
        <input
          className="w-[467px] h-[56px] rounded-full border-2 p-4 drop-shadow-xl"
          disabled={!!email || isPending}
          {...register("email")}
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email address"
        />
        <input
          className="w-[467px] h-[56px] rounded-full border-2 p-4 drop-shadow-xl"
          disabled={isPending}
          {...register("password")}
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
        />
        <div
          className={cn(
            "w-full flex justify-center items-center text-center text-green-600 gap-2",
            successMessage ? "" : "hidden"
          )}
          id="successDiv"
        >
          <FaRegCheckCircle />

          {successMessage}
        </div>
        <div
          className={cn(
            " w-full flex justify-center items-center text-center text-red-600 gap-2",
            errorMessage ? "" : "hidden"
          )}
          id="errorDiv"
        >
          <BsExclamationTriangle />
          {errorMessage}
        </div>
        <button
          disabled={isPending}
          type="submit"
          className=" text-lg ml-2 bg-black text-white dark:bg-white dark:text-black disabled:opacity-50 rounded-full w-[467px] h-[56px]"
        >
          {isPending ? "Processing..." : "Sign Up"}
        </button>
      </form>
      <div className="flex flex-col gap-5">
        <button
          disabled={isPending}
          type="button"
          className="flex items-center justify-center gap-2 bg-white text-black border border-1 disabled:opacity-50 border-light-300 rounded-full w-[467px] h-[56px]"
          onClick={() => onClick("google")}
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
          <span className="font-bold">Sign Up with Google</span>
        </button>
        <button
          type="button"
          className="py-1.5 text-sm ml-2 text-blue-500 font-bold"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};
