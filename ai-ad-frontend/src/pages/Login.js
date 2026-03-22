import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../config";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try{

      const response = await fetch(`${API_BASE}/login`,{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({email,password})
      });

      const data = await response.json();

      if(response.ok){
        navigate("/dashboard");
      }
      else{
        setError(data.detail || "Login failed");
      }

    }
    catch{
      setError("Server error");
    }

  };

  return(

    <div style={styles.page}>

      <div style={styles.container}>

        <h1>Login</h1>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        {error && <p style={{color:"red"}}>{error}</p>}

        <p>
          No account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>

  );
}

const styles = {

  page:{
    minHeight:"100vh",
    background:"linear-gradient(135deg,#667eea,#764ba2)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  container:{
    background:"white",
    padding:40,
    borderRadius:12,
    width:350,
    display:"flex",
    flexDirection:"column",
    gap:15
  },

  input:{
    padding:10,
    fontSize:16,
    borderRadius:6,
    border:"1px solid #ccc"
  },

  button:{
    padding:10,
    background:"#667eea",
    color:"white",
    border:"none",
    borderRadius:6,
    cursor:"pointer"
  }

};

export default Login;