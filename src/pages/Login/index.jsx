import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logado com sucesso!");
        const user = userCredential.user;
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro de login:", errorCode, errorMessage);
        setMsg(`Erro de login: ${errorMessage}`);
      });
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Login</h1>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <button className="logar" onClick={handleLogin}>Login</button>
        <div className="forgot-signup">
          <a href="#">Esqueceu a senha?</a>
          <span>ou</span>
          <a href="/register">Cadastre-se</a>
        </div>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

export default Login;
