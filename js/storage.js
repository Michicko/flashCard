class Store{

    // get flashcards
    getFlashcards() {
        let flashcards;
        if (localStorage.getItem('flashcards') === null) {
            flashcards = [];
        } else {
            flashcards = JSON.parse(localStorage.getItem('flashcards'));
        }
        return flashcards;
    }

    // save flashcards
    saveFlashcards(flashcard) {
        const flashcards = this.getFlashcards();
        flashcards.push(flashcard);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    // remove from LS
    removeFlashcard(id) {
        const flashcards = this.getFlashcards();
        flashcards.forEach((flashcard, i) => {
            if(id === flashcard.id){
                flashcards.splice(1, i);
            }
        });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

}