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
    const updateBook = prompt("This book is already in the catalogues. Would you like to update the information?");

    if (updateBook == "yes") {
        updateCard = true;
        const result = myLibrary.map(book => book.title.toLowerCase() == newBook.title.toLowerCase() ? newBook : book);
        myLibrary = result;
    } else if (updateBook === null) {
        updateCard = false;
    }
}

// Creates a single book card
function addCard(item) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("id", "book" + bookIndex);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("info-container");

    // // Check if card for book already exists
    // const cards = bookContainer.querySelectorAll("." + item.title); 

    // // If card already exists and user wants to update, remove it
    // if (cards.length > 0 && updateCard) {
    //     const bookCard = bookContainer.querySelector("." + item.title);
    //     bookCard.remove()
    // } else if (cards.length > 0 && !updateCard) {
    //     return;
    // }

    // Create new paragraph for each property
    for (property in item) {
        const newPara = document.createElement("p");
        const newContent = document.createTextNode(item[property]);
        newPara.appendChild(newContent);
        contentContainer.appendChild(newPara);
    }

    // Add X button to remove book (and card)
    const removeBookBtn = document.createElement("button");
    removeBookBtn.classList.add("delete-btn");
    removeBookBtn.setAttribute("id", "book" + bookIndex);
    removeBookBtn.textContent = "X";
    newCard.appendChild(removeBookBtn);

    // Add button to toggle read status
    const toggleReadStatus = document.createElement("button");
    toggleReadStatus.classList.add("toggle-read");
    newCard.appendChild(toggleReadStatus);

    newCard.appendChild(contentContainer)
    bookContainer.appendChild(newCard);
}

function clearInputFields() {
    bookTitle.value = "";
    bookAuthor.value = "";
    numberOfPages.value = "";
    readStatus.value = "Read";
}

// Toggle form visibility
newBookBtn.addEventListener("click", function (e) {
    bookForm.classList.toggle("hidden");
})

// Submit book to library and display card
submitBook.addEventListener("click", function (e) {
    const book = addBookToLibrary(bookTitle.value, bookAuthor.value, numberOfPages.value + " pages", readStatus.value);

    clearInputFields();
    addCard(book);
})

// Remove book from library
document.body.addEventListener("click", function (e) {
    if (e.target.className == "delete-btn") {
        const bookId = e.target.id;
        myLibrary.splice(parseInt(bookId), 1)
        
        // Delete card(s) simultaneously
        const cardToDelete = bookContainer.querySelectorAll("#" + bookId);
        if (cardToDelete.length > 1) {
            cardToDelete.forEach(card => card.remove());
        } else {
            cardToDelete.remove();
        }
    }
});