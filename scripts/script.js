const container = document.querySelector(".container");
const newBookBtn = container.querySelector("#new-book");
const bookForm = container.querySelector("form");
const bookContainer = container.querySelector(".book-cards");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
    }
}

function addBookToLibrary() {
    const title = prompt("Enter a book title:");
    const author = prompt("Who wrote the book?");
    const pages = prompt("How many pages does the book have?");
    const read = prompt("Did you finish reading the book?");

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    myLibrary.forEach((book) => addCard(book))
}

function addCard(item) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    // Create new paragraph for each property
    for (property in item) {
        if (property == "info") continue;

        const newPara = document.createElement("p");
        const newContent = document.createTextNode(item[property]);
        newPara.appendChild(newContent);     
        newCard.appendChild(newPara);
    }

    newCard.style.border = "2px solid black";

    bookContainer.appendChild(newCard);
}

// Toggle form visibility
newBookBtn.addEventListener("click", function (e) {
    bookForm.classList.toggle("hidden");
})

// Temporary content for testing
const theHobbit = new Book(
    "The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet"
    );
const harryPotter = new Book(
    "Harry Potter and the Sorcerer's Stone", "J. K. Rowling", "223 pages", "read"
    );
const percyJackson = new Book(
    "The Lightning Thief", "J.R.R. Tolkien", "377 pages", "not read yet"
    );

myLibrary.push(theHobbit, harryPotter, percyJackson);

displayBooks();