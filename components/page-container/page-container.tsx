interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="mt-5">
      <div className="m-5">{children}</div>
    </div>
  );
};

export default PageContainer;
