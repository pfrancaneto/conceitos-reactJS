import React from "react";
import { useState, useEffect } from 'react';

import "./styles.css";
import api from "./services/api";


function App() {
  const [ repositories, setRepositories] = useState([]);

useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data);
  })
},[])

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      title: 'repository',
      url: 'http://github.com/pfrancaneto',
      tecks: ['NodeJS'] , 
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
        <li key={repository.id}>

          <ul>
            <li><a href={repository.url} target="_blank">{repository.title}</a></li>
            <li>Likes: {repository.likes}</li>
          </ul>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
