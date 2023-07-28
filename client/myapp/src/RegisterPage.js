import {Link} from 'react-router-dom' ;
import {useState} from 'react' ;
import {message} from 'antd' ;
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => 
{
     const [userName, setUserName] = useState('') ;
     const [userEmail, setUserEmail] = useState('') ;
     const [userPassword, setUserPassword] = useState('') ;   
   var navigate  = useNavigate() ;
   const handlePostRegister = async(e) => 
   {
        e.preventDefault() ;
        try 
        {
          var response =  await axios.post("http://localhost:3500/v1/api/users/postRegister" ,
            {
                userName:userName ,
                userEmail:userEmail ,
                userPassword:userPassword 
            }
            )
            if(response.data && response.data.success)
            {
                message.success(" Successfully registered ") ;
                navigate("/SearchEngine") ;
            }
        }
        catch(error)
        {
            message.error(" Unable to register ") ;
        }
   }   
   return (  
    <div className = "Register">
       <h3 className = "pageHeading">Enter registration details</h3>
        <div className="registerInput">
             <input
             type="text"
             className="formInputLabel"
             id="exampleFormControlInput1"
             placeholder="Enter your name" 
             value = {userName} 
             onChange = {(e) => setUserName(e.target.value)} 
             />
        </div> 
        <br/>
        <div className="registerInput">
             <input
             type="email"
             className="formInputLabel"
             id="exampleFormControlInput1"
             placeholder="Enter your email"
             value = {userEmail} 
             onChange = {(e) => setUserEmail(e.target.value)}
             />
        </div> 
        <br/>
        <div className="registerInput">
             <input
             type="password"
             className="formInputLabel"
             id="exampleFormControlInput1"
             placeholder="Enter password"
             value = {userPassword} 
             onChange = {(e) => setUserPassword(e.target.value)}
             />
        </div> 
        <br/>
        <br/>
        <button type="button" class="registerButton" onClick = {handlePostRegister}>Register</button>
        <br/>
        <br/>
        <p className = "registerPara">
           Already have an account!  
        </p>
        <Link to = "/LoginPage" className = "registerLinking">
            Login Here
        </Link>
    </div>
   )
}

export default RegisterPage ;