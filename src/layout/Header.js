import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../src/admin.css';

function Header(){
    const location = useLocation();
    const pathname = location.pathname;

    const navigate = useNavigate();

    const [user, setUser] = useState('');

    useEffect(() =>{
        if(localStorage.getItem('bridgestaketoken') === '' || localStorage.getItem('bridgestaketoken') == null){
            
            navigate('/');
        }
      
    })

    const locationValue = pathname.split("/");

    const getUser = () => {
        axios.get('/api/user', {headers: {Authorization: 'Bearer '+ localStorage.getItem('bridgestaketoken')}})
        .then((r) => {
            setUser(r.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const logoutAction = (e) => {
       
        localStorage.setItem('bridgestaketoken', '');
        navigate('/');
    }	
    return(
        <>
		

<nav className="navbar navbar-default navbar-static-top">
    <div className="container-fluid">
		
		<div className="navbar-header">
			<button type="button" className="navbar-toggle navbar-toggle-sidebar collapsed">
			MENU
			</button>
			<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			<a className="navbar-brand" href="#">
				<h4>Administrator</h4>
			</a>
		</div>

		
		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">      
			
			<ul className="nav navbar-nav navbar-right">
				<li><a href="https://buytokenllc.com/bridge" target="_blank"><strong>Visit Site</strong></a></li>
				<li className="dropdown ">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
						<strong>
						Account</strong>
						<span className="caret"></span></a>
						<ul className="dropdown-menu" role="menu">
							
							<li><a href="#" onClick={(e) => logoutAction(e)} className ="logoutclass"><strong>Logout</strong></a></li>
						</ul>
					</li>
				</ul>
			</div>
            
		</div>

	</nav>  


	

           

           
        </>
    );
}

export default Header;


	{/* <Navbar bg="light" data-bs-theme="light">
    <Container fluid>
      
    <Navbar.Brand href="#home">
      <h5>Administrator
</h5>
          </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-center">
    
          <Nav.Link href="https://buytokenllc.com/bridge" target="_blank">visit site</Nav.Link>
          <NavDropdown title="Account" id="account-dropdown" className='nav-item'> 
        <NavDropdown.Item  href="#" onClick={(e) => logoutAction(e)} className ="logoutclass" >Logout</NavDropdown.Item>
        </NavDropdown>
  

    
              </Nav>
              
          
      </Navbar.Collapse>
            
    </Container>
  </Navbar> */}