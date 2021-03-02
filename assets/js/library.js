class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToLibrary(book));
  }

  static addBookToLibrary(book) {
    const list = document.querySelector('#bookList');

    const row = document.createElement('tr');

    row.innerHTML = `
          <td class="has-text-centered">${book.title}</td>
          <td class="has-text-centered">${book.author}</td>
          <td class="has-text-centered">${book.pages}</td>
          <td class="has-text-centered"><label class="checkbox"><input type="checkbox"></label</td>
          <td class="has-text-centered"><a href='#' class='delete'>X</a></td>
      `;


    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
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
    setTimeout(() => document.querySelector('.notification').remove(), 1800);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
  }
}


document.addEventListener('DOMContentLoaded', UI.displayBooks);


document.querySelector('#l-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;

  if (title === '' || author === '' || pages === '') {
    UI.showAlert('You need to fill all the fields', 'warning');
  } else {
    const book = new Book(title, author, pages);
    UI.addBookToLibrary(book);
    Store.addBook(book);
    UI.showAlert('Book Added', 'primary');
    UI.clearFields();
  }
});

document.querySelector('#bookList').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  UI.showAlert('Book Removed', 'danger');

  Store.removeBook(e.target.parentElement.parentElement.firstElementChild.textContent);
});


function showForm() {
  document.getElementById('l-form').style.display = 'block';
}
