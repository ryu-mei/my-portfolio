import { useState } from 'react';
import './App.css';
let nextId = 0;
function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    // const [completed, setCompleted] = useState(false);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue !== '') {
            return setTodos([
                ...todos,
                { id: nextId++, name: inputValue, completed: false },
            ]);
        }
        setInputValue('');
    };

    const checkCompleted = (id, completed) => {
        setTodos((todos) => {
            const newTodos = todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed };
                }
                return todo;
            });
            return newTodos;
        });
    };

    return (
        <>
            <h1>簡単なtodoリスト</h1>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button onClick={handleSubmit}>追加</button>
            <ul>
                {todos.map((todo) => {
                    return (
                        <li
                            key={todo.id}
                            className={todo.completed ? 'completed' : ''}
                        >
                            {todo.name}
                            <button
                                onClick={() => {
                                    checkCompleted(todo.id, !todo.completed);
                                }}
                            >
                                完了
                            </button>
                            <button
                                onClick={() => {
                                    setTodos(
                                        todos.filter((dtodo) => {
                                            return dtodo.id !== todo.id;
                                        })
                                    );
                                }}
                            >
                                削除
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default App;
