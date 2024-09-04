
describe('Testing wait commands...', () => {

    beforeEach(async () => {
        await browser.maximizeWindow();
        
    });


    it('Test setting wait time manually', async() => {

        await browser.url("/Ajax-Loader/index.html");

        const clickMeButton = await $("//*[text()='CLICK ME!']/..");
        await browser.pause(5000);
        await clickMeButton.click();
        await browser.pause(3000);
        
    });

    it ('Test waiting for clickable', async() => {
        
        await browser.url("/Ajax-Loader/index.html");

        const clickMeButton = await $('#button1');
        await clickMeButton.waitForClickable({timeout: 6000});
        await clickMeButton.click();
        await browser.pause(1500);
    });

    it ('Test waitig for displayed',async () => {
        
        await browser.url("/Ajax-Loader/index.html");

        const clickMeButton = await $('#button1');
        await clickMeButton.waitForDisplayed({timeout:6000});
        console.log("<<<------------THE ELEMENT WAS DISPLAYED---------------->>>")
        await browser.pause(3000);
    });

    it('Test for wait for existing', async () => {
        
        await browser.url("/Ajax-Loader/index.html");
        const clickMeButton = await $('#button1');
        await clickMeButton.waitForExist({timeout: 6000});

    });

    it.only('Test for wait for waitUntil', async() => {
        
        await browser.url("/Accordion/index.html");
        const loadedAlert = await $('#text-appear-box')
        await loadedAlert.waitUntil(async function (){

            return (await this.getText()) === 'LOADING COMPLETE.'
        }, 
        {
            timeout: 15000,
            timeoutMsg:'Expected text to be different after 15 sec...'
        });
        
    });



    
});