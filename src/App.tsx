import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './ model';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="App">
      <span className="heading">Taskfy</span>
      <InputField todo={todo} setTodo={setTodo} />
    </div>
  );
};

export default App;
