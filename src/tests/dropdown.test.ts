import {URLS} from "../endpoints";
import DropdownPage from "../pages/herokuapp/dropdown.page";
import MainPageHerokuapp from "../pages/herokuapp/herokuapp.page";

describe("Dropdown test", () => {
    before("Prepare to test", async () => {
        await browser.maximizeWindow();
        await browser.url(URLS.baseHerokuapp);
        await $(MainPageHerokuapp["Main page title"]).waitForDisplayed({
            timeout: 5000,
            timeoutMsg: `Home page not opened after 5 seconds`,
            reverse: false
        });
    });

    it("Should be displayed default option", async () => {
        await $(MainPageHerokuapp["Dropdown page link"]).click();
        await $(DropdownPage["Dropdown page title"]).waitForDisplayed({
            timeout: 5000,
            timeoutMsg: "Dropdown page not opened after 5 seconds",
            reverse: false
        });

        await $(DropdownPage["Dropdown"]).isDisplayed();
        const defaultOption = await $(DropdownPage["Dropdown selected option"]).getText();
        expect(defaultOption).toBe("Please select an option")
    });

    it("Should select 'option 1'", async () => {
        await $(DropdownPage["Dropdown"]).click();
        await $(DropdownPage["Dropdown Option 1"]).isDisplayed();
        await $(DropdownPage["Dropdown Option 1"]).isClickable();
        await $(DropdownPage["Dropdown Option 1"]).click();
        const selectedOption = await $(DropdownPage["Dropdown selected option"]).getText();
        expect(selectedOption).toBe("Option 1");
    });
    it("Should select 'option 2'", async () => {
        await $(DropdownPage["Dropdown"]).click();
        await $(DropdownPage["Dropdown Option 2"]).isDisplayed();
        await $(DropdownPage["Dropdown Option 2"]).isClickable();
        await $(DropdownPage["Dropdown Option 2"]).click();
        const selectedOption = await $(DropdownPage["Dropdown selected option"]).getText();
        expect(selectedOption).toBe("Option 2");
    });
});