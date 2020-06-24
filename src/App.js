import React, {useEffect, useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setItems(response.data);
    });
    
  },[]);

  //const [repository, setRepository] = useState([]);

  

  async function handleAddRepository() {
    api.post('/repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: `ReactJs ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    }).then(response => {
      setItems([...items,response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      const filteredItems = items.filter(item => item.id !== id);
      setItems(filteredItems);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {items.map(item => (
          <li>
          {item.title}

          <button onClick={() => handleRemoveRepository(item.id)}>
            Remover
          </button>
        </li>
      ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
