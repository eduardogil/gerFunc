import React, { useState, useEffect } from 'react';
import { dbFunc } from '../../config/firebase';
import { getDocs, deleteDoc } from 'firebase/firestore';
import { useNavigate  } from 'react-router-dom';
import './home.css';

function Home() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [editingFuncionario, setEditingFuncionario] = useState(null);
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', cargo: '', setor: '' });
  const navigate = useNavigate();

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

  const addFuncionario = () => {
    navigate("/cadastrarFuncionario")
  }

  const handleSaveEdit = (funcionario) => {
    setEditingFuncionario(null);
  };

  const handleAdd = () => {
    setNovoFuncionario({ nome: '', cargo: '', setor: '' });
  };

  const handleDelete = (funcionario) => {
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
                value={funcionario.setor}
                onChange={(e) => handleEdit({ ...funcionario, setor: e.target.value })}
              />
              <button onClick={() => handleSaveEdit(funcionario)}>Salvar</button>
            </div>
          ) : (
            <div>
              <div>
                <span>Nome: {funcionario.nome}</span>
                <span>Cargo: {funcionario.cargo}</span>
                <span>Setor: {funcionario.setor}</span>
              </div>
              <div>
                <button className="promoFunc" onClick={() => handleEdit(funcionario)}>Promover</button>
                <button className="editarFunc" onClick={() => handleEdit(funcionario)}>Editar</button>
                <button className="demitirFunc" onClick={() => handleDelete(funcionario)}>Demitir</button>
              </div>
            </div>
          )}
        </li>
        ))}
      </ul>
      <div>
        <button className="novoFunc" onClick={addFuncionario}> + Adicionar Funcionário</button>
      </div>
    </div>
  );
}

export default Home;
