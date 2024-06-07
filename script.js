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


// Add current object to myLibrary array.
Book.prototype.addToLibrary = function () {
    myLibrary.push(this);
}


// Get content from the form and create a new book object in the myLibrary array.
//
// TO BE ADDED
//
function addBookToLibrary() {
}


// Create a new button to be displayed in the form.
function addButton(buttonName, index) {
    let button = document.createElement("button");
    button.textContent = buttonName;
    button.setAttribute("value", buttonName);
    button.setAttribute("data", index);

    return button;
}



function displayBooks() {
// Display each book in myLibrary on the page.

    let table = document.querySelector("tbody");
    let index = 0;

    for (book of myLibrary) {

        let row = document.createElement("tr");
        row.classList = "row";

        for (key in book) {

            // Go through each book attribute excluding the methods defined in the prototype
            if (book.hasOwnProperty(key)) {

                // Fill each cell in the table with the content of the object
                let cell = document.createElement("td");

                if (key == "read") {
                    cell.textContent = readStatus(book[key]);
                }

                else {
                    cell.textContent = book[key];
                }
                row.appendChild(cell);
            }
        }

        // Add buttons to the last cell in the row
        let cell = document.createElement("td");
        
        cell.appendChild(addButton("Read", index));
        cell.appendChild(addButton("Delete", index)); 
        row.appendChild(cell);

        // Add the row of values to the table
        table.appendChild(row);

        // Increment the index
        index++;
    }
}


// Update the table by removing old data and replacing with updated data.
function refreshBooks() {
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => row.remove()); 

    displayBooks();

    // Event listeners
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data");

            if (event.target.value == "Read") {
                myLibrary[index].updateRead();
            }

            if (event.target.value == "Delete") {
                myLibrary.splice(index, 1);
            }

            refreshBooks();
        });
    });
}




// For testing
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
theHobbit.addToLibrary();
const otherBook = new Book("Other book", "Fake author", 200, true);
otherBook.addToLibrary();

refreshBooks();