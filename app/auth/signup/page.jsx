"use client";

import { SignUpForm } from "@/components/auth/signup-form";
import Header from "@/components/Header";
import AuthFooter from "@/components/auth/footer";

const SignInPage = () => {
  return (
    <>
      {/* <Header /> */}
      <SignUpForm />
      <AuthFooter />
    </>
  );
};

export default SignInPage;
