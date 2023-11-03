import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useNavigate  } from 'react-router-dom';
import './register.css';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (msg === 'Sucesso') {
            const redirectTimeout = setTimeout(() => {
                navigate('/login'); 
            }, 3000);

            return () => clearTimeout(redirectTimeout);
        }
    }, [msg, navigate]);

    async function cadastrar() {
        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            setMsg('Sucesso');
            setEmail('');
            setSenha('');
            <a href="/login"></a>
        } catch (error) {
            setMsg('Erro');
        }
    }

    return( 
        <div className="Register">
            <h1>Cadastro de Usuário</h1>
            
            <form className="Register-form">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="Register-form-input"
                    placeholder="Email"
                />
                <input
                    onChange={(e) => setSenha(e.target.value)}
                    value={senha}
                    type="password"
                    className="Register-form-input"
                    placeholder="Senha"
                />

                {msg === 'Sucesso' &&  <span> Você se cadastrou com sucesso!</span>}
                {msg === 'Erro' &&  <span> Erro ao tentar se cadastrar!</span>}

                <button onClick={cadastrar} type="button" className="Register-form-button">Cadastrar</button>
            </form>
        </div>
    )
}

export default RegisterPage;
