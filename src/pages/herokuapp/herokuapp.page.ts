class MainPageHerokuapp {
    get ["Main page title"]() {
        return "h1.heading";
    }

    get ["Dropdown page link"]() {
        return "li > a[href='/dropdown']";
    }
}

export default new MainPageHerokuapp();