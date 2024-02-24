const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
    { id: 6, title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
    { id: 7, title: "Animal Farm", author: "George Orwell", year: 1945 },
    { id: 8, title: "Moby-Dick", author: "Herman Melville", year: 1851 },
    { id: 9, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
    { id: 10, title: "War and Peace", author: "Leo Tolstoy", year: 1869 }
];

const searchInput = document.querySelector('.input-group input');
const tableBody = document.getElementById('product_table');
const tableHeadings = document.querySelectorAll('thead th');
const categoryFilter = document.getElementById('category-filter');

function createTableRows() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));

    const allBooks = storedBooks ? [...books, ...storedBooks] : books;

    allBooks.forEach(book=> {
        const row = document.createElement('tr');

        const cells = [
            book.id,
            book.title,
            book.author,
            book.year,
        ];

        cells.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

}

createTableRows();

function searchTable() {
    const tableRows = document.querySelectorAll('tbody tr');
    const searchData = searchInput.value.toLowerCase();

    tableRows.forEach((row, i) => {
        row.classList.toggle('hide', row.textContent.toLowerCase().indexOf(searchData) < 0);
        row.style.setProperty('--delay', i / 25 + 's');

        row.querySelectorAll('td').forEach(td => {
            let cellData = td.textContent;
            const lowercaseCellData = cellData.toLowerCase();

            if (lowercaseCellData.includes(searchData)) {
                const highlightedText = new RegExp(`(${searchData})`, 'gi');
                td.innerHTML = cellData.replace(
                    highlightedText,
                    '<span class="highlight">$1</span>'
                );
            } else {
                td.innerHTML = cellData;
            }
        });
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visibleRow, i) => {
        visibleRow.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}




searchInput.addEventListener('input', searchTable);

tableHeadings.forEach((head, i) => {
    let sortAsc = true;
    head.onclick = () => {
        tableHeadings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        document.querySelectorAll('tbody tr').forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        });

        head.classList.toggle('asc', sortAsc);
        sortAsc = head.classList.contains('asc') ? false : true;

        sortTable(i, sortAsc);
    }
});

function sortTable(column, sortAsc) {
    const tableRows = document.querySelectorAll('tbody tr');

    [...tableRows].sort((a, b) => {
        let firstRow = Number(a.querySelectorAll('td')[column].textContent);
        let secondRow = Number(b.querySelectorAll('td')[column].textContent);

        return sortAsc ? (firstRow - secondRow) : (secondRow - firstRow);
    })
        .map(sortedRow => tableBody.appendChild(sortedRow));
}

function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function saveBookToLocalStorage(newBook) {
    const existingBooks = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = [...existingBooks, newBook];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
}

function addBookToTable(newBook) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newBook.id}</td>
        <td>${newBook.name}</td>
        <td>${newBook.category}</td>
        <td>${newBook.price}</td>
    `;
    tableBody.appendChild(newRow);
}

document.getElementById('add-product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookYear = document.getElementById('year').value;

    const newBook = {
        id: books.length + 1,
        title: bookTitle,
        author: bookAuthor,
        year: bookYear
    };

    saveBookToLocalStorage(newBook);
    addBookToTable(newBook);
    document.getElementById('add-product-form').reset();
    closeModal();
});







