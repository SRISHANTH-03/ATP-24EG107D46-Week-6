import Header from "./Header";
import { Outlet } from "react-router-dom"; 

function RootLayout() {
  return (
    <div>
      <Header />
      <div className="min-h-screen px-5 md:px-20 py-10 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
