const NAVBAR = {
    NAV_NAVBAR: 'nav.navbar',
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGIN_BUTTON:'a[href="/login"]',
    REGISTER_BUTTON: 'a[href="/register"]',
}

const LOGIN_FORM = {
    LOGIN_FORM: '#login-form',
    EMAIL: 'input[id="email"]',
    PASSWORD: 'input[id="password"]',
    LOGIN_BUTTON: '#login-form input[type="submit"]'
}

const REGISTER_FORM = {
    REGISTER_FORM: '#register-form',
    EMAIL: 'input[id="email"]',
    PASSWORD: 'input[id="password"]',
    REPEAT_PASSWORD: 'input[id="repeat-pass"]',
    REGISTER_BUTTON: '#register-form input[type="submit"]'
}

const CREATE_FORM = {
    TITLE: 'input[id="title"]',
    DESCRIPTION: 'textarea[id="description"]',
    IMAGE_URL: 'input[id="image"]',
    TYPE: '#type',
    ADD_BUTTON: '#create-form input[type="submit"]',
}

const ALL_BOOKS_LIST = '//li[@class="otherBooks"]';

const DETAILS_BUTTONS = '//a[text()="Details"]';

const DETAILS_DESCRIPTION = '//h3[text()="Description:"]';

const LOGGED_NAVBAR = {
    USER_EMAIL: '//span[text()="Welcome, peter@abv.bg"]',
    MY_BOOKS: 'a[href="/profile"]',
    ADD_BOOK: 'a[href="/create"]',
    LOGOUT_BUTTON: 'a[id="logoutBtn"]',

}
export {
    NAVBAR,
    LOGIN_FORM,
    LOGGED_NAVBAR,
    REGISTER_FORM,
    CREATE_FORM,
    ALL_BOOKS_LIST,
    DETAILS_BUTTONS,
    DETAILS_DESCRIPTION
    }