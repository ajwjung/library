const container = document.querySelector(".container");
const newBookBtn = container.querySelector("#new-book");
const bookForm = container.querySelector("form");
const bookTitle = bookForm.querySelector("input[name='title']");
const bookAuthor = bookForm.querySelector("input[name='author']");
const numberOfPages = bookForm.querySelector("input[name='book-pages']");
const readStatus = bookForm.querySelector("select[name='read']");
const submitBook = bookForm.querySelector("#submit-entry");
const bookContainer = container.querySelector(".book-cards");

let myLibrary = [];
// Default: do not update book's card (even if duplicate entry)
let updateCard = false;
let bookIndex = -1; 

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);

    if (checkBookExists(title) > 0) {
        updateBookInformation(newBook);
    } else {
        myLibrary.push(newBook);
        bookIndex++;
    }

    return newBook;
}

function checkBookExists(title) {
    // If array length is 0, then book isn't in library yet
    return myLibrary.filter(book => (book.title.toLowerCase() === title.toLowerCase())).length
}

function updateBookInformation(newBook) {
    const updateBook = prompt("This book is already in the catalogues. Would you like to update the information?").toLowerCase();

    if (updateBook == "yes" || updateBook == "y" || updateBook == "") {
        updateCard = true;
        const result = myLibrary.map(book => book.title.toLowerCase() == newBook.title.toLowerCase() ? newBook : book);
        myLibrary = result;
        // updateBookCard();
    } else if (updateBook === null) {
        updateCard = false;
    }
}

// Check if card for book already exists
function updateBookCard(allCards, book) {
    allCards.forEach(card => {
        if (card.children[0].innerHTML == book.title) {
            card.children[0].innerHTML = book.title;
            card.children[1].innerHTML = book.author;
            card.children[2].innerHTML = book.pages;
            card.children[3].innerHTML = book.read;
        }
    })
}

// Creates a book card (or updates contents if already created)
function addCard(item) {
    const newCard = document.createElement("div");
    newCard.classList.add("card", "book" + bookIndex);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("info-container");

    // Check if card for book already exists
    const cards = bookContainer.querySelectorAll(".info-container");
    const foundBooks = Array.from(cards).filter(card => card.children[0].innerHTML == item.title);

    // Create new paragraph for each property
    if (foundBooks.length <= 0) {
        for (property in item) {
            const newPara = document.createElement("p");
            const newContent = document.createTextNode(item[property]);
            
            newPara.appendChild(newContent);
            contentContainer.appendChild(newPara);
        }

        // Add X button to remove book (and card)
        const removeBookBtn = document.createElement("button");
        removeBookBtn.classList.add("delete-btn", "book" + bookIndex);
        newCard.appendChild(removeBookBtn);

        // Add button to toggle read status
        const toggleReadStatus = document.createElement("button");
        toggleReadStatus.classList.add("toggle-read", "book" + bookIndex);
        if (item.read == "Not read yet") {
            toggleReadStatus.classList.add("not-read");
        }

        newCard.appendChild(toggleReadStatus);
        newCard.appendChild(contentContainer)
        bookContainer.appendChild(newCard);
    } else if (foundBooks.length > 0 && updateCard) {
        updateBookCard(cards, item);
    } else if (foundBooks.length > 0 && !updateCard) {
        return;
    }
}

function clearInputFields() {
    bookTitle.value = "";
    bookAuthor.value = "";
    numberOfPages.value = "";
    readStatus.value = "Read";
}

// Disable submit button until form fields validated
function checkForm() {
    let formElements = document.forms["book-form"].elements;
    let cansubmit = true;

    for (let i = 0; i < formElements.length - 1; i++) {
        if (formElements[i].value.length == 0) {
            cansubmit = false;
        }
    }

    document.getElementById('submit-entry').disabled = !cansubmit;

    return cansubmit;
}

// Toggle form visibility
newBookBtn.addEventListener("click", function (e) {
    bookForm.classList.toggle("hidden");
})

// Submit book to library and display card
submitBook.addEventListener("click", function (e) {
    if (checkForm() == true) {
        const book = addBookToLibrary(bookTitle.value, bookAuthor.value, numberOfPages.value + " pages", readStatus.value);
    
        clearInputFields();
        addCard(book);
    }

    e.target.disabled = true;
})

document.body.addEventListener("click", function (e) {
    const btnClass = e.target.classList[0];
    const bookId = e.target.classList[1];

    // Remove book from library
    if (btnClass == "delete-btn") {
        myLibrary.splice(parseInt(bookId), 1)
        
        // Delete card(s) simultaneously
        const cardToDelete = bookContainer.querySelectorAll("." + bookId);
        if (cardToDelete.length > 1) {
            cardToDelete.forEach(card => card.remove());
        } else {
            cardToDelete.remove();
        }
    }

    // When toggle button is clicked, update read status in array and card
    if (btnClass == "toggle-read") {
        const infoContainer = document.getElementsByClassName("card " + bookId)[0].lastElementChild;

        const titlePara = infoContainer.firstChild.innerHTML;
        let cardReadStatus = infoContainer.lastChild;

        myLibrary.map(book => {
            if (book.title == titlePara && book.read == "Read") {
                book.read = "Not read yet";
                cardReadStatus.innerHTML = "Not read yet";
                e.target.classList.add("not-read");
            } else if (book.title == titlePara && book.read == "Not read yet") {
                book.read = "Read";
                cardReadStatus.innerHTML = "Read";
                e.target.classList.remove("not-read");
            }
        })
    }
});