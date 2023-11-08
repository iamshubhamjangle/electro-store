import { serverAuth } from "@/app/_lib/serverAuth";

const MyCart = async ({ title, Icon }: any) => {
  const session = await serverAuth();
  const userId = session?.user.id;

  const numberOfCartItem = userId
    ? await prisma?.cartItem.count({
        where: {
          userId,
        },
      })
    : 0;

  return (
    <span className="flex gap-1 items-center text-slate-700">
      {Icon && <Icon className="w-5 h-5" />}
      <span>
        {title} ({numberOfCartItem})
      </span>
    </span>
  );
};

export default MyCart;
