describe("Iframe tests", () => {
  before(async () => {
    await browser.maximizeWindow();
    await browser.url("https://the-internet.herokuapp.com/iframe");
  });

  it("Type text to iframe input", async () => {
    //to iFrame
    const iFrame = await $("#mce_0_ifr");
    await browser.switchToFrame(iFrame);
    const textInput = await $('//body[@id="tinymce"]/p');
    await textInput.setValue("my custom text");

    //back to page
    await browser.switchToParentFrame();
    const title = await $("div.example h3");
    const text = await title.getText();
    expect(text).toEqual("An iFrame containing the TinyMCE WYSIWYG Editor");
  });
});
