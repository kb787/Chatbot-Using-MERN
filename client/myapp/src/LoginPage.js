import {Link} from 'react-router-dom' ;
import {useState} from 'react' ;
import {message} from 'antd' ;
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom';


const LoginPage = () => 
{
    const [userEmail, setUserEmail] = useState('') ;
    const [userPassword, setUserPassword] = useState('') ;

    var navigate  = useNavigate() ;
    const handlePostLogin = async(e) => 
    {
         e.preventDefault() ;
         try 
         {
           var response =  await axios.post("http://localhost:3500/v1/api/users/postLogin" ,
             {
                 userEmail:userEmail ,
                 userPassword:userPassword 
             }
             )
             if(response.data && response.data.success)
             {
                 message.success(" Successfully logged in ") ;
                 navigate("/SearchEngine") ;
             }
         }
         catch(error)
         {
             message.error(" Unable to login ") ;
         }
    }  
 
    return (
        <div className = "Register">
       <h3 className = "pageHeading">Verify your credentials</h3>
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
        <button type="button" class="registerButton" onClick={handlePostLogin}>Login</button>
        <br/>
        <br/>
        <p className = "registerPara">
           Not having an account!  
        </p>
        <Link to = "/RegisterPage" className = "registerLinking">
            Register Here
        </Link>
    </div>
    )
}

export default LoginPage  ;