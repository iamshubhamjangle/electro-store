import prisma from "@/app/_lib/db";
import productColumn from "@/app/(client)/_components/admin/product/product-column";
import { NewProductButton } from "@/app/(client)/_components/admin/product";
import { DataTable } from "@/component/data-table";
import { ProductFormType } from "@/app/_types/form-schemas";

const Page = async () => {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();

  // Format Prisma Output - Convert Optional values null to string & convert other data types to string
  const formattedProducts: ProductFormType[] = products.map((p) => {
    return {
      id: p.id,
      title: p.title,
      subTitle: p.subTitle,
      imageUrls: p.imageUrls,
      description: p.description || "",
      categoryId: p.categoryId || "",
      manufacturer: p.manufacturer || "",
      sellingPrice: p.sellingPrice.toString(),
      maximumRetailPrice: p.maximumRetailPrice.toString(),
      rating: p.rating.toString(),
    };
  });

  return (
    <div className="space-y-4">
      <NewProductButton categories={categories} />
      <DataTable columns={productColumn} data={formattedProducts} />
    </div>
  );
};

export default Page;
