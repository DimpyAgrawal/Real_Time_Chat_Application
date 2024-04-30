import {React,useState } from 'react';
import Authmodal from './Authmodal';
import Signup from './Signup';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './AuthContext';


function Login() {
  const {login} = useAuth();
  const notify1=()=>toast.success('Login successful');
    const [showSignup, setShowSignup] = useState(false);
    const [showmodal,setshowmodal]=useState(false);
    // const [active,setactive]=useState(false);

    const handleCreateAccountClick = () => {
        setShowSignup(true);
        setshowmodal(false);
        // setactive(false);
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [error, setError] = useState('');

let navigate=useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        try {
          const response = await axios.post('http://localhost:8080/login',{
            email,
            password
          });
          // Handle successful signup, e.g., redirect to login page
          // console.log('Login successful:', response.data);
          const notify2=()=>toast.error(response.data.error);
          if(response.data.error){
          notify2();
          }
          else {
            notify1();
            login();
            navigate('/homee')}
        } catch (error) {
          setError('Failed to login. Please try again.');
          console.error('Login failed:', error);
        }
      };

    return (
        <div>
            <form action="/login"method="POST" onSubmit={handleSubmit}>
            <h1 className="text-3xl pt-4 font-semibold text-center text-gray-600">Login</h1>
            <div className="p-2 mt-4 text-center">
                <div className="py-1 my-2">
                    <input className="px-2 py-1 w-60 border-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}required />
                </div>
                <div className="py-1 mt-4">
                    <input className="px-2 py-1 w-60 border-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className=" text-white rounded-lg bg-purple-700 px-2 py-1 mt-4 mb-2 w-60 border-2 hover:bg-slate-300">Submit</button>
                {/* <hr className="mt-3 text-center"></hr> */}
                {/* <p className="text-sm mt-3 mb-3">Don't have account?
                    <Link to="/acc"><span className="text-blue-600 cursor-pointer"> Create Account</span></Link>
                </p> */}
                {/* {showSignup && <Authmodal setshowmodal={setshowmodal} setactive={setactive} setsign={showSignup} />} */}
            </div>
            </form>
        </div>
           
    );
}

export default Login;
