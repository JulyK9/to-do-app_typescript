// useReducer 활용시 타입을 부여하는 방법 example
import { useReducer } from 'react';
import { Todo } from './ model';

// 리듀서 함수에 들어가는 액션의 타입을 액션별로 설정
type Actions =
  | { type: 'add'; payload: string }
  | { type: 'remove'; payload: number }
  | { type: 'done'; payload: number };

const ReducerExample = () => {
  const initialValue: Todo[] = [];

  // reducer 함수 선언
  // 상태와 액션을 인자로 받아서 액션 타입별로 로직을 수행하므로, 상태와 액션 타입별로 타입 설정
  const TodoReducer = (state: Todo[], action: Actions) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          { id: Date.now(), todo: action.payload, isCompleted: false },
        ];
      case 'remove':
        return state.filter((todo) => todo.id !== action.payload);
      case 'done':
        return state.map((todo) =>
          todo.id !== action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        );
      default:
        return state;
    }
  };

  // useReducer 설정
  const [state, dispatch] = useReducer(TodoReducer, initialValue);

  return <div>ReducerExample</div>;
};

export default ReducerExample;
