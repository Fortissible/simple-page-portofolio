const RENDER_EVENT = 'render-todo';
const bookStorageKeys = "BOOK_STORAGE";
let bookTitleField = document.getElementById('inputBookTitle');
let bookAuthorField = document.getElementById('inputBookAuthor');
let bookYearField = document.getElementById('inputBookYear');
let bookIsCompleted = document.getElementById('inputBookIsComplete');
let currentBookShelf = [];

document.addEventListener('DOMContentLoaded', function(){
  if (checkLocalStorage()){
    currentBookShelf = [];
    currentBookShelf = getSavedBook();
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
});

let inputBookForm = document.getElementById('inputBook');
inputBookForm.addEventListener('submit',function (e){
  e.preventDefault();
  let bookObject = {
    id: generateBookId(),
    title : bookTitleField.value,
    author: bookAuthorField.value,
    year  : parseInt(bookYearField.value),
    isCompleted : bookIsCompleted.checked
  }
  addNewBook(bookObject);
});

let submitBookButtonTextSpan = document.getElementById('shelfType');
let isCompletedChkBox = document.getElementById('inputBookIsComplete');
isCompletedChkBox.addEventListener('click', function(){
  if (isCompletedChkBox.checked){
    submitBookButtonTextSpan.innerText = "Selesai dibaca";
  } else {
    submitBookButtonTextSpan.innerText = "Belum Selesai dibaca";
  }
});

let searchForm = document.getElementById('searchBook');
let searchTitleField = document.getElementById('searchBookTitle');
searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  if (searchTitleField.value !== "" || searchTitleField.value !== null){
    searchBooks(searchTitleField.value)
  }
});

function searchBooks(titleQuery){
  let searchSection = document.getElementById('searchQueryResult');
  searchSection.innerHTML = '';

  
  let deleteButton = document.createElement('button');
  deleteButton.classList.add('red');
  deleteButton.innerText = "Hapus pencarian";
  deleteButton.addEventListener('click', function(){
    resetSearch();
    searchTitleField.value = '';
    searchSection.innerHTML = '';
  });


  console.log(`You are searching for books that contain title ${titleQuery}`)
  let filteredBooks = currentBookShelf.filter((book) => book.title.search(titleQuery) !== -1);
  if (filteredBooks.length !== 0){
    currentBookShelf = filteredBooks;
    let searchResults = document.createElement('h2');
    searchResults.innerText = `${filteredBooks.length} Buku Ditemukan!`
    searchSection.append(searchResults);
  } else {
    let searchResults = document.createElement('h2');
    searchResults.innerText = `Buku tidak ditemukan!`
    searchSection.append(searchResults);
  }
  searchSection.append(deleteButton);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function resetSearch(){
  currentBookShelf = getSavedBook();
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function saveBooks(){
  let booksStringObject = JSON.stringify(currentBookShelf);
  localStorage.setItem(bookStorageKeys, booksStringObject);
}

function getSavedBook(){
  let savedBookShelfStr = localStorage.getItem(bookStorageKeys);
  return JSON.parse(savedBookShelfStr) || [];
}

function addNewBook(bookObject){
  currentBookShelf.push(bookObject);
  console.log(`TERSUBMIT ${bookObject.id}, ${bookObject.title}, ${bookObject.author}, ${bookObject.year}, ${bookObject.isCompleted}`);
  if (checkLocalStorage()){
    saveBooks();
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function updateBook(bookObject){
  let newBook = {
    id: bookObject.id,
    title : bookObject.title,
    author: bookObject.author,
    year  : parseInt(bookObject.year),
    isCompleted : !bookObject.isCompleted
  }
  deleteBook(bookObject.id);
  addNewBook(newBook);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function deleteBook(bookId){
  console.log(`DELETING BOOK WITH ID ${bookId}`);
  let deletedBookIdx = getBooksIndex(bookId);
  if (deletedBookIdx !== -1){
    currentBookShelf.splice(deletedBookIdx, 1);
  } else {
    alert("Buku yang ingin dihapus tidak ditemukan");
  }
  if (checkLocalStorage()){
    saveBooks();
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}