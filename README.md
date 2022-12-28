# Library App

* [Live Demo](https://ajwjung.github.io/library/) :star2:

## Objective

To test understanding of objects and object constructors by creating a small library app. Full project details can be found at [The Odin Project's page](https://www.theodinproject.com/lessons/node-path-javascript-library).

### Specifications

**Requirements**

1. All book objects should be stored in a simple array

2. New books objects should be created using a `Book` constructor

3. Use a function to loop through the array and display each book on the page
    * The display can be a table or "cards"

4. Add a "NEW BOOK" button that brings up a form allowing users to input details for the book (title, author, number of pages, and whether it's been read)

5. Add a button on each book's display to remove the book from the library

6. Add a button on each book's display to change its `read` status
    * Create a function that toggles a book's `read` status on the `Book` prototype instance

**Note:** At this stage, we are not required to add any type of storage.

### Credits

* Icons were downloaded from [materialdesignicons.com](https://materialdesignicons.com/)

## Author's Notes

One of the main things I struggled with was figuring out how to remove each book and its respective card(s).
* *Problem:* I was dynamically creating cards for books and the "delete book" buttons were only created *after* the cards were created, so the compiler couldn't properly attach an event listener to these buttons

* *Details:* This also broke the code that checked if the submitted book entry already exists in the library because I originally used book titles as the `div` IDs. In order to make the "delete book" buttons work, I had to change these IDs to the books' indexes.

* *Solution:* I used `document.body.addEventListener()` to access all of the buttons in DOM, even those created at a later time

Another thing that took me a while to figure out was updating a book entry's read status in the storage array and the display card.
* *Problem:* I originally tried to access the read paragraph using the book index found in the card's ID, but this wouldn't work if a book entry was deleted. 

* *Details:* As an example, if I add a book then its index in the array is 0 and card ID is "book0". Once this book is deleted, the array is empty but the next card created will have an ID of "book1". This means if I try to use the index extracted from the ID, I won't get the right element.

* *Solution:* I learned that there are properties to access an element's child or siblings (`.firstChild`, `.lastChild`, etc.) and used those to target the read paragraph.

One last feature that was a bit of a challenge was updating a book's card if the user was submitting a duplicate entry. This was not a required feature but I wanted to implement it because it felt like a useful feature.
* *Problem:* The duplicate book check was originally functioning until I introduced the "remove book" button because I had to change the card IDs.

* *Details:* All cards originally had an ID with the book's name, which I could use to easily check if a book's card already existed. By removing this ID, the check no longer worked.

* *Solution:* I accessed all cards' `info-container` and converted the nodelist to an array. Then I filtered this array for books matching the book title from the newly-submitted entry. I learned to use `item.children` with `.innerHTML` for this solution.

Overall, this project took me at least 25 hours to complete.
