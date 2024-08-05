const BASE_URL = 'http://localhost:3001';

const TEST_URL = {
    TEST_HOME_URL: BASE_URL + '/',
    TEST_LOGIN_URL: BASE_URL + '/login',
    TEST_REGISTER_URL: BASE_URL + '/register',
    TEST_CATALOG_URL: BASE_URL + '/catalog',
    TEST_CREATE_URL: BASE_URL + '/create',
}

const TEST_USER = {

    EMAIL: 'peter@abv.bg',
    PASSWORD: '123456',
}

const NEW_USER = {
    EMAIL: 'stef88@test.bg',
    PASSWORD: '123456'
}

const TEST_BOOK = {
    TITLE: 'Test Book',
    DESCRIPTION: 'Test Description',
    IMAGE_URL: 'https://www.test.com/image.png',
    TYPE_OPTIONS: {
        FICTION: 'Fiction',
        ROMANCE: 'Romance',
        MYSTERY: 'Mystery',
        CLASSIC: 'Classic',
        OTHER: 'Other'
    }
}

const ALERT = {
ALERT_MESSAGE: 'All fields are required!',
}

export { 
    BASE_URL,
    TEST_URL,
    TEST_USER,
    NEW_USER,
    ALERT,
    TEST_BOOK
}