import { Todo } from '../ model';
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import '../style/styles.css';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

// const SingleTodo = ({ todo, todos, setTodos }: Props) => {
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const handleDone = (id: number) => {
    // console.log(id);
    setTodos(
      todos.map((todoItem) => {
        return todoItem.id === todo.id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem;
      })
    );
  };

  return (
    <form className="todos__single">
      {todo.isCompleted ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <AiOutlineCheck />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
