import { useState } from 'react';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
        if (inputValue !== '') {
            setTodos([...todos, inputValue]);
        }
        setInputValue('');
    };

    return (
        <>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button onClick={handleSubmit}>追加</button>
            <ul>
                {todos.map((todo) => {
                    return <li key={todo}>{todo}</li>;
                })}
            </ul>
        </>
    );
}

export default App;
