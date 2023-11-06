import { Button } from "@/app/(client)/_components/ui/button";
import Link from "next/link";

const ViewAllProducts = () => {
  return (
    <div className="text-center">
      <Link href={"/products"}>
        <Button>View All Products</Button>
      </Link>
    </div>
  );
};

export default ViewAllProducts;
