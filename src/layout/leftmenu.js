import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function LeftMenu() {
	
	const location = useLocation(); // once ready it returns the 'window.location' object
	const [url, setUrl] = useState(null);
	useEffect(() => {
	  setUrl(location.pathname);
	}, [location]);

    return(
        <>
<div className="col-md-2 sidebar">
  			<div className="row">
	
	<div className="absolute-wrapper"> </div>
	
	<div className="side-menu">
		<nav className="navbar navbar-default" role="navigation">
		
			<div className="side-menu-container">
				<ul className="nav navbar-nav" >
					<li><a href="dashboard" className={"" + (url === "/dashboard" ?" active" : "")}><span className="glyphicon glyphicon-dashboard"></span>  BUY (BEP-20) To BUY(ASA) Swap</a></li>
                    <li className=""><a className={"" + (url === "/approvedethtoasa" ?" active" : "")} 	href="approvedethtoasa"  ><span className="glyphicon glyphicon-dashboard"></span> WBUY(ETH) To BUY(ASA) Swap</a></li>
					<li className="" ><a className={"" + (url === "/approvedasatobep" ?" active" : "")} href="approvedasatobep"><span className="glyphicon glyphicon-dashboard"></span> BUY(ASA) To BUY(BEP-20) Swap</a></li>
					<li className=""><a className={"" + (url === "/approvedasatoerc" ?" active" : "")} href="approvedasatoerc" ><span className="glyphicon glyphicon-dashboard"></span>  BUY(ASA) TO WBUY(ETH) Swap</a></li>
					
				


				</ul>
			</div>
		</nav>

	</div>
</div>  		</div>

</>
    );
    }

    export default LeftMenu;