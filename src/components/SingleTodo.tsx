import { useState, useRef, useEffect } from 'react';
import { Todo } from '../ model';
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import '../style/styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

// const SingleTodo = ({ todo, todos, setTodos }: Props) => {
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    // console.log(id);
    setTodos(
      todos.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(
      todos.filter((todoItem) => {
        return todoItem.id !== id;
      })
    );
  };

  const submitEditTodo = (e: React.FormEvent, editTodoId: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todoItem) =>
        todoItem.id === editTodoId ? { ...todoItem, todo: editTodo } : todoItem
      )
    );
    setEdit(false);
  };

  const handleEdit = () => {
    if (!edit && !todo.isCompleted) setEdit(!edit);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''} `}
          onSubmit={(e) => submitEditTodo(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              className="todos__single--text"
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isCompleted ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            {!edit ? (
              <span className="icon" onClick={handleEdit}>
                <AiFillEdit />
              </span>
            ) : (
              <span
                className="icon"
                onClick={(e) => submitEditTodo(e, todo.id)}
              >
                <AiFillEdit />
              </span>
            )}
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <AiOutlineCheck />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
