describe('Advanced elements interactions tests', () => {

beforeEach(async () => {
    await browser.maximizeWindow();
});

    it('Inputs tests', async () => {
        await browser.url('/Contact-Us/contactus.html');

        //select the input field using a selector, add a value, then clear a value amnd add a different value.
        const firstName = $('//*[@name="first_name"]');
        await firstName.addValue("Diego MArt");
        await firstName.clearValue();
        await firstName.addValue("Alberto Rodriguez");
        //it would be faste using the setUpValue method (it clears tha actual value and replaces it)
        
    });


    it('Drop-downs tests', async () => {

        await browser.url('/Dropdown-Checkboxes-RadioButtons/index.html')
        // dropdown menu selectors
        const firstDropDown = $('#dropdowm-menu-1');
        const secondDropDown = $('#dropdowm-menu-2');
        const thirdDropDown = $('#dropdowm-menu-3');
        const checkBoxTwo = $('//*[@value="option-2"]');
        const checkBoxThree = $('//*[@value="option-3"]');
        const radioButtonYellow = $('//*[@value="yellow"]');
        const radioButtonLettuce = $('//*[@value="lettuce"]');
        
        // select value for the dropdown by value
        await firstDropDown.selectByAttribute('value','sql');
        // select value for the dropdown by index (position in the array)
        await (await secondDropDown).selectByIndex(3);
         // select values for the dropdown by visible text (the text like it appears in the page)
        await thirdDropDown.selectByVisibleText('JavaScript');
        // click the checkbox number 2 and click checkbox 3 "wich is already clicked so it will unselect it"
        await checkBoxTwo.click();
        await checkBoxThree.click();
        // click the radio button
        await radioButtonYellow.click();
        await radioButtonLettuce.click();
        
       

        // check that values match with the expected values
        await expect(firstDropDown).toHaveValue('sql');
        await expect(secondDropDown).toHaveValue('junit');
        await expect(thirdDropDown).toHaveValue('javascript');
        await expect(radioButtonYellow).toHaveValue('yellow');
        await expect(radioButtonLettuce).toHaveValue('lettuce');
        await browser.pause(1500);
    });

    it('State tests', async() => {
        
        //check some elements are displayed, enabled and clickable
        //check that the cabbage button is not clickable

    
        await browser.url('/Dropdown-Checkboxes-RadioButtons/index.html')

        //assigned selectors to the radio buttons
        const radioButtonLettuce = await $('//*[@value="lettuce"]');
        const radioButtonCabbage = await $('//*[@value="cabbage"]');
        //check button statuses
        const DisplayCheckLettuceButton = await radioButtonLettuce.isDisplayed();
        const ClickableCheckLettuceButton = await radioButtonLettuce.isClickable();
        const ClickableCheckCabbageButton = await radioButtonCabbage.isClickable();
        //check expected values
        await expect(DisplayCheckLettuceButton).toEqual(true);
        await expect(radioButtonLettuce).toBeEnabled();
        await expect(ClickableCheckLettuceButton).toEqual(true);
        await expect(ClickableCheckCabbageButton).toEqual(false);
    });

    it('Actions tests', async() => {

        await browser.url('/Actions/index.html');
        //drag and drop
        const draggableElement = await $('#draggable');
        const dropPoint = await $('#droppable');
        await draggableElement.dragAndDrop(dropPoint);
        await browser.pause(2000);
        //double click
        const doubleClickElement = await $('#double-click');
        await doubleClickElement.doubleClick();

        //hover over the button, wait for link1 to be clickable, then click on it
        const hoverButtonOne = await $("//button[text()='Hover Over Me First!']")
        const firstdroppableLink = await $('//button[text()="Hover Over Me First!"]');
        await hoverButtonOne.moveTo();
        await firstdroppableLink.waitForClickable();
        await firstdroppableLink.click();
        await browser.pause(2000);
        
    });

    it('Handling windows tests', async() => {

        //open the browser in the page we use in all tests
        //open a new window to automationteststore.com
        //check the title of the page matches
        //switch back to webdriveruniversity.com
        //chech the title of the page matches
        //click into the contact us button which opens a new window and check title is correct
        //go to automationstore.com and close the window and go back to webdriveruniversity.com

        await browser.url('/');
        await browser.newWindow('https://automationteststore.com/')
        let currentWindowTittle = await browser.getTitle();
        expect(currentWindowTittle).toEqual('A place to practice your automation skills!')

        await browser.switchWindow('webdriveruniversity.com/');
        let newWindowTittle = await browser.getTitle();
        expect(newWindowTittle).toEqual('WebDriverUniversity.com')
        
        await $('//h1[text()="CONTACT US"]').click();
        await browser.switchWindow('webdriveruniversity.com/Contact-Us/contactus.html');
        let newWindowTittleTwo = await browser.getTitle();
        expect(newWindowTittleTwo).toEqual('WebDriver | Contact Us')

        await browser.switchWindow('https://automationteststore.com/');
        await browser.closeWindow();
        await browser.switchWindow('WebDriverUniversity.com');
        await browser.pause(1000);
        
    });

    it('Iframes tests', async() => {

        await browser.url('/IFrame/index.html')
        const iframe = await $('#frame');
        await browser.switchToFrame(iframe);
        const ourProductsLink = $('//a[@href="products.html"]');
        await ourProductsLink.click();
        await browser.switchToParentFrame();
        let currentPageTitle = await browser.getTitle();
        expect(currentPageTitle).toEqual('WebDriver | IFrame');
        await browser.pause(3000);

        
    });

    it('Alerts test', async () => {
        
        await browser.url('/Popup-Alerts/index.html');

        //targeted the buttons with selectors
        const alertButtonOne = await $('#button1');
        const alertButtonTwo = await $('#button2');
        const alertButtonThree = await $('#button3');
        const alertButtonFour = await $('#button4');
        
        // click button to trigger the alert, then close the alert
        await alertButtonOne.click();
        await browser.pause(1500);
        await browser.acceptAlert();
        await browser.pause(1500);

        //Click the button to trigger the alert then retrieve the text from the alert to match in a positive and negative case.
        //Positive
        await alertButtonFour.click();
        await browser.acceptAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed OK!');
        //Negative
        await alertButtonFour.click();
        await browser.dismissAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed Cancel!');


    });

    it('File Upload tests', async () => {

        await browser.url('/File-Upload/index.html');
        await $('#myFile').addValue(`${process.cwd()}\\data\\dummy_file.txt`);
        browser.pause(2000);
        //for security purposes I am not going to upload the file but we should add the following line
        // await $('#submit-button').click
        //that would submit the upploaded file 
    });

    it.only('Inject JS test', async() => {
        await browser.url('/Hidden-Elements/index.html');
       //make a non displayed button to be displayed by injecting JS
        await browser.execute( () => {
            return document.getElementById('not-displayed').setAttribute("id","");
        });

        //change the width of a page by inejecting JS
        await browser.newWindow('https://www.udemy.com/');
        await browser.execute( ()=> {

            return document.body.style.maxWidth= "50%"

        })
        await browser.pause(3000);
        await browser.closeWindow();

    });
});