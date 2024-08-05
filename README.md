# Exercise: Playwright

Problems for exercises and homework for the "Front-End Test Automation" module @ SoftUni

---

## I. Writing Web UI Tests

You are given a Web application (SPA) using JavaScript. The application dynamically displays content based on user interaction and supports user profiles and CRUD operations using a REST service.

### 1. Application Specifications

#### Navigation Bar
- **Guests (un-authenticated visitors)** can see the links to the All Books, as well as the links to the Login and Register pages.
- **Logged-in users** see links to All Books page, My Books page, Add Book page, Welcome, {user's email address}, and a link for the Logout action.

#### User navigation example:
- ![User Navigation Example](path/to/user-navigation-example.png)

#### Guest navigation example:
- ![Guest Navigation Example](path/to/guest-navigation-example.png)

#### Login User
The included REST service comes with the following premade user accounts for development:
- `{ "email": "peter@abv.bg", "password": "123456" }`
- `{ "email": "john@abv.bg", "password": "123456" }`

The Login page contains a form for existing user authentication. By providing an email and password, the app logs a user into the system if there are no empty fields.

#### Login Request
- **Method**: POST
- **URL**: /users/login
- **Body**:
    ```json
    {
      "email": "peter@abv.bg",
      "password": "123456"
    }
    ```
Upon success, the REST service returns an object with an automatically generated `_id` and a property `accessToken`, which contains the session token for the user. This information is stored using `sessionStorage` or `localStorage` for authenticated requests. Successful login redirects the user to the All Books/Dashboard page. If there is an error or the validations don't pass, it displays an error message using `window.alert`.

#### Register User
The app registers a new user in the system by providing an email and password. All fields are required; if any field is empty, the app displays an error.

#### Register Request
- **Method**: POST
- **URL**: /users/register
- **Body**:
    ```json
    {
      "email": "peter@abv.bg",
      "password": "123456"
    }
    ```
Upon success, the REST service returns an object with an automatically generated `_id` and a property `accessToken`. Successful registration redirects the user to the All Books/Dashboard page. If there is an error or the validations don't pass, it displays an error message using `window.alert`.

#### Logout
Available to logged-in users. Successful logout redirects the user to the All Books/Dashboard page.

#### Logout Request
- **Method**: GET
- **URL**: /users/logout

#### Add Book
The Add Book page is available to logged-in users and contains a form for adding a new book. Checks if all fields are filled before sending the request.

#### Add Book Request
- **Method**: POST
- **URL**: /data/books
- **Body**:
    ```json
    {
      "title": "Book Title",
      "description": "Book Description",
      "imageUrl": "http://example.com/book.jpg",
      "type": "Fiction"
    }
    ```
Upon success, the service returns the newly created record and redirects the user to the All Books/Dashboard page.

#### All Books
This page displays a list of all books in the system. Clicking on the details button leads to the details page for the selected book. Visible to guests and logged-in users.

#### Get All Books Request
- **Method**: GET
- **URL**: /data/books?sortBy=_createdOn%20desc

#### Book Details
All users can view details about books. If the currently logged-in user is the creator, the [Edit] and [Delete] buttons are displayed; otherwise, they are not available.

#### Get Book Details Request
- **Method**: GET
- **URL**: /data/books/:id

#### Edit Book
Available to logged-in users, allowing authors to edit their own books. Checks if all fields are filled before sending the request.

#### Edit Book Request
- **Method**: PUT
- **URL**: /data/books/:id
- **Body**:
    ```json
    {
      "title": "Updated Book Title",
      "description": "Updated Book Description",
      "imageUrl": "http://example.com/updated-book.jpg",
      "type": "Fiction"
    }
    ```
Upon success, the service returns the modified record and redirects the user to the Details page for the current book.

#### Delete Book
Available to logged-in users for books they have created. A confirmation dialog is displayed before deleting the book. Upon confirmation, the book is deleted from the system, and the user is redirected to the All Books/Dashboard page.

#### Delete Book Request
- **Method**: DELETE
- **URL**: /data/books/:id

#### My Books
Logged-in users can view their own books by clicking [My Books]. Lists all books added by the current user.

#### Get My Books Request
- **Method**: GET
- **URL**: /data/books?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc

#### Like a Book
Logged-in users can like other books but not their own. Clicking on the [Like] button increases the book's counter by 1.

#### Add Like Request
- **Method**: POST
- **URL**: /data/likes
- **Body**:
    ```json
    {
      "bookId": "desired-book-id"
    }
    ```

#### Get Total Likes Count Request
- **Method**: GET
- **URL**: /data/likes?where=bookId%3D%22{bookId}%22&distinct=_ownerId&count

#### Get User Like Request
- **Method**: GET
- **URL**: /data/likes?where=bookId%3D%22{bookId}%22%20and%20_ownerId%3D%22{userId}%22&count

---

## II. Preparing the Environment

To initialize the SPA, execute the following commands in the Visual Studio Code terminal:

```bash
npm install
