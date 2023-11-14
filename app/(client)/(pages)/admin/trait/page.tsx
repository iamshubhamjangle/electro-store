import { TraitForm } from "@/app/(client)/_components/admin";
import prisma from "@/app/_lib/db";

const Page = async () => {
  const traits = await prisma.trait.findMany();

  return <TraitForm />;
};

export default Page;
