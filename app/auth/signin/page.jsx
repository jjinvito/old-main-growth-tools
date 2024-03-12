"use client";

import { SignInForm } from "@/components/auth/signin-form";
import Footer from "@/components/footer";

const SignInPage = () => {
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-70px)]">
      {/* <Header /> */}
      <div className="flex justify-center items-center w-full h-full">
        <SignInForm />
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
