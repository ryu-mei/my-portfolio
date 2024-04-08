import { useState } from 'react';
import './App.css';
let nextId = 0;
function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue !== '') {
            setTodos([...todos, { id: nextId++, name: inputValue }]);
        }
        setInputValue('');
    };

    return (
        <>
            <h1>簡単なtodoリスト</h1>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button onClick={handleSubmit}>追加</button>
            <ul>
                {todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            {todo.name}
                            <button
                                onClick={() => {
                                    setTodos(
                                        todos.filter((dtodo) => {
                                            return dtodo.id !== todo.id;
                                        })
                                    );
                                }}
                            >
                                完了
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default App;
