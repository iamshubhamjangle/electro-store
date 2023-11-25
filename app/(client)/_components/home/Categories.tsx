import ProductImageList from "@/component/product-image-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import prisma from "@/app/_lib/db";

const Categories = async () => {
  const categories = await prisma.category.findMany();

  return (
    <ContentRow title="Shop our top categories">
      <ProductImageList categories={categories} />
    </ContentRow>
  );
};

export default Categories;
