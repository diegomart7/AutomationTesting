describe('Locating elements', () => {
    beforeEach(async ()=> {
        await browser.maximizeWindow();
        await browser.url("https://selectors.webdriveruniversity.com/")
    });

    it('$ - locate element', async() => {
        
        await browser.$("//a[@href='#portfolio']").click();
        await browser.pause(3000);

        const webdriverioButton = await $('[data-target="#portfolioModal1"]')
        await webdriverioButton.click();
        await browser.pause(3000);
    });

    it.only('Locate more than one element', async() => {

        const titleArray = [];
        const tableHeaders = await $$('//table//th');
        for (const title of tableHeaders){
            titleArray.push(await title.getText())
        };
        console.log (titleArray);
        
    });
    
});