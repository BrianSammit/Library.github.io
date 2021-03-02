// book Class: reprresent book 

class Book {

    constructor(title, author, pages) {
        this.title = title; 
        this.author = author; 
        this.pages = pages; 
    }
}

// UI class: Handle UI

class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'firt book',
                author: 'Brian',
                pages: 333
            },
            {
                title: 'second book',
                author: 'Miguel',
                pages: 422
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToLibrary(book));
    }

    static addBookToLibrary(book) {
        const list = document.querySelector('#bookList')

        const row = document.createElement('tr'); 

        row.innerHTML = `
            <td class="has-text-centered">${book.title}</td>
            <td class="has-text-centered">${book.author}</td>
            <td class="has-text-centered">${book.pages}</td>
            <td class="has-text-centered"><label class="checkbox"><input type="checkbox">Read it</label</td>
            <td class="has-text-centered"><a href='#' class='bulma delete'>X</a></td>
        `;
        

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    }
}

// Store class: handles storage 

// Events: display books 

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add book

document.querySelector('#l-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    //Get form values 
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    // instatiate book 
    const book = new Book(title, author, pages);

    // add book to UI 

    UI.addBookToLibrary(book);

    // Clear fields 
    UI.clearFields();

});

// Event: delet book 