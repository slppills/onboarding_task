import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="p-5">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
