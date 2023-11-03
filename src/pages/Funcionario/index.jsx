import React, { useState, useEffect } from 'react';
import { dbFunc } from '../../config/firebase';
import { getDocs } from 'firebase/firestore';
import './home.css'

function Home() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [editingFuncionario, setEditingFuncionario] = useState(null);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const querySnapshot = await getDocs(dbFunc);
        const funcionariosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFuncionarios(funcionariosArray);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleEdit = (funcionario) => {
    setEditingFuncionario(funcionario);
  };

  const handleSaveEdit = (funcionario) => {
    setEditingFuncionario(null);
  };

  return (
    <div>
      <h1>Funcionários</h1>
      <ul>
        {funcionarios.map((funcionario) => (
          <li key={funcionario.id}>
            {editingFuncionario === funcionario ? (
              <div>
                <input
                  type="text"
                  value={funcionario.nome}
                  onChange={(e) => handleEdit({ ...funcionario, nome: e.target.value })}
                />
                <input
                  type="text"
                  value={funcionario.cargo}
                  onChange={(e) => handleEdit({ ...funcionario, cargo: e.target.value })}
                />
                <input
                  type="text"
                  value={funcionario.telefone}
                  onChange={(e) => handleEdit({ ...funcionario, telefone: e.target.value })}
                />
                <button onClick={() => handleSaveEdit(funcionario)}>Salvar</button>
              </div>
            ) : (
              <div>
                <div>Informações de Contato:</div>
                <div>Nome: {funcionario.nome}</div>
                <div>Telefone: {funcionario.telefone}</div>
                <div>Endereco: {funcionario.endereco}</div>
                <div className='fotoPerfil'>Foto de Perfil: <img src={funcionario.imgurl}></img></div>
                <div>Data Nascimento: {funcionario.nascimento}</div>
                <div>Informações do Funcionario:</div>
                <div>Cargo: {funcionario.cargo}</div>
                <div>Data de Admissão: {funcionario.admissao}</div>
                <div>Setor: {funcionario.setor}</div>
                <div>Salario: {funcionario.salario}</div>
                <button onClick={() => handleEdit(funcionario)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
