import ProductItem from "@/app/(client)/_components/ui/product-item";
import {
  ScrollArea,
  ScrollBar,
} from "@/app/(client)/_components/ui/scroll-area";

const ProductItemList = () => {
  return (
    <ScrollArea>
      <div className="flex space-x-10">
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
        <ProductItem
          name="Samsung Galaxy S21 FE 5G"
          description="Lorem ipsum asd kjlafit ptoia asmf psf sda fsa cmmm"
          imgSrc="/mobile.jpg"
          width={180}
          height={300}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ProductItemList;
