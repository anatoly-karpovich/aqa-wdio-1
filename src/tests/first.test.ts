describe("Login page tests", () => {
  //TODO: ВЫНЕСЛИ В КОНСТАНТЫ НА УРОВЕНЬ ДЕСКРАЙБА ВСЕ БОЛЕЕ ОДНОГО РАЗА ИСПОЛЬЗУЕМЫЕ СЕЛЕКТОРЫ!

  const url = "http://the-internet.herokuapp.com/";
  const validUsername = "tomsmith";
  const validPassword = "SuperSecretPassword!";
  const errorMessageSelector = "div#flash";
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

      await $(`h1.heading`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Home page not opened after 5 seconds`, reverse: false });
      await $(`a[href="/login"]`).click();
      await $(`//h2[text()="Login Page"]`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Login page not opened after 5 seconds`, reverse: false });
      await $("#username").setValue(validUsername);
      await $(`//input[@id="password"]`).setValue(validPassword);
      $(`button.radius`).click();
      const currentUrlOfSecretPage = (await browser.getUrl()).split(url)[1];
      expect(currentUrlOfSecretPage).toBe("login");

      const title = await $(`//h2[text()[normalize-space()='Secure Area']]`).getText();
      expect(title).toBe("Secure Area");

      // const linkToAuthenticationPage = await $(`a[href="/login"]`);
      // await linkToAuthenticationPage.click();
      // const username = await $("#username");
      // const password = await $(`//input[@id="password"]`);

      // await username.setValue(validUsername);
      // await username.addValue(validUsername);
      // await username.clearValue();
      // await password.setValue(validPassword);

      // const loginButton = $(`button.radius`);
      // await loginButton.click();

      // const secretPageTitle = await $(`//h2[text()[normalize-space()='Secure Area']]`);
    });
  });

  context("Negative Scenarions", () => {
    it("Should NOT login with invalid username", async () => {
      const invalidUsername = validUsername + "23";
      await $(`h1.heading`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Home page not opened after 5 seconds`, reverse: false });
      await $(`a[href="/login"]`).click();
      await $(`//h2[text()="Login Page"]`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Login page not opened after 5 seconds`, reverse: false });
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
      await $(`h1.heading`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Home page not opened after 5 seconds`, reverse: false });
      await $(`a[href="/login"]`).click();
      await $(`//h2[text()="Login Page"]`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Login page not opened after 5 seconds`, reverse: false });
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
  it.only("fgdhgd", async () => {
    const links = await $$("ul a");
    // for (const link of links) {
    //   const text = await link.getText();
    //   console.log(text);
    // }
    // links.forEach(async (link) => console.log(await link.getText()));
    // const linksTextArray = await Promise.all(links.map(async (link) => await link.getText()));
    // console.log(linksTextArray);
    const linkToAuthorizationPage = links.find(async (link) => {
      const text = await link.getText();
      console.log(text);
      return text === "Form Authentication";
    });
    console.log(await linkToAuthorizationPage?.getText());
    await linkToAuthorizationPage?.click();
  });
});
