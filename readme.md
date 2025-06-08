# User CRUD REST API

This is a simple **RESTful API** i have built using **Node.js** and **Express.js**. It allows you to perform **CRUD (Create, Read, Update, Delete)** operations on a list of users stored in a local JSON file.

---

## 🚀 Features

=> Get all users
=> Get a user by ID
=> Add a new user
=> Update an existing user
=> Delete a user

---

## 📁 Project Structure

user-crud-rest-api/
```html
<ul>
  <li>MOCK_DATA.json # Sample user data in JSON format</li>
  <li>index.js # Main server file</li>
  <li>package.json</li>
  <li>README.md</li>
</ul>
```
---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-crud-rest-api.git

    ```
   ```bash
   cd user-crud-rest-api
   ```
  
Install dependencies:

```bash
npm install
```
Start the server:
```bash
npm start
```

The server will run at http://localhost:8080.

🛠️ API Endpoints
Method	Endpoint	Description

GET	    /users	    Get all users

GET	    /users/:id	Get a user by ID

POST	/users/add	Add a new user

PATCH	/users/update/:id	Update a user by ID

DELETE	/users/delete/:id	Delete a user by ID


📥 Sample POST Body

```json
{
  "id": 101,
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "gender": "Male",
  "job_title": "Developer"
}

```

📌 Note


The data is stored in MOCK_DATA.json, is working as a local database.

This is intended for learning and small projects, not for production use , i created this json file through https://mockaroo.com


🧑‍💻 Author
Anwar Hussain
