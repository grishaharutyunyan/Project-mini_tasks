const users = [
    {
        id: 1,
        name: "John Doe",
        age: 20,
        department: "Engineering",
        role: { title: "Frontend Developer", level: "Mid" },
        contact: { email: "john.doe@example.com", phone: "123-456-7890" },
        skills: ["JavaScript", "React", "CSS"]
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 21,
        department: "Design",
        role: { title: "UI/UX Designer", level: "Senior" },
        contact: { email: "jane.smith@example.com", phone: "098-765-4321" },
        skills: ["Figma", "Sketch", "Adobe XD"]
    },
    {
        id: 3,
        name: "Mike Johnson",
        age: 22,
        department: "Engineering",
        role: { title: "Backend Developer", level: "Senior" },
        contact: { email: "mike.johnson@example.com", phone: "456-789-0123" },
        skills: ["Node.js", "Express", "MongoDB"]
    },
    {
        id: 4,
        name: "Alice Brown",
        age: 23,
        department: "Marketing",
        role: { title: "Marketing Manager", level: "Senior" },
        contact: { email: "alice.brown@example.com", phone: "789-012-3456" },
        skills: ["Marketing Strategy", "SEO", "Social Media Marketing"]
    },
    {
        id: 5,
        name: "David Wilson",
        age: 24,
        department: "Sales",
        role: { title: "Sales Representative", level: "Mid" },
        contact: { email: "david.wilson@example.com", phone: "321-654-9870" },
        skills: ["Sales Techniques", "Customer Relationship Management"]
    },
    {
        id: 6,
        name: "Emily Garcia",
        age: 25,
        department: "Finance",
        role: { title: "Financial Analyst", level: "Mid" },
        contact: { email: "emily.garcia@example.com", phone: "654-987-3210" },
        skills: ["Financial Reporting", "Data Analysis", "Budgeting"]
    },
    {
        id: 7,
        name: "Mark Martinez",
        age: 26,
        department: "Engineering",
        role: { title: "Fullstack Developer", level: "Senior" },
        contact: { email: "mark.martinez@example.com", phone: "987-321-6540" },
        skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML", "CSS"]
    },
    {
        id: 8,
        name: "Linda Thompson",
        age: 27,
        department: "Human Resources",
        role: { title: "HR Manager", level: "Senior" },
        contact: { email: "linda.thompson@example.com", phone: "654-987-3210" },
        skills: ["Recruitment", "user Relations", "Performance Management"]
    },
    {
        id: 9,
        name: "William Lee",
        age: 28,
        department: "Design",
        role: { title: "Graphic Designer", level: "Mid" },
        contact: { email: "william.lee@example.com", phone: "321-654-9870" },
        skills: ["Adobe Photoshop", "Illustrator", "InDesign"]
    },
    {
        id: 10,
        name: "Olivia Hall",
        age: 29,
        department: "Customer Service",
        role: { title: "Customer Support Specialist", level: "Mid" },
        contact: { email: "olivia.hall@example.com", phone: "654-321-9870" },
        skills: ["Customer Service", "Communication Skills", "Problem Solving"]
    },
];


function createTableRows() {
    const tableBody = document.getElementById('user-table');


    const storedUsers = JSON.parse(localStorage.getItem('users'));


    const allUsers = storedUsers ? [...users, ...storedUsers] : users;

    allUsers.forEach(user => {
        const row = document.createElement('tr');

        const cells = [
            user.id,
            user.name,
            user.age,
            user.department,
            user.role.title,
            user.role.level,
            user.contact.email,
            user.contact.phone
        ];

        cells.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        const skillsCell = document.createElement('td');
        user.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.textContent = skill;
            skillsCell.appendChild(skillElement);
        });
        row.appendChild(skillsCell);
        tableBody.appendChild(row);
    });
}



createTableRows();


const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');


search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}



table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = Number(a.querySelectorAll('td')[column].textContent),
            second_row = Number(b.querySelectorAll('td')[column].textContent);

        return sort_asc ? (first_row - second_row) : (second_row - first_row);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}


function saveUserToLocalstorage(newUser) {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
}

function addUserToTable(newUser) {
    const tableBody = document.getElementById('user-table');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                <td>${newUser.id}</td>
                <td>${newUser.name}</td>
                <td>${newUser.age}</td>
                <td>${newUser.department}</td>
                <td>${newUser.role.title}</td>
                <td>${newUser.role.level}</td>
                <td>${newUser.contact.email}</td>
                <td>${newUser.contact.phone}</td>
                <td>${newUser.skills.join(', ')}</td>
            `;
    tableBody.appendChild(newRow);
}

document.getElementById('add-user-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const userName = document.getElementById('name').value;
    const userAge = document.getElementById('age').value;
    const userDepartment = document.getElementById('department').value;
    const userTitle = document.getElementById("role_title").value;
    const userLevel = document.getElementById("role_level").value;
    const userEmail = document.getElementById("email").value;
    const userPhone = document.getElementById("phone").value;
    const userSkills = document.getElementById("skills").value;

    const newUser = {
        id: users.length + 1,
        name: userName,
        age: userAge,
        department: userDepartment,
        role: { title: userTitle, level: userLevel },
        contact: { email: userEmail, phone: userPhone },
        skills: userSkills.split(',')
    };

    saveUserToLocalstorage(newUser);
    addUserToTable(newUser);
    document.getElementById('add-user-form').reset();
    closeModal();
  });


