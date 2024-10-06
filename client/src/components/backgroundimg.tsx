import { ReactNode, CSSProperties } from "react";

interface LayoutProps {
  children: ReactNode;
  imageUrl: string; // Add imageUrl prop
}

const Layout = ({ children, imageUrl }: LayoutProps) => {
  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
