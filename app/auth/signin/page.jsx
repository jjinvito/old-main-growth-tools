"use client";

import { SignInForm } from "@/components/auth/signin-form";
import Header from "@/components/Header";
import AuthFooter from "@/components/auth/footer";

const SignInPage = () => {
  return (
    <>
      {/* <Header /> */}
      <SignInForm />
      <AuthFooter />
    </>
  );
};

export default SignInPage;
