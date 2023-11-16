import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import Search from "./search";
import UserNav from "./main-nav-user-nav";
import MyCart from "./my-cart";
import { serverAuth } from "@/app/_lib/serverAuth";
import LoginButton from "./main-nav-login";
import { ThemeToggle } from "./theme-toggle";

const MainNav = async () => {
  const session = await serverAuth();

  return (
    <div className="container max-w-7xl">
      <div className="flex justify-between items-center md:gap-16 p-3">
        <Link href={"/"}>
          <Image src={"/logo_light.png"} alt="logo" width={100} height={100} />
        </Link>
        <div className="hidden md:flex w-full">
          <Search />
        </div>
        <div className="flex gap-4 font-semibold items-center">
          {session && <MyCart title="Cart" Icon={ShoppingCart} />}
          {session && <UserNav session={session} />}
          {!session && <LoginButton />}
          <ThemeToggle />
        </div>
      </div>
      <div className="block mb-2 md:hidden">
        <Search />
      </div>
    </div>
  );
};

export default MainNav;
