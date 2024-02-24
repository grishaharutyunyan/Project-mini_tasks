const products = [
    { id: 1, name: "Eco-friendly Water Bottle", category: "Home", price: 15, tags: ["eco-friendly", "new"] },
    { id: 2, name: "Organic Cotton T-shirt", category: "Apparel", price: 25, tags: ["eco-friendly"] },
    { id: 3, name: "Wireless Headphones", category: "Electronics", price: 200, tags: ["new", "sale"] },
];

const searchInput = document.querySelector('.input-group input');
const tableBody = document.getElementById('product_table');
const tableHeadings = document.querySelectorAll('thead th');
const categoryFilter = document.getElementById('category-filter');

function createTableRows() {
    const storedProducts = JSON.parse(localStorage.getItem('products'));

    const allProducts = storedProducts ? [...products, ...storedProducts] : products;

    allProducts.forEach(product=> {
        const row = document.createElement('tr');

        const cells = [
            product.id,
            product.name,
            product.category,
            product.price,
        ];

        cells.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        const tagCell = document.createElement('td');
        tagCell.textContent = product.tags.join(', ');
        row.appendChild(tagCell);
        tableBody.appendChild(row);
    });

    updateFilterOptions();
}

createTableRows();

function searchTable() {
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach((row, i) => {
        let tableData = row.textContent.toLowerCase();
        let searchData = searchInput.value.toLowerCase();

        row.classList.toggle('hide', tableData.indexOf(searchData) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
        row.querySelectorAll('td').forEach(cell => {
            let cellContent = cell.textContent.toLowerCase();
            let searchTerm = searchInput.value.toLowerCase();
            let startIndex = cellContent.indexOf(searchTerm);


            if (startIndex > -1) {
                let endIndex = startIndex + searchTerm.length;
                let highlighted = cellContent.substring(0, startIndex) +
                    '<span class="highlight">' +
                    cellContent.substring(startIndex, endIndex) +
                    '</span>' +
                    cellContent.substring(endIndex);

                cell.innerHTML = highlighted;
            } else {
                cell.innerHTML = cellContent;
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

function saveProductToLocalstorage(newProduct) {
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
}

function addProductToTable(newProduct) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newProduct.id}</td>
        <td>${newProduct.name}</td>
        <td>${newProduct.category}</td>
        <td>${newProduct.price}</td>
        <td>${newProduct.tags.join(', ')}</td>
    `;
    tableBody.appendChild(newRow);
    updateFilterOptions();
}

document.getElementById('add-product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('name').value;
    const productCategory = document.getElementById('category').value;
    const productPrice = document.getElementById('price').value;
    const productTags = document.getElementById('tags').value;

    const newProduct = {
        id: products.length + 1,
        name: productName,
        category: productCategory,
        price: productPrice,
        tags: productTags.split(',')
    };

    saveProductToLocalstorage(newProduct);
    addProductToTable(newProduct);
    document.getElementById('add-product-form').reset();
    closeModal();
});

function filterByCategory(category) {
    const tableRows = document.querySelectorAll('#product_table tr');
    if (category === "") {
        tableRows.forEach(row => {
            row.style.display = "";
        });
    } else {
        tableRows.forEach(row => {
            const categoryCell = row.querySelector('td:nth-child(3)'); // third cell (index 2) contains category
            if (categoryCell.textContent !== category) {
                row.style.display = "none";
            } else {
                row.style.display = "";
            }
        });
    }
}

categoryFilter.addEventListener('change', function() {
    filterByCategory(this.value);
});

function updateFilterOptions() {
    const tableRows = document.querySelectorAll('#product_table tr');
    const currentOptions = Array.from(categoryFilter.options).map(option => option.value);

    tableRows.forEach(row => {
        const categoryCell = row.querySelector('td:nth-child(3)');
        const category = categoryCell.textContent;
        if (!currentOptions.includes(category)) {
            const newOption = document.createElement('option');
            newOption.value = category;
            newOption.text = category;
            categoryFilter.appendChild(newOption);
        }
    });
}
