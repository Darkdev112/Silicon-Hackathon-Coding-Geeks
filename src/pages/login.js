import React, { useState } from 'react'
import styles from "../styles/Signup.module.css"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const initialDetails = {
    email: "",
    password: ""
  }
  const router = useRouter();
  const [details, setDetails] = useState(initialDetails);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/hackathon/login', details, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.data.status === "ok") {
        localStorage.setItem('token', response.data.data);
        toast.success('Logged in successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setTimeout(() => {
          setDetails(initialDetails);
          router.push("/");
        }, 1200)
      }
    } catch (error) {
      toast.error(`Could not login`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <div className={`d-flex align-items-center justify-content-center ${styles.boddy}`}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className={styles.sin}>
        <div className="d-flex justify-content-center mt-5">
          <h1 className={styles.title}>LOGIN</h1>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <hr className={styles.hrr} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="m-4 d-flex justify-content-center align-items-center">
            <div>
              <input type="email" className={`form-control signup_input ${styles.inputl} ${styles.input_border}`} name="email" aria-describedby="emailHelp" onChange={handleChange} placeholder="Email" required={true} value={details.email} />
            </div>
          </div>
          <div className="m-4 d-flex justify-content-center">
            <div>
              <input type="password" className={`form-control signup_input ${styles.inputl} ${styles.input_border}`} name="password" onChange={handleChange} placeholder="Password" required={true} value={details.password} />
            </div>
          </div>
          <div className="d-flex justify-content-center m-5 mb-3">
            <button type="submit" className={`btn ${styles.btnl} px-2 `}>Login</button>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <p >Don't have an account? <Link className={`${styles.register_link}`} href="/signup">Register here</Link></p>
        </div>
        <div className="d-flex justify-content-end "><Link className={`${styles.register_link} ${styles.forgot}`} href="/signup">Forgot password</Link></div>
      </div>
    </div>
  )
}

export default Login