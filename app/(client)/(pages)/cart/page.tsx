import ContentRow from "@/app/(client)/_components/home/ContentRow";
import { CartSummary } from "@/app/(client)/_components/cart";

const Page = () => {
  return (
    <main className="container max-w-7xl">
      <ContentRow title="Cart Summary">
        <CartSummary />
      </ContentRow>
    </main>
  );
};

export default Page;
