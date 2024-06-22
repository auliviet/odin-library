class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // Change the read status
    updateRead() {
        if (this.read == true) {
            this.read = false;
        }
    
        else {
            this.read = true;
        }
    }
    
    // Display a user-friendly version of the read status.
    get readStatus()  {
        if (this.read) {
            return "Already read";
        }
    
        else {
            return "Not read yet";
        }
    }
}


class NewBookForm {

    static addBookToLibrary() {
        const book = new Book;
    
        // Select the form fields
        let inputs = document.querySelectorAll("input");
        let select = document.querySelector("select");

        // Fill the book object
        for (let input of inputs) {
            // Get the value of the input fields
            book[input.name] = input.value;
        }

        // Get the value of the select field and convert it to boolean type
        book.read = (select.selectedOptions[0].value == "true" ? true : false); 
        
        // Add the new book to myLibrary array
        Library.add(book);
        NewBookForm.refreshForm();
    }

    static refreshForm() {
        // Select the form fields
        let inputs = document.querySelectorAll("input");
            
        // Ensure the form is empty
        for (let input of inputs) {
            input.value = "";
        }
    }

    static addFormEvents() {
        let submitButton = document.querySelector(".submit");
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent reloading the page
            NewBookForm.addBookToLibrary();
            Library.displayLibrary();
        });
    }
}

class Library {
    static myNewLibrary = [];

    static add(book) {
        this.myNewLibrary.push(book);
    }

    static get books() {
        return this.myNewLibrary;
    }

    static displayLibrary() {
        // Delete any existing data displayed on the page to avoid duplicating content
        let rows = document.querySelectorAll(".row");
        rows.forEach((row) => row.remove()); 

        // Build the table from the myLibrary data
        let table = document.querySelector("tbody");
        let index = 0;

        for (let book of Library.books) {

            let row = document.createElement("tr");
            row.classList = "row";

            for (let key in book) {

                // Go through each book attribute excluding the methods defined in the prototype
                if (book.hasOwnProperty(key)) {

                    // Fill each cell in the table with the content of the object
                    let cell = document.createElement("td");

                    if (key == "read") {
                        cell.textContent = book.readStatus;
                    }

                    else {
                        cell.textContent = book[key];
                    }

                    // Add the appropriate headers
                    cell.setAttribute("headers", key);
                    row.appendChild(cell);
                }
            }

            // Add buttons to the last cell in the row
            let cell = document.createElement("td");
            
            cell.appendChild(Library.addBookButtons("Read", index));
            cell.appendChild(Library.addBookButtons("Delete", index)); 
            row.appendChild(cell);

            // Add the row of values to the table
            table.appendChild(row);

            // Increment the index
            index++;
        }

        // Add event listeners
        Library.addBookEvents();
    }

    // Create a new button to be displayed in the form.
    static addBookButtons(buttonName, index) {
        let button = document.createElement("button");
    
        button.textContent = buttonName;
        button.setAttribute("value", buttonName);
        button.setAttribute("data", index);
    
        return button;
    }

    // Create the event listeners for the library table.
    static addBookEvents() {

        let buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                let index = event.target.getAttribute("data");
    
                switch (event.target.value) {
                    case "Read":
                        Library.books[index].updateRead();
                        break;
                    
                    case "Delete":
                        Library.books.splice(index, 1);
                        break;
                }
                
                Library.displayLibrary();
                
            });
        });    
    }
    
}


//
// DEBUGGING AND TESTING
//

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
Library.add(theHobbit);
const usageDuMonde = new Book("L'usage Du Monde", "Nicolas Bouvier", 309, false);
Library.add(usageDuMonde);
const shantaram = new Book("Shantaram", "Gregory David Roberts", 936, true)
Library.add(shantaram)

//
// MAIN FUNCTIONS
//
Library.displayLibrary();
NewBookForm.addFormEvents();