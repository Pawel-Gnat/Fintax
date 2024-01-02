interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="mt-6">
      <div className="m-4 sm:m-8">{children}</div>
    </div>
  );
};

export default PageContainer;
