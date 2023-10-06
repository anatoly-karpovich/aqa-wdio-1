import path from "path";

describe("File upload tests", () => {
  before(async () => {
    const url = "http://the-internet.herokuapp.com/upload";
    await browser.maximizeWindow();
    await browser.url(url);
  });

  it("Successfully uploaded", async () => {
    //get path for file localy
    const dirpath = path.resolve();
    const filepath = path.join(dirpath, "src/data/logo-webdriver-io.png");

    //upload to selenium
    const remoteFilePath = await browser.uploadFile(filepath);

    //set file path to input
    // await browser.execute(`
    //   const input = document.querySelector('#file-upload');
    //   input.style.display = 'none';
    //   `);

    (await $("#file-upload")).setValue(remoteFilePath);
    await browser.waitUntil(async () => {
      const text = await $("#file-upload").getValue();
      return text !== "";
    });
    (await $("#file-submit")).click();
    const resultElement = await $("h3");
    await browser.waitUntil(async () => {
      const text = await resultElement.getText();
      return text === "File Uploaded!";
    });
    await browser.pause(5000);
  });
});
