import {useState, ReactNode, createContext, Dispatch, SetStateAction} from 'react';

interface Flashcard {
    term: string;
    definition: string;
}

interface FlashcardContextProps {
    flashcards: Flashcard[];
    setFlashcards: Dispatch<SetStateAction<Flashcard[]>>;
    addFlashcard: (flashcard: Flashcard) => void;
}

const initialContext: FlashcardContextProps = {
    flashcards: [],
    setFlashcards: () => {}, // Initial value for setFlashcards
    addFlashcard: () => {} // Initial value for addFlashcard
};

export const FlashcardContext = createContext<FlashcardContextProps>(initialContext);

interface FlashcardProviderProps {
    children: ReactNode;
}

export function FlashcardProvider({ children }: FlashcardProviderProps): JSX.Element {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    const addFlashcard = (flashcard: Flashcard) => {
        setFlashcards([...flashcards, flashcard]);
        // Add logic to send the flashcard to the server/database here
    };

    return (
        <FlashcardContext.Provider value={{ flashcards, addFlashcard, setFlashcards }}>
            {children}
        </FlashcardContext.Provider>
    );
}
