import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react" 
import "../styles/Login.css"

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      navigate("/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="login-container">

      <div className="login-left" />

      <div className="login-right">
        <div className="login-card">

          <div className="login-header">
            <img src="/src/assets/shopIcon.svg" alt="GoShop" />
            <h2>GoShop</h2>
          </div>

          <p className="subtitle">Welcome back, please login</p>

          
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="forgot">Forgot password?</div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          {error && <span className="error">{error}</span>}

          <div className="divider">
            <span>or login with</span>
          </div>

          <div className="social-login">
            <button className="google"><img src="/src/assets/googleIcon.png"></img>Google</button>
            <button className="facebook"><img src="/src/assets/facebookIcon.png"></img>Facebook</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
