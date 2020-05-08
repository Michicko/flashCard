// UI
class UI {

    // display flashcard
    displayCard(flashcard) {
        let html = `
        <div class="card">
                <p id="id-container">${flashcard.id}</p>
                <p class="question">${flashcard.question}</p>
                <a href="#" class="show-ans">show / Hide Answer</a>
                <p class="answer">${flashcard.answer}</p>
                <div class="btn-div">
                    <button id="edit" class="btn">edit</button>
                    <button id="delete" class="btn">delete</button>
                </div>
            </div>
        `;
        document.querySelector('.flashcards-container').innerHTML += html;
    }

    // set alert
    setAlert(msg, className) {
        const p = document.createElement('p');
        p.className = className;
        p.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const display = document.querySelector('#display-question');
        container.insertBefore(p, display.nextElementSibling);
    }

    // remove alert
    removeAlert(className) {
        const display = document.querySelector('#display-question');
        setTimeout(() => {
            if (display.nextElementSibling.classList.contains(className)) {
                display.nextElementSibling.remove();
            }
        }, 2000);
    }

    // clear fields
    clearFields() {
        document.querySelector('#question-input').value = '';
        document.querySelector('#answer-input').value = '';
    }
}