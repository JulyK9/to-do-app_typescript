import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './ model';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isCompleted: false }]);
      setTodo('');
    }
  };

  // console.log(todos);

  const onDragEnd = (result: DropResult) => {
    console.log(result); // 드래그시 확인되는 속성 확인

    const { source, destination } = result;

    if (!destination) return; // Droppable 요소 내부에 놓지 않으면 destination 속성값이 null이 됨

    // 이동할 요소를 원래의 Droppable 위치에 그대로 놓았을 때의 처리
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // 상태값을 복제해서 쓰는 이유는 여전히 이해가 잘 안가는데..?
    let add,
      active = todos,
      complete = completedTodos;

    // 소스(요소가 이동할 출발지)가 'TodosList'쪽 Droppable 에 있는 경우라면
    if (source.droppableId === 'TodosList') {
      add = active[source.index]; // add 변수에 할일 목록의 소스 인덱스를 할당해주고
      active.splice(source.index, 1); // 할일 배열 목록에서 해당 인덱스의 요소를 제외시킴
    } else {
      // 'TodosRemove'쪽 Droppable 에 있는 경우면
      add = complete[source.index]; // add 변수에 끝난 일들 목록 소스 인덱스를 할당해주고
      complete.splice(source.index, 1); // 할당한 소스 인덱스로 끝난 일들 목록에서 해당 요소를 제외시켜줌
    }

    // 요소가 도달할 도착지가 'TodosList'쪽 Droppable 에 있는 경우라면
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add); // 해당 요소의 도착지 인덱스를 할일 목록에 인덱스를 넣어 요소를 추가
    } else {
      // 'TodosRemove'쪽 Droppable 에 있는 경우면
      complete.splice(destination.index, 0, add); // 해당 요소의 도착지 인덱스를 할일 목록에 인덱스를 넣어 요소를 추가
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskfy</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
