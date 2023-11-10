import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";

const Orders = async () => {
  const session = await serverAuth();
  const userId = session?.user.id;

  if (!userId) return <div>You are not authorized to view this page.</div>;

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      products: true,
    },
  });

  return (
    <div className="my-4">
      {orders.map((order, idx) => {
        return (
          <div key={idx}>
            <div className="my-4 rounded-md border hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="md:flex justify-between bg-blue-900/80 text-white rounded-t-md p-1">
                <p className="font-semibold">Order id: {order.id}</p>
                <p className="font-semibold">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="p-4">
                <div>
                  <p className="font-semibold">
                    Order Amount: ₹{order.orderTotal}
                  </p>
                  <p className="font-semibold">Payment: Card</p>
                  <p className="font-semibold">Delivery Status: In-transit</p>
                </div>
                <div className="mt-2 md:ml-8 p-4 bg-blue-50 space-y-2 rounded-md">
                  <p className="font-medium">Items</p>
                  {order.products.map((product, idx) => {
                    return (
                      <div key={idx} className="flex gap-2">
                        <div className="font-medium">{idx + 1}.</div>
                        <div>
                          <p className="font-medium">{product.product_title}</p>
                          <p>Price ₹{product.product_current_price}</p>
                          <p>Qty. {product.product_quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
