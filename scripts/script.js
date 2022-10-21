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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet");