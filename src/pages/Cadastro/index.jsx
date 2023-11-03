import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { dbFunc } from '../../config/firebase';
import './cadastro.css';


function CadastroFuncionario() {
  const [funcionario, setFuncionario] = useState({
    nome: '',
    sobrenome: '',
    cargo: '',
    salario: '',
    setor: '',
    dataNascimento: '',
    dataAdmissao: '',
    endereco: '',
    sexo: '',
    telefone: '',
    fotoPerfil: '',
  });

  const [msg, setMsg] = useState('');

  const auth = getAuth();

  const handleCadastro = () => {
    createUserWithEmailAndPassword(auth, funcionario.email, funcionario.senha)
      .then((userCredential) => {
        const user = userCredential.user;
        dbFunc
          .doc(user.uid)
          .set(funcionario)
          .then(() => {
            console.log('Funcionário cadastrado com sucesso no Firestore');
            setMsg('Funcionário cadastrado com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao cadastrar funcionário no Firestore:', error);
            setMsg('Erro ao cadastrar funcionário no Firestore');
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro de cadastro:', errorCode, errorMessage);
        setMsg(`Erro de cadastro: ${errorMessage}`);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuncionario({
      ...funcionario,
      [name]: value,
    });
  };

  return (
    <div className='formularioCadastro'>
      <h1>Cadastro de Novo Funcionário</h1>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" value={funcionario.nome} onChange={handleChange} />
      </div>
      <div>
        <label>Sobrenome:</label>
        <input type="text" name="sobrenome" value={funcionario.sobrenome} onChange={handleChange} />
      </div>
      <div>
        <label>Cargo:</label>
        <input type="text" name="cargo" value={funcionario.cargo} onChange={handleChange} />
      </div>
      <div>
        <label>Salário:</label>
        <input type="number" name="salario" value={funcionario.salario} onChange={handleChange} />
      </div>
      <div>
        <label>Setor:</label>
        <input type="text" name="setor" value={funcionario.setor} onChange={handleChange} />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="date" name="dataNascimento" value={funcionario.dataNascimento} onChange={handleChange} />
      </div>
      <div>
        <label>Data de Admissão:</label>
        <input type="date" name="dataAdmissao" value={funcionario.dataAdmissao} onChange={handleChange} />
      </div>
      <div>
        <label>Endereço:</label>
        <input type="text" name="endereco" value={funcionario.endereco} onChange={handleChange} />
      </div>
      <div>
        <label>Sexo:</label>
        <input type="text" name="sexo" value={funcionario.sexo} onChange={handleChange} />
      </div>
      <div>
        <label>Telefone:</label>
        <input type="tel" name="telefone" value={funcionario.telefone} onChange={handleChange} />
      </div>
      <div>
        <label>Foto de Perfil:</label>
        <input type="file" name="fotoPerfil" accept="image/*" onChange={handleChange} />
      </div>
      <div>
        <button onClick={handleCadastro}>Cadastrar Funcionário</button>
      </div>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default CadastroFuncionario;
