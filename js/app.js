// flashcards
class Flashcard {
    constructor(id, question, answer) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }
}

// Variables
const displayContent = document.querySelector('#display-question');
const content = document.querySelector('.content');
const cancel = document.querySelector('.del');
const questionInput = document.querySelector('#question-input');
const answerInput = document.querySelector('#answer-input');
const container = document.querySelector('.flashcards-container');
const save = document.querySelector('#save');
const update = document.querySelector('#update');



// Event Listeners
// DOMCONTENTLOADED
document.addEventListener('DOMContentLoaded', () => {
    const store = new Store();
    const ui = new UI();
    const flashcards = store.getFlashcards();
    flashcards.forEach((flashcard) => {
        ui.displayCard(flashcard);
    });
});

displayContent.addEventListener('click', () => {
    content.style.display = 'block';
});
cancel.addEventListener('click', () => {
    content.style.display = 'none';
});

save.addEventListener('click', addCard);
update.addEventListener('click', updateFlashcards);
container.addEventListener('click', editFlashcard);
container.addEventListener('click', deleteFlashcard);
container.addEventListener('click', showAnswer);



// add card to DOM
function addCard() {
    const id = getId();
    const question = questionInput.value;
    const answer = answerInput.value;
    const flashcard = new Flashcard(id, question, answer);
    const ui = new UI();
    const store = new Store();

    // validate
    if (question === '' || answer === '') {
        ui.setAlert('Please fill all fields', 'error');
        ui.removeAlert('error');
    } else {
        ui.displayCard(flashcard);
        ui.setAlert('flashcard added successfully', 'success');
        ui.removeAlert('success');
        store.saveFlashcards(flashcard);
        ui.clearFields();
    }
}

// show or hide answer
function showAnswer(e) {
    if (e.target.classList.contains('show-ans')) {
        if (!e.target.nextElementSibling.style.display || e.target.nextElementSibling.style.display === 'none') {
            e.target.nextElementSibling.style.display = 'block';
        } else {
            e.target.nextElementSibling.style.display = 'none';
        }
    }
    e.preventDefault();
}

// edit flashcard
function editFlashcard(e) {
    const store = new Store();
    const flashcards = store.getFlashcards();
    const id = e.target.parentElement.parentElement.firstElementChild.textContent;
    if (e.target.id === 'edit') {
        flashcards.forEach((flashcard) => {
            if (id === flashcard.id) {
                questionInput.value = flashcard.question;
                answerInput.value = flashcard.answer;
            }
        });
        content.style.display = 'block';
        save.style.display = 'none';
        update.style.display = 'block';
        document.querySelector('#id-box').innerHTML = id;
    }

}

// update flashcard
function updateFlashcards() {
    const id = content.lastElementChild.textContent;
    const store = new Store();
    const flashcards = store.getFlashcards();
    flashcards.forEach((flashcard) => {
        if (id === flashcard.id) {
            flashcard.question = questionInput.value;
            flashcard.answer = answerInput.value;
        }
    });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    content.style.display = 'none';
}

// delete flashcards
function deleteFlashcard(e) {
    const id = e.target.parentElement.parentElement.firstElementChild.textContent;
    const store = new Store();
    if (e.target.id === 'delete') {
        e.target.parentElement.parentElement.remove();
        store.removeFlashcard(id);
    }
}


// get random Ids
function getId() {
    return this.hex(Date.now() / 1000) +
        ' '.repeat(16).replace(/./g, () => this.hex(Math.random() * 16))
}
// round up
function hex(value) {
    return Math.floor(value).toString(16)
}