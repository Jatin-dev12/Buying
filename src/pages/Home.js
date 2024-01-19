import React, { useState } from "react";
//import { Container, Row, Col, Card } from "react-bootstrap";

import { Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";




function Home() {

//console.log(localStorage.getItem('bridgestaketoken')+'sad');
    const navigate = useNavigate();



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    const [validateErrors, setValidateErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


      const loginAction = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        setValidateErrors({});
       //console.log(username);
       //console.log(password);
      
        if(username === process.env.REACT_APP_LOGIN_USERNAME && password === process.env.REACT_APP_login_password)
        {
            localStorage.setItem('bridgestaketoken', username)
            navigate('/dashboard')
        }
       

        else
        {

            setValidateErrors("Please enter correct Username & Password");
        }
      
       
    }

    return (
        <>

        

<div className="back">


<div className="div-center">


  <div className="homecontent">


    <h3 className="text-center">Sign in</h3>
    <hr />
    <Form onSubmit={(e) => loginAction(e)}>

    {Object.keys(validateErrors).length !== 0 &&
                            <Form.Text className="text-danger">Invalid Username or Password.</Form.Text>
                        }

      <div className="form-group">
        <label for="exampleInputEmail1">Username</label>
      

        <input type="text" id="exampleInputEmail1" className="form-control form-control-lg" name="username" value={username} required="required" onChange={(e) => setUsername(e.target.value)}/>

      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name="password" required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className="col-md-12 text-center">
      <button type="submit" className="btn btn-primary">Login</button>
      </div>
      <hr />
    
      </Form>

  </div>


  </div>
</div>



           
        </>
    );
}

export default Home;