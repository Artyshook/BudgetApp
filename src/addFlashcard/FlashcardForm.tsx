import React from 'react';
import {FlashcardProvider} from './FlashcardContext';
import {AddFlashcardForm} from "./AddFlashcardForm";

const FlashcardForm: React.FC = () => {
    return (
        <FlashcardProvider>
            <div className="flashcard-form">
                <AddFlashcardForm />
                {/* Add other components related to flashcard management */}
            </div>
        </FlashcardProvider>
    );
};

export default FlashcardForm;
