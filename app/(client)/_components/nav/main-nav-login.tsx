"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const LoginButton = () => {
  const router = useRouter();
  return (
    <Button color="primary" onClick={() => router.push("/login")}>
      Login
    </Button>
  );
};

export default LoginButton;
