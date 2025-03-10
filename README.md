# UI Testing with Playwright

[![JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chromium](https://img.shields.io/badge/tested%20on-Chromium-4285F4.svg)](https://www.chromium.org/)
[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-6E40C9.svg)](https://playwright.dev/)

### This is a test project for Front-End Technologies May 2024 Course @ SoftUni

---

## Writing Web UI Tests

The **"Book Library"** web application is a Single Page Application (SPA) built with JavaScript. It dynamically updates its content based on user interactions and supports user profiles along with CRUD operations through a RESTful service.

## Application Features

### Navigation Bar
- **Guests (un-authenticated users)** can access links to All Books, Login, and Register pages.
- **Authenticated** users can see links to All Books, My Books, Add Book, a welcome message with the user's email, and a Logout link.

### Login API Call
The provided REST service includes pre-configured user accounts for testing purposes. The Login page features a form for authenticating existing users by entering an email and password. The app checks for empty fields before attempting to log in. If the login is successful, the REST service returns an object with a generated `_id` and an `accessToken` for the session. This token is saved in `sessionStorage` to authorize subsequent requests. Upon success, the user is redirected to the All Books/Dashboard page. If there’s an error or validation fails, an alert displays an error message.

### Register API Call
New users can register by providing an email and password. All fields must be filled, or an error is shown. A successful registration returns an object with a generated `_id` and an `accessToken`. After registering, users are redirected to the All Books/Dashboard page. Errors or validation failures trigger an error alert.

### Logout Functionality
Available to authenticated users. Logging out redirects the user to the All Books/Dashboard page.

### Add Book API Call
Logged-in users can access the Add Book page, which includes a form for creating a new book. The app checks that all fields are filled before submission. A successful addition returns the new book record and redirects the user to the All Books/Dashboard page.

### All Books
This page displays a list of all books in the system. Clicking on the details button leads to the details page for the selected book. Visible to guests and logged-in users.

### Fetching All Books API Call
The All Books page lists all books in the system. Both guests and logged-in users can access this page. Selecting a book takes the user to its details page.

### Fetching Book Details API Call
All users can view detailed information about each book. Logged-in users who own the book see options to edit or delete it.

### Editing a Book
This feature allows logged-in users to edit their books. The app checks that all fields are filled before submission. A successful edit returns the updated book and redirects the user to its details page.

### Delete Book API Call
Logged-in users can delete books they own. A confirmation prompt appears before deletion. Upon confirmation, the book is removed from the system, and the user is redirected to the All Books/Dashboard page.

### Fetching My Books API Call
Authenticated users can view a list of books they’ve added by clicking `[My Books]`.
- Method: GET
- Endpoint: `/data/books?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc`

### Add Like API Call
Authenticated users can like other users' books, but not their own. Clicking `[Like]` increases the book's like count by 1.

### Fetching Total Likes API Call
- **Method**: GET
- **URL**: `/data/likes?where=bookId%3D%22{bookId}%22&distinct=_ownerId&count`

### Checking User's Likes API Call
- **Method**: GET
- **URL**: `/data/likes?where=bookId%3D%22{bookId}%22%20and%20_ownerId%3D%22{userId}%22&count`

---

## Preparing the Environment
To initialize the SPA, run the following commands in the terminal within Visual Studio Code:

```bash
npm install
```
This command installs the Playwright framework and http-server.

- Start the server by running:
  
```bash
npm run start
```
- This should open the app's homepage in a web browser.
- Then, open a separate terminal and execute:
  
```bash
npm run server
```
- Create a new folder named `tests`, and within it, create a file named `ui.test.js`. This file will contain the UI tests, written using Playwright and `@playwright/test`.
  
### Running Playwright Tests

To execute the Playwright tests, open a new terminal in Visual Studio Code and run:
```bash
npm run test
```

### License
This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

### Contact
For any questions or suggestions, please open an issue in the repository.

---
### Happy Testing! 🚀
