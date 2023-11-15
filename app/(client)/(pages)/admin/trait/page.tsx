import { TraitFormWrapper, TraitTable } from "@/app/(client)/_components/admin";
import prisma from "@/app/_lib/db";

const Page = async () => {
  const traits = await prisma.trait.findMany();

  return (
    <>
      <TraitFormWrapper />
      <TraitTable traits={traits} />
    </>
  );
};

export default Page;
