import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageList from "@/component/product-image-list";
import fetcher from "@/app/_lib/fetcher";

const Categories = async () => {
  const data = await fetcher("/api/categories?populate=image").catch((e) => {});

  return (
    <ContentRow title="Shop our top categories">
      <ProductImageList data={data} />
    </ContentRow>
  );
};

export default Categories;
