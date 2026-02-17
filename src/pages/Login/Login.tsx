import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.scss";
import { loginValidation } from "../../schema/LoginValidation";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
  });

  const formik = useFormik({ // use new User()
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="login-container">
      <div className="login-left" />

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <img src="/shopIcon.svg" alt="GoShop" />
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
              <span 
              data-testid="toggle-password"
              onClick={() => setShowPassword(!showPassword)}>
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

            {mutation.isError && (
              <span className="error">{mutation.error?.message}</span>
            )}
          </form>
          <div className="divider">
            <span>or login with</span>
          </div>

          <div className="social-login">
            <button className="google">
              <img src="/src/assets/googleIcon.png"></img>Google
            </button>
            <button className="facebook">
              <img src="/src/assets/facebookIcon.png"></img>Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
