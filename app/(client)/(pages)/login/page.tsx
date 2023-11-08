import { redirect } from "next/navigation";

import LoginComponent from "@/app/(client)/(pages)/login/login";
import { serverAuth } from "@/app/_lib/serverAuth";

const LoginPage = async ({ searchParams }: any) => {
  const session = await serverAuth();

  if (session) redirect(searchParams?.callbackUrl || "/");

  return <LoginComponent searchParams={searchParams} />;
};

export default LoginPage;
