interface PageContainerProps {
  children: React.ReactNode;
  heading: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, heading }) => {
  return (
    <div className="mt-5">
      <h1 className="text-2xl">{heading}</h1>
      <div>{children}</div>
    </div>
  );
};

export default PageContainer;
