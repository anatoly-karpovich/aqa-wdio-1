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
  it("fgdhgd", async () => {
    const links = await $$("ul a");
    let resultLink;
    for (const link of links) {
      const text = await link.getText();
      if (text === "Form Authentication") {
        resultLink = link;
        break;
      }
    }
    await resultLink?.click();
    await browser.pause(5000);
  });

  it("wait", async () => {
    await browser.url("https://the-internet.herokuapp.com/dynamic_loading");
    await $("h3").waitForDisplayed();
    await $(`a[href="/dynamic_loading/1"]`).click();
    const btn = $("div#start > button");
    await btn.waitForDisplayed({ timeout: 5000 });
    await btn.click();
    // await $("#loading").waitForDisplayed({ reverse: true, timeout: 10000, interval: 200 });
    // const finish = await $("div#finish");
    // await finish.waitForDisplayed();
    // expect(await finish.isDisplayed()).toBe(true);

    await browser.waitUntil(
      async () => {
        const finish = await $("div#finish h4");
        const text = await finish.getText();
        const isDisplayed = await finish.isDisplayed();
        const isEnabled = await finish.isEnabled();
        return isDisplayed && text === "Hello World!" && isEnabled;
      },
      {
        timeout: 8000,
        timeoutMsg: "Finish element is not displayed or message is incorrenct",
      }
    );

    /*
    Pooling - повторяющийся опрос определенного ресурса на предмет определенных данных с определенными интервалами
    Interval - время между опросами 
    Timeout - максимальное время проведения pooling-а
    */

    /*
    Auto-wait conditions:
    - Existence: WebDriverIO ожидает существования элемента в DOM.
    - Visibility: он ожидает, пока элемент станет видимым (не будет скрыт CSS или скрыт другими элементами).
    - Interactability: он ожидает, пока элемент станет интерактивным, то есть он не отключен и не закрыт другими элементами.
    */
  });

  it.only("Chaining", async () => {
    await $(`h1.heading`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Home page not opened after 5 seconds`, reverse: false });
    await $(`a[href="/login"]`).click();
    await $(`//h2[text()="Login Page"]`).waitForDisplayed({ timeout: 5000, timeoutMsg: `Login page not opened after 5 seconds`, reverse: false });
    const form = await $('form[name="login"]');
    await form.$("#username").setValue("tomsmith");
    await form.$("#password").setValue("SuperSecretPassword!");
    const formMethod = await form.getAttribute("method");
    expect(formMethod).toBe("post");
  });
});
