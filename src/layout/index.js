import React from "react";
import { Outlet} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";
function Layout(){

    const location = useLocation();
    const pathname = location.pathname;
    const locationValue = pathname.split("/");
   // console.log(locationValue);
    
    return (
        <>
  {locationValue[1] !== ''? <Header />: '' }
 

          

            <Outlet />
   {locationValue[1] !== ''? <Footer />: '' }
            
        </>
    );
}

export default Layout;