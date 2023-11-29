import prisma from "@/app/_lib/db";
import AllProductsPage from "@/app/(client)/_components/products/AllProductPage";

const Page = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      trait: true,
    },
  });
  const categories = await prisma.category.findMany();

  return <AllProductsPage products={products} categories={categories} />;
};

export default Page;
