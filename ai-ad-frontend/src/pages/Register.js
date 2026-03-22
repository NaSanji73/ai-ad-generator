import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const register = async () => {

    try{

      const response = await fetch("http://127.0.0.1:8001/register",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if(response.ok){
        setMessage("✅ Account created successfully!");
        setError("");

        // redirect to login after 1 second
        setTimeout(()=>{
          navigate("/");
        },1000);

      }
      else{
        setError(data.detail || "Registration failed");
        setMessage("");
      }

    }
    catch(error){
      setError("⚠️ Server error");
      setMessage("");
    }

  };

  return(

    <div style={styles.page}>

      <div style={styles.container}>

        <h1>Create Account</h1>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={register}>
          Register
        </button>

        {message && (
          <p style={{color:"green",fontWeight:"bold"}}>{message}</p>
        )}

        {error && (
          <p style={{color:"red",fontWeight:"bold"}}>{error}</p>
        )}

        <p>
          Already have account? <Link to="/">Login</Link>
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
    cursor:"pointer",
    fontWeight:"bold"
  }

};

export default Register;