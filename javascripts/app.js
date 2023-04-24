var resultsArea = $("#results");
var displayArea = $("#display");
var books = {};

$("#submit").on("click", function () {
  var searchText = $("input").val();
  performSearch(searchText);
});

// WORK NEEDED (SEE TODO)
function performSearch(searchText) {
  var URL = googleBookAPI_URL(searchText);
  $.get(URL, function (data) {
    addResultToDOM(data);
  });

  // TODO: Create a GET request to URL with search text from the input box.
  // TODO: Add search results from above to the DOM: Use addResultToDOM and pass
  // in your search results.- DONE LINE 13-14
}

// DO NOT MODIFY
function googleBookAPI_URL(searchText) {
  return `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}`;
}

// DO NOT MODIFY
function addResultToDOM(searchResults) {
  var items = searchResults.items;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var newBook = createBookFrom(item);

    books[newBook.id] = newBook;

    resultsArea.append(newBook.html);
  }

  // REQUIRED TO SUCCEED: Look at what gets logged out. Make sure you read
  // what properties are being stored.
  console.log(books);
}

// WORK NEEDED (SEE TODO)
resultsArea.on("click", function (event) {
  var isResultElement = event.target.getAttribute("class") === "result";
  if (isResultElement) {
    displayArea.empty();

    var bookId = event.target.id;
    var book = books[bookId];

    // TODO: Add bookHTML to the display area - DONE LINE 57
    var bookHTML = htmlToDisplay(book);
    console.log(bookHTML);
    displayArea.html(bookHTML);
  }
});

// WORK NEEDED (SEE TODO)
function htmlToDisplay(book) {
  // TODO: Add image from book. -DONE line 67

  return `
    <h2>${book.title}</h2>
    <img src="${book.image}" />;
    <h3><span class="description">${book.description}<span></h3>
  `;
}

// DO NOT MODIFY
function createBookFrom(item) {
  return {
    id: item.id,
    title: item.volumeInfo.title,
    description: item.volumeInfo.description,
    image: item.volumeInfo.imageLinks.thumbnail,
    html: `<span id="${item.id}" class="result">${item.volumeInfo.title}</span>`,
  };
}
