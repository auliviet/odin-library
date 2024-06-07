const myLibrary = [];

// Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// Update the read status of a book.
Book.prototype.updateRead = function () {
    if (this.read == true) {
        this.read = false;
    }

    else {
        this.read = true;
    }
}


// Get content from the form and create a new book object in the myLibrary array.
function addBookToLibrary(newBook) {


    myLibrary.push(newBook);
}

function displayBooks() {
// Display each book in myLibrary on the page.

    let table = document.querySelector("tbody");

    for (book of myLibrary) {
        let row = document.createElement("tr");

        for (key in book) {

            // Go through each book attribute excluding the methods defined in the prototype
            if (book.hasOwnProperty(key)) {

                // Fill each cell in the table with the content of the object
                let cell = document.createElement("td");
                cell.textContent = book[key];
                row.appendChild(cell);
            }

            
        }

        // Add the row of values to the table
        table.appendChild(row);
    }
}

// For testing
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);
const otherBook = new Book("Other book", "Fake author", 200, false);
addBookToLibrary(otherBook);

displayBooks();