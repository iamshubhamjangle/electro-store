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
    <div className="border border-t">
      <div className="flex flex-col items-center justify-center text-center gap-10 md:flex-row md:items-start md:gap-40 mt-10">
        {data?.map((item, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-3">
              <h6 className="uppercase font-bold">{item.header}</h6>
              {item?.links?.map((link, idx) => (
                <a key={idx} className="text-sm" href={link.href}>
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
    </div>
  );
};

export default Footer;
