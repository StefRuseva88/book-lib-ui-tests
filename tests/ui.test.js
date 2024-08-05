
import {test, expect} from '@playwright/test';
import { LOGIN_FORM, NAVBAR, LOGGED_NAVBAR, REGISTER_FORM, CREATE_FORM, ALL_BOOKS_LIST, DETAILS_BUTTONS, DETAILS_DESCRIPTION } from '../utilities.js/locators.js';
import { BASE_URL, TEST_USER, TEST_URL, ALERT, NEW_USER, TEST_BOOK } from '../utilities.js/constants.js';

//navigation bar tests

test('Verify "All books" link is visible - example 1', async ({page}) => {
    await page.goto('http://localhost:3001');

    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBeTruthy();
});

test('Verify "All books" link is visible - example 2', async ({page}) => {
    await page.goto(BASE_URL);

   await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
   await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
});

test('Verify "Login" button is visible', async ({page}) => {
    await page.goto(BASE_URL);

   await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
   await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
});

test('Verify "Register" button is visible', async ({page}) => {
    await page.goto(BASE_URL);

   await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
   await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
});

test('Verify "All books" link is visible after user login', async ({page}) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();

    await page.locator(NAVBAR.LOGIN_BUTTON).click();

    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(); 

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

});

test('Verify user email is visible after user login', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
        await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(); 

        await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

        await expect(page.locator(LOGGED_NAVBAR.USER_EMAIL)).toBeVisible();
        await expect(page.locator(LOGGED_NAVBAR.MY_BOOKS)).toBeVisible();
        await expect(page.locator(LOGGED_NAVBAR.ADD_BOOK)).toBeVisible();
});

//login page tests

test('Login with valid credentials', async ({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(); 

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Login with empty imput fields', async ({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

test('Login with empty email field', async ({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

test('Login with empty password field', async ({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

//register page tests

test('Submit the registration form with valid data', async ({page}) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.PASSWORD).fill(NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click(); 

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Submit the registration form with empty fields', async ({page}) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click(); 

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Submit the registration form with empty email field', async ({page}) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.PASSWORD).fill(NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click(); 

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Submit the registration form with empty password field', async ({page}) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click(); 

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Submit the registration form with empty repeat password field', async ({page}) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.PASSWORD).fill(NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click(); 

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

 test('Submit the registration form with different passwords', async ({page}) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.PASSWORD).fill(NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill('1234567');
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click(); 

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords dont match!');
        await dialog.accept();
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
 });

 //add book page tests

    test('Add book with valid data', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

        await Promise.all([ //wait for all promises to resolve
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
        ]); 

        await page.locator(LOGGED_NAVBAR.ADD_BOOK).click();
        await page.locator(CREATE_FORM.TITLE).fill(TEST_BOOK.TITLE);
        await page.locator(CREATE_FORM.DESCRIPTION).fill(TEST_BOOK.DESCRIPTION);
        await page.locator(CREATE_FORM.IMAGE_URL).fill(TEST_BOOK.IMAGE_URL);
        await page.locator(CREATE_FORM.TYPE).selectOption(TEST_BOOK.TYPE_OPTIONS.FICTION);
        await page.locator(CREATE_FORM.ADD_BUTTON).click(); 

        await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
    });

    test('Add book with empty fields', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

        await Promise.all([ //wait for all promises to resolve
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
        ]); 

        await page.locator(LOGGED_NAVBAR.ADD_BOOK).click();
        await page.locator(CREATE_FORM.ADD_BUTTON).click(); 

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
            await dialog.accept();
        });

        await page.waitForURL(TEST_URL.TEST_CREATE_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
    });

    test('Add book with empty title field', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

        await Promise.all([ //wait for all promises to resolve
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
        ]); 

        await page.locator(LOGGED_NAVBAR.ADD_BOOK).click();
        await page.locator(CREATE_FORM.DESCRIPTION).fill(TEST_BOOK.DESCRIPTION);
        await page.locator(CREATE_FORM.IMAGE_URL).fill(TEST_BOOK.IMAGE_URL);
        await page.locator(CREATE_FORM.TYPE).selectOption(TEST_BOOK.TYPE_OPTIONS.FICTION);
        await page.locator(CREATE_FORM.ADD_BUTTON).click(); 

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
            await dialog.accept();
        });

        await page.waitForURL(TEST_URL.TEST_CREATE_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
    });

    test('Add book with empty description field', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

        await Promise.all([ //wait for all promises to resolve
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
        ]); 

        await page.locator(LOGGED_NAVBAR.ADD_BOOK).click();
        await page.locator(CREATE_FORM.TITLE).fill(TEST_BOOK.TITLE);
        await page.locator(CREATE_FORM.IMAGE_URL).fill(TEST_BOOK.IMAGE_URL);
        await page.locator(CREATE_FORM.TYPE).selectOption(TEST_BOOK.TYPE_OPTIONS.FICTION);
        await page.locator(CREATE_FORM.ADD_BUTTON).click(); 

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
            await dialog.accept();
        });

        await page.waitForURL(TEST_URL.TEST_CREATE_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
    });

    test('Add book with empty image field', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

        await Promise.all([ //wait for all promises to resolve
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
        ]); 

        await page.locator(LOGGED_NAVBAR.ADD_BOOK).click();
        await page.locator(CREATE_FORM.TITLE).fill(TEST_BOOK.TITLE);
        await page.locator(CREATE_FORM.DESCRIPTION).fill(TEST_BOOK.DESCRIPTION);
        await page.locator(CREATE_FORM.TYPE).selectOption(TEST_BOOK.TYPE_OPTIONS.FICTION);
        await page.locator(CREATE_FORM.ADD_BUTTON).click(); 

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
            await dialog.accept();
        });

        await page.waitForURL(TEST_URL.TEST_CREATE_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
    });

    //all books page tests

    test('Login and verify that all books are displayed', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

        await Promise.all([ //wait for all promises to resolve
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
        ]);

        await page.waitForSelector(ALL_BOOKS_LIST);
        const books = await page.$$(ALL_BOOKS_LIST);
        expect(books.length).toBeGreaterThan(0);
    });

    //details page tests

    test('Verify that all books details are displayed', async ({page}) => {
        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

        await Promise.all([ //wait for all promises to resolve
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
        ]);

        await page.locator(DETAILS_BUTTONS).first().click();
        await page.waitForSelector(DETAILS_DESCRIPTION);
    }); 

    //logout page tests

    test('Verify that Logout button is visible after login', async ({page}) => { //run after all tests are done

        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
        await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(); 

        await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

        await expect(page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON)).toBeVisible();
    }); 

    test('Verify that Logout button is not visible after logout', async ({page}) => { //run after all tests are done

        await page.goto(TEST_URL.TEST_LOGIN_URL);

        await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
        await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
        await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(); 

        await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
        expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

        await page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON).click();
        await page.waitForURL(TEST_URL.TEST_HOME_URL);
        expect(page.url()).toBe(TEST_URL.TEST_HOME_URL);

        await expect(page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON)).not.toBeVisible();
    });

    test('Verify that Logout button redirects correctly after login', async ({page}) => {
            
            await page.goto(TEST_URL.TEST_LOGIN_URL);
    
            await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
            await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
            await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(); 
    
            await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
            expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
    
            await page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON).click();
            await page.waitForURL(TEST_URL.TEST_HOME_URL);
            expect(page.url()).toBe(TEST_URL.TEST_HOME_URL);

     }); 

