// Add this to your script.js file
function updateModal(bookObject){
    const closeModalBtn = document.getElementById('closeModalBtn');
    const updateBookBtn = document.getElementById('bookUpdate');
    const modal = document.getElementById('myModal');
    const titleField = document.getElementById('updateBookTitle');
    const authorField = document.getElementById('updateBookAuthor');
    const yearField = document.getElementById('updateBookYear');
    const isCompletedField = document.getElementById('updateBookIsComplete');

    titleField.value = bookObject.title;
    authorField.value = bookObject.author;
    yearField.value = bookObject.year;
    isCompletedField.checked = bookObject.isCompleted;

    modal.style.display = 'block';
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    updateBookBtn.addEventListener('click', function(e){
      let updatedBook = {
        id: bookObject.id,
        title : titleField.value,
        author: authorField.value,
        year  : parseInt(yearField.value),
        isCompleted : isCompletedField.checked
      }
      deleteBook(bookObject.id);
      addNewBook(updatedBook);
      modal.style.display = 'none';
      e.preventDefault();
      document.dispatchEvent(new Event(RENDER_EVENT));
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}