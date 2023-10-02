import React, { useState, useContext } from 'react';
import {FlashcardContext} from './FlashcardContext';

export const AddFlashcardForm = () => {
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    const { addFlashcard } = useContext(FlashcardContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addFlashcard({ term, definition });
        setTerm('');
        setDefinition('');
    };

    return (
        <div className="add-flashcard">
            <h2>Add a New Flashcard</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Term:
                    <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} required />
                </label>
                <label>
                    Definition:
                    <input type="text" value={definition} onChange={(e) => setDefinition(e.target.value)} required />
                </label>
                <button type="submit">Add Flashcard</button>
            </form>
        </div>
    );
};

