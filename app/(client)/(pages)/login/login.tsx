"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import { Button } from "@/component/button";

const Login: React.FC<any> = ({ searchParams }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Handles Google OAuth Error which are passed as ?error=
    if (searchParams?.error) {
      setLoading(false);
      toast.error(`Login Failed: ${searchParams?.error}`);

      // Remove the error from query params to avoid multiple error toast on page re-render
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, []);

  const handleLoginWithGoogleOAuth = () => {
    setLoading(true);
    signIn("google");
  };

  return (
    <div className="max-w-md mx-auto my-20">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login to your account
        </h1>
      </div>
      <div>
        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleLoginWithGoogleOAuth}
            loading={loading}
            className="border-primary text-primary hover:text-primary w-full"
          >
            <svg
              className="w-4 h-4 mr-2 text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
