import React, { useState } from 'react';

import List from './components/List';
import Form from './components/Form';
import Header from './components/Header';


function Todo() {
  const [itemsList, setItemsList] = useState([]);

  function handleAddItemToList(newItem) {
    setItemsList([...itemsList, newItem]);
  }

  return (
    <div className="todo-wrapper">
      <Header/>
      {/* <Form onAddItem={handleAddItemToList} /> */}
      <List itemsList={itemsList} />
    </div>
  );
}

export default Todo;
