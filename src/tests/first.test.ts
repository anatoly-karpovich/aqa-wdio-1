describe("Login page tests", () => {
    //TODO: ВЫНЕСЛИ В КОНСТАНТЫ НА УРОВЕНЬ ДЕСКРАЙБА ВСЕ БОЛЕЕ ОДНОГО РАЗА ИСПОЛЬЗУЕМЫЕ СЕЛЕКТОРЫ!

    const url = "http://the-internet.herokuapp.com/";
    const validUsername = "tomsmith";
    const validPassword = "SuperSecretPassword!";
    const errorMessageSelector = "div#flash";
    const succesAlert = "div#flash.success";
    const loginButton = `button[type="submit"]`;
    const logoutButton = `div.example > a.button.secondary.radius`;
    const loginPageTitle = `//h2[text()="Login Page"]`;
    const securePageTitle = `//h2[text()[normalize-space()='Secure Area']]`;
    before(async () => {
        await browser.maximizeWindow();
    });

    beforeEach(async () => {
        await browser.url(url);
    });
    context("Positive scenarions", () => {
        it("Should login with valid data", async () => {
            /*
          - Открыть сайт
          - Перейти на страницу авторизации
          - Ввести логин
          - Ввести пароль
          - Кликнуть логин
          */

            await $(`h1.heading`).waitForDisplayed({
                timeout: 5000,
                timeoutMsg: `Home page not opened after 5 seconds`,
                reverse: false
            });
            await $(`a[href="/login"]`).click();
            await $(`//h2[text()="Login Page"]`).waitForDisplayed({
                timeout: 5000,
                timeoutMsg: `Login page not opened after 5 seconds`,
                reverse: false
            });
            await $("#username").setValue(validUsername);
            await $(`//input[@id="password"]`).setValue(validPassword);
            $(`button.radius`).click();
            const currentUrlOfSecretPage = (await browser.getUrl()).split(url)[1];
            expect(currentUrlOfSecretPage).toBe("login");

            const title = await $(`//h2[text()[normalize-space()='Secure Area']]`).getText();
            expect(title).toBe("Secure Area");
        });
    });

    context("Negative Scenarions", () => {
        it("Should NOT login with invalid username", async () => {
            const invalidUsername = validUsername + "23";
            await $(`h1.heading`).waitForDisplayed({
                timeout: 5000,
                timeoutMsg: `Home page not opened after 5 seconds`,
                reverse: false
            });
            await $(`a[href="/login"]`).click();
            await $(`//h2[text()="Login Page"]`).waitForDisplayed({
                timeout: 5000,
                timeoutMsg: `Login page not opened after 5 seconds`,
                reverse: false
            });
            await $("#username").setValue(invalidUsername);
            await $(`//input[@id="password"]`).setValue(validPassword);
            $(`button.radius`).click();
            const currentUrlOfSecretPage = (await browser.getUrl()).split(url)[1];
            expect(currentUrlOfSecretPage).toBe("login");

            const title = await $("h2").getText();
            expect(title).toBe("Login Page");

            const errorMessage = await $(errorMessageSelector).getText();
            expect(errorMessage).toBe("Your username is invalid!\n×");
        });

        it("Should NOT login with invalid password", async () => {
            const invalidPassword = validPassword + "23";
            await $(`h1.heading`).waitForDisplayed({
                timeout: 5000,
                timeoutMsg: `Home page not opened after 5 seconds`,
                reverse: false
            });
            await $(`a[href="/login"]`).click();
            await $(`//h2[text()="Login Page"]`).waitForDisplayed({
                timeout: 5000,
                timeoutMsg: `Login page not opened after 5 seconds`,
                reverse: false
            });
            await $("#username").setValue(validUsername);
            await $(`//input[@id="password"]`).setValue(invalidPassword);
            $(`button.radius`).click();
            const currentUrlOfSecretPage = (await browser.getUrl()).split(url)[1];
            expect(currentUrlOfSecretPage).toBe("login");

            const title = await $("h2").getText();
            expect(title).toBe("Login Page");

            const errorMessage = await $(errorMessageSelector).getText();
            expect(errorMessage).toBe("Your password is invalid!\n×");
        });
    });

    //TODO: Сделать из этого теста ПОЛНОЦЕННЫЙ e2e тест, ищущий ссылку из массива по тексту
    /*
    - поиск линки по тексту
    - клик
    - валидный логин
    - проверка страницы
    - логаут
    - проверка страницы куда вернулись
    */
    it.only("e2e test", async () => {
        let linkToAuthorizationPage
        const links = await $$("ul a");
        for (const link of links) {
            if (await link.getText() === "Form Authentication") {
                linkToAuthorizationPage = link;
                break;
            }
        }
        await linkToAuthorizationPage?.click();

        await $(loginPageTitle).waitForDisplayed({
            timeout: 5000,
            timeoutMsg: `Login page not opened after 5 seconds`,
            reverse: false
        });
        await $("#username").setValue(validUsername);
        await $(`//input[@id="password"]`).setValue(validPassword);
        await $(loginButton).click();
        await $(succesAlert).waitForDisplayed({
            timeout: 5000,
            timeoutMsg: `Success alert not displayed after 5 seconds`,
            reverse: false
        });

        const currentUrlOfSecurePage = (await browser.getUrl()).split(url)[1];
        expect(currentUrlOfSecurePage).toBe("secure");

        const titleOfSecurePage = await $(securePageTitle).getText();
        expect(titleOfSecurePage).toBe("Secure Area");

        await $(logoutButton).click();

        const currentUrlOfLoginPage = (await browser.getUrl()).split(url)[1];
        expect(currentUrlOfLoginPage).toBe("login");

        await $(loginPageTitle).waitForDisplayed({
            timeout: 5000,
            timeoutMsg: `Login page not opened after 5 seconds`,
            reverse: false
        });

        const titleOfLoginPage = await $(loginPageTitle).getText();
        expect(titleOfLoginPage).toBe("Login Page");
    });
});
