import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageList from "@/app/(client)/_components/ui/product-image-list";

async function getData() {
  const res = await fetch(
    `${process.env.BACKEND_ENDPOINT}/api/categories?populate=image`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BACKEND_PUBLIC_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Error while fetching data: getData()");
  }

  return res.json();
}

const Categories = async () => {
  const data = await getData();

  return (
    <ContentRow title="Shop our top categories">
      <ProductImageList data={data} />
    </ContentRow>
  );
};

export default Categories;
