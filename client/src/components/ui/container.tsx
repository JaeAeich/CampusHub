interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto w-full max-w-7xl sm:px-4 px-5">{children}</div>;
};

export default Container;
