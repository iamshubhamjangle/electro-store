interface ContentRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const ContentRow: React.FC<ContentRowProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold my-8">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default ContentRow;
