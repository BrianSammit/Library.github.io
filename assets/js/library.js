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
      const books = Store.getBooks();

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
          <td class="has-text-centered"><a href='#' class='delete'>X</a></td>
      `;
      

      list.appendChild(row);
  }
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `notification is-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.column');
    const form = document.querySelector('#l-form');
    container.insertBefore(div, form);
    // Timer
    setTimeout(() => document.querySelector('.notification').remove(), 1800);
  }

  static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#pages').value = '';
  }
}

// Store class: handles storage

class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title){
    const books = Store.getBooks();

    books.forEach((book, index) => {
        if(book.title === title) {
          books.splice(index, 1);
        }
      });

      localStorage.setItem('books', JSON.stringify(books));
  }
}

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

  // Validate
  if(title === '' || author === '' || pages === '') {
    UI.showAlert('You need to fill all the fields', 'warning');
  } else {
      // instatiate book 
    const book = new Book(title, author, pages);

    // add book to UI 
    UI.addBookToLibrary(book);

    // add books to store 
    Store.addBook(book);

    // Success message
    UI.showAlert('Book Added', 'primary');

    // Clear fields 
    UI.clearFields();
  }
});

// Event: delet book 
document.querySelector('#bookList').addEventListener('click', (e) => {
UI.deleteBook(e.target)

// Delete message
UI.showAlert('Book Removed', 'danger');
});

// Show formm

function showForm() { 
  document.getElementById('l-form').style.display = 'block';
}; 
