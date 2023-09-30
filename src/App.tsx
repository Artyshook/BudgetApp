import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:1000/api/hello')
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="App">
            <h1>{message}</h1>
        </div>
    );
}

export default App;
