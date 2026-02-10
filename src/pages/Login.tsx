import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react" 
import "../styles/Login.css"
import { loginValidation } from "../schema/LoginValidation"
import { useFormik } from "formik"

function Login() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      if(values.username === "admin" && values.password === "1234"){
        navigate("/dashboard")
      }else{
        setError("Invalid username or password")
      }
    }
  })

  

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

        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.username && formik.errors.username && (
            <span className="error">{formik.errors.username}</span>
            )}


          <div className="password-field">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {formik.touched.password && formik.errors.password && (
            <span className="error">{formik.errors.password}</span>
            )}

          <div className="forgot">Forgot password?</div>

          <button className="login-btn" type="submit">
            Login
          </button>

          {error && <span className="error">{error}</span>}

</form>
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
