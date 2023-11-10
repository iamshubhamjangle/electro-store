import ContentRow from "@/app/(client)/_components/home/ContentRow";
import { Orders } from "@/app/(client)/_components/orders";

const Page = () => {
  return (
    <main className="container max-w-7xl">
      <ContentRow title="Your Orders">
        <Orders />
      </ContentRow>
    </main>
  );
};

export default Page;
