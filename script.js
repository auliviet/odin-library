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


// Display a user-friendly version of the read status.
Book.prototype.displayRead = function() {
    if (this.read) {
        return "Already read";
    }

    else {
        return "Not read yet";
    }
}


// Get content from the form and create a new book object in the myLibrary array.
function addBookToLibrary() {
    const book = new Book;
    
    // Select the form fields
    let inputs = document.querySelectorAll("input");
    let select = document.querySelector("select");

    // Fill the book object
    for (input of inputs) {
        book[input.name] = input.value;
    }
    
    // Add the new book to myLibrary array
    myLibrary.push(book);

   displayLibraryTable();
}


// Create a new button to be displayed in the form.
function addBookButtons(buttonName, index) {
    let button = document.createElement("button");

    button.textContent = buttonName;
    button.setAttribute("value", buttonName);
    button.setAttribute("data", index);

    return button;
}


// Create the event listeners used on the page.
function addEventListeners() {

    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data");

            switch (event.target.value) {
                case "Read":
                    myLibrary[index].updateRead();
                    displayLibraryTable();
                    break;
                
                case "Delete":
                    myLibrary.splice(index, 1);
                    displayLibraryTable();
                    break;
                
                case "submit":
                    event.preventDefault(); // Prevent reloading the page
                    addBookToLibrary();
                    displayLibraryTable();
                    break;

                default:
                    break;
            }
        });
    });    
}


function displayLibraryTable() {
// Display each book in myLibrary on the page.
   
    // Delete any existing data displayed on the page to avoid duplicating content
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => row.remove()); 

    // Build the table from the myLibrary data
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
                    cell.textContent = book.displayRead();
                }

                else {
                    cell.textContent = book[key];
                }
                row.appendChild(cell);
            }
        }

        // Add buttons to the last cell in the row
        let cell = document.createElement("td");
        
        cell.appendChild(addBookButtons("Read", index));
        cell.appendChild(addBookButtons("Delete", index)); 
        row.appendChild(cell);

        // Add the row of values to the table
        table.appendChild(row);

        // Increment the index
        index++;
    }

    // Add event listeners
    addEventListeners();
}


// For testing
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
myLibrary.push(theHobbit);
const otherBook = new Book("Other book", "Fake author", 200, true);
myLibrary.push(otherBook);

displayLibraryTable();