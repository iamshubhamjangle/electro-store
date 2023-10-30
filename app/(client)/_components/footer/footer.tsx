const Footer = () => {
  const data = [
    {
      header: "Help",
      links: [
        {
          title: "Payments",
          href: "#",
        },
        {
          title: "Shipping/Tracking Order",
          href: "#",
        },
        {
          title: "Returns & Cancellation",
          href: "#",
        },
        {
          title: "FAQs",
          href: "#",
        },
        {
          title: "Report Infringment",
          href: "#",
        },
      ],
    },
    {
      header: "Company",
      links: [
        {
          title: "About us",
          href: "#",
        },
        {
          title: "Careers",
          href: "#",
        },
        {
          title: "Contact us",
          href: "#",
        },
      ],
    },
    {
      header: "Social",
      links: [
        {
          title: "Instagram",
          href: "#",
        },
        {
          title: "Facebook",
          href: "#",
        },
        {
          title: "Twitter",
          href: "#",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-40 mt-20">
        {data?.map((item, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-3">
              <h6 className="uppercase font-bold">{item.header}</h6>
              {item?.links?.map((link) => (
                <a key={link.href} className="text-sm" href={link.href}>
                  {link.title}
                </a>
              ))}
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm font-medium my-10">
        © 2023, Electro Shop, Inc.
      </div>
    </>
  );
};

export default Footer;
