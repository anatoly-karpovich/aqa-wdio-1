class DropdownPage {
    get ["Dropdown page title"]() {
        return "div > h3";
    }

    get ["Dropdown"]() {
        return "select#dropdown";
    }

    get ["Dropdown list"]() {
        return "select#dropdown > option";
    }

    get ["Dropdown selected option"]() {
        return "select#dropdown > option[selected='selected']";
    }

    get ["Dropdown Option 1"]() {
        return "select#dropdown > option[value='1']";
    }

    get ["Dropdown Option 2"]() {
        return "select#dropdown > option[value='2']";
    }
}

export default new DropdownPage();