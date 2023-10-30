import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import Search from "./search";
import UserNav from "./user-nav";

const Nav = () => {
  return (
    <>
      <NavBanner />
      <MainNav />
    </>
  );
};

export default Nav;

const NavBanner = () => {
  return (
    <div className="font-semibold text-white bg-blue-900 text-xs text-center py-1">
      Get upto 50% off on selected products | Use code HAPPY50
    </div>
  );
};

const MainNav = () => {
  return (
    <div className="container max-w-7xl">
      <div className="flex justify-between items-center gap-16 p-3">
        <div>
          <Image src={"/logo_light.png"} alt="logo" width={100} height={100} />
        </div>
        <div className="flex-1">
          <Search />
        </div>
        <div className="flex gap-4 font-semibold">
          <NavMenuItem title="Cart" Icon={ShoppingCart} />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

const NavMenuItem = ({ title, Icon }: any) => {
  return (
    <span className="flex gap-1 items-center text-slate-700">
      {Icon && <Icon className="w-5 h-5" />}
      <span>{title}</span>
    </span>
  );
};
