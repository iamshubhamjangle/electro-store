import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";

const Orders = async () => {
  const session = await serverAuth();
  const userId = session?.user.id;

  if (!userId) return <div>You are not authorized to view this page.</div>;

  // const orders = await prisma.order.findMany({
  //   where: {
  //     userId,
  //   },
  //   include: {
  //     products: true,
  //   },
  // });

  const orders = [
    {
      id: "closlv5ox0003uap4w8dhe8hm",
      createdAt: "2023-11-10T12:40:00.657Z",
      updatedAt: "2023-11-10T12:40:00.657Z",
      userId: "clopgq9n80000uaygfv25krkj",
      orderTotal: 20000,
      products: [
        {
          id: "closlv5ox0004uap4mw4pdfaz",
          product_id: "5",
          product_title: "Xioami Redmi 12 5G",
          product_sub_title:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum\nquia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam ",
          product_quantity: 2,
          product_current_price: 12499,
          product_original_price: 16999,
          orderId: "closlv5ox0003uap4w8dhe8hm",
        },
        {
          id: "closlv5ox0005uap4635p12gs",
          product_id: "10",
          product_title: "ASUS Vivobook 15 Core i5 11th Gen 1135G7",
          product_sub_title:
            "\nThe outstanding Asus VivoBook 15 laptop, created to simplify your workday and improve performance, offers fantastic efficiency and stunning aesthetics. This laptop handles all of your multitasking requirements and gives you dynamic performance thanks to the Intel Core processor. Additionally, the dual-storage ASUS VivoBook 15 offers you the benefits of incredibly fast data speed and ample storage capacity. Moreover, its svelte and exquisite form makes you the centre of attention everywhere you go when donning it with you.",
          product_quantity: 1,
          product_current_price: 38990,
          product_original_price: 69990,
          orderId: "closlv5ox0003uap4w8dhe8hm",
        },
      ],
    },
    {
      id: "closlv5ox0003uap4w8dhe8hm",
      createdAt: "2023-11-10T12:40:00.657Z",
      updatedAt: "2023-11-10T12:40:00.657Z",
      userId: "clopgq9n80000uaygfv25krkj",
      orderTotal: 20000,
      products: [
        {
          id: "closlv5ox0004uap4mw4pdfaz",
          product_id: "5",
          product_title: "Xioami Redmi 12 5G",
          product_sub_title:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum\nquia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam ",
          product_quantity: 2,
          product_current_price: 12499,
          product_original_price: 16999,
          orderId: "closlv5ox0003uap4w8dhe8hm",
        },
        {
          id: "closlv5ox0005uap4635p12gs",
          product_id: "10",
          product_title: "ASUS Vivobook 15 Core i5 11th Gen 1135G7",
          product_sub_title:
            "\nThe outstanding Asus VivoBook 15 laptop, created to simplify your workday and improve performance, offers fantastic efficiency and stunning aesthetics. This laptop handles all of your multitasking requirements and gives you dynamic performance thanks to the Intel Core processor. Additionally, the dual-storage ASUS VivoBook 15 offers you the benefits of incredibly fast data speed and ample storage capacity. Moreover, its svelte and exquisite form makes you the centre of attention everywhere you go when donning it with you.",
          product_quantity: 1,
          product_current_price: 38990,
          product_original_price: 69990,
          orderId: "closlv5ox0003uap4w8dhe8hm",
        },
        {
          id: "closlv5ox0005uap4635p12gs",
          product_id: "10",
          product_title: "ASUS Vivobook 15 Core i5 11th Gen 1135G7",
          product_sub_title:
            "\nThe outstanding Asus VivoBook 15 laptop, created to simplify your workday and improve performance, offers fantastic efficiency and stunning aesthetics. This laptop handles all of your multitasking requirements and gives you dynamic performance thanks to the Intel Core processor. Additionally, the dual-storage ASUS VivoBook 15 offers you the benefits of incredibly fast data speed and ample storage capacity. Moreover, its svelte and exquisite form makes you the centre of attention everywhere you go when donning it with you.",
          product_quantity: 1,
          product_current_price: 38990,
          product_original_price: 69990,
          orderId: "closlv5ox0003uap4w8dhe8hm",
        },
        {
          id: "closlv5ox0005uap4635p12gs",
          product_id: "10",
          product_title: "ASUS Vivobook 15 Core i5 11th Gen 1135G7",
          product_sub_title:
            "\nThe outstanding Asus VivoBook 15 laptop, created to simplify your workday and improve performance, offers fantastic efficiency and stunning aesthetics. This laptop handles all of your multitasking requirements and gives you dynamic performance thanks to the Intel Core processor. Additionally, the dual-storage ASUS VivoBook 15 offers you the benefits of incredibly fast data speed and ample storage capacity. Moreover, its svelte and exquisite form makes you the centre of attention everywhere you go when donning it with you.",
          product_quantity: 1,
          product_current_price: 38990,
          product_original_price: 69990,
          orderId: "closlv5ox0003uap4w8dhe8hm",
        },
        {
          id: "closlv5ox0005uap4635p12gs",
          product_id: "10",
          product_title: "ASUS Vivobook 15 Core i5 11th Gen 1135G7",
          product_sub_title:
            "\nThe outstanding Asus VivoBook 15 laptop, created to simplify your workday and improve performance, offers fantastic efficiency and stunning aesthetics. This laptop handles all of your multitasking requirements and gives you dynamic performance thanks to the Intel Core processor. Additionally, the dual-storage ASUS VivoBook 15 offers you the benefits of incredibly fast data speed and ample storage capacity. Moreover, its svelte and exquisite form makes you the centre of attention everywhere you go when donning it with you.",
          product_quantity: 1,
          product_current_price: 38990,
          product_original_price: 69990,
          orderId: "closlv5ox0003uap4w8dhe8hm",
        },
      ],
    },
  ];

  return (
    <div className="my-4">
      {orders.map((order, idx) => {
        return (
          <div key={idx}>
            <div className="p-4 my-4 rounded-md border hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Order id: {order.id}</p>
                  <p className="font-semibold">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold">
                  Order Amount: ₹{order.orderTotal}
                </p>
                <p className="font-semibold">Payment: Card</p>
                <p className="font-semibold">Delivery Status: In-transit</p>
              </div>
              <div className="mt-2 ml-8 p-4 bg-blue-50 space-y-2 rounded-md">
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
        );
      })}
    </div>
  );
};

export default Orders;
