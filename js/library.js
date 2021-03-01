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
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><a href='#' class='bulma delete'>X</a></td>
            <td><a href='#' class='bulma swich'></a></td>
        `;

        list.appendChild(row);
    }
}

// Store class: handles storage 

// Events: display books 

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add book

// Event: delet book 