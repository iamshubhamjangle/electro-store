const MyCart = ({ title, Icon }: any) => {
  return (
    <span className="flex gap-1 items-center text-slate-700">
      {Icon && <Icon className="w-5 h-5" />}
      <span>{title} (0)</span>
    </span>
  );
};

export default MyCart;
