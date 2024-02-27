document.addEventListener(RENDER_EVENT, function () {
  let completedBooksElement = document.getElementById('completeBookshelfList');
  let incompletedBooksElement = document.getElementById('incompleteBookshelfList');
  
  let listCompletedBooks = currentBookShelf.filter((book) => book.isCompleted == true);
  let listUncompletedBooks = currentBookShelf.filter((book) => book.isCompleted == false);
  console.log(listCompletedBooks);
  console.log(listUncompletedBooks);
  incompletedBooksElement.innerHTML = '';
  completedBooksElement.innerHTML = '';
  if (currentBookShelf.length == 0){
    completedBooksElement.innerHTML = '<h2>Tidak ada buku yang selesai dibaca!</h2>';
    incompletedBooksElement.innerHTML = '<h2>Tidak ada buku yang belum selesai dibaca!</h2>';
  } else {
    if (listCompletedBooks.length == 0){
      incompletedBooksElement.innerHTML = '';
      completedBooksElement.innerHTML = '<h2>Tidak ada buku yang selesai dibaca!</h2>';
    } 
    if (listUncompletedBooks.length == 0){
      completedBooksElement.innerHTML = '';
      incompletedBooksElement.innerHTML = '<h2>Tidak ada buku yang belum selesai dibaca!</h2>';
    }
  }

  for (const book of currentBookShelf) {
    console.log(`GET FROM WEBSTORAGE ${book.id}, ${book.title}, ${book.author}, ${book.year}, ${book.isCompleted}`);
    const bookElement = makeBookElements(book);
    if (book.isCompleted) {
      completedBooksElement.append(bookElement);
    } else {
      incompletedBooksElement.append(bookElement);
    }
  }
});

function makeBookElements(book){
  let divEl = document.createElement('div');
  divEl.classList.add('book_item');
  divEl.setAttribute("id", book.id);
  let title = document.createElement('h3');
  let pAuthor = document.createElement('p');
  let pYear = document.createElement('p');
  title.innerText = book.title;
  pAuthor.innerText = "Penulis: " + book.author;
  pYear.innerText = "Tahun: " + book.year;

  let divElActions = document.createElement('div');
  divElActions.classList.add('action');
  let doneButton = document.createElement('button');
  let updateButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  doneButton.classList.add('green');
  updateButton.classList.add('blue');
  deleteButton.classList.add('red');
  if (book.isCompleted){
    doneButton.innerText = "Belum selesai di Baca";
  } else {
    doneButton.innerText = "Selesai dibaca";
  }
  deleteButton.innerText = "Hapus buku";
  updateButton.innerText = "Update buku";

  deleteButton.addEventListener('click', function () {
    deleteBook(book.id);
  });

  updateButton.addEventListener('click', function () {
    updateModal(book);
  });

  doneButton.addEventListener('click', function () {
    updateBook(book);
  });

  divElActions.append(doneButton);
  divElActions.append(updateButton);
  divElActions.append(deleteButton);

  divEl.append(title);
  divEl.append(pAuthor);
  divEl.append(pYear);
  divEl.append(divElActions);
  return divEl;
}

function getBooksIndex(bookId){
  for (const index in currentBookShelf) {
    if (currentBookShelf[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function generateBookId(){
  return +new Date();
}

function checkLocalStorage(){
  if (localStorage == null){
    alert("Browser anda tidak mendukung penyimpanan lokal storage!");
    return false
  } else {
    return true
  }
}