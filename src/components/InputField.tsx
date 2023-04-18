import '../style/styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

// const InputField = ({ todo, setTodo }: {todo: string, setTodo: Function}) => {
// const InputField = ({ todo, setTodo }: Props) => {
const InputField: React.FC<Props> = ({ todo, setTodo }) => {
  return (
    <form className="input">
      <input type="input" placeholder="Enter a task" className="input__box" />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
