

describe('Testing wedriveruniversity - Contact us page', () => {

    beforeEach(async() => {
        await browser.maximizeWindow();
        console.log(`>>Browser Object: + ${JSON.stringify(browser)}`)
    });
    
    it('valid submission - submit all correct info in form', async() => {
        // you can add the base URL to the wdio.conf.js file, to only add the missing part of the URL to the main page, so only will need to access /Contact-Us/contactus.html since https://webdriveruniversity.com is set as base URL
        await browser.url('https://webdriveruniversity.com/Contact-Us/contactus.html')
        //await browser.pause(5000);

        //first name
        const firstName = await $('//*[@name="first_name"]');
        
      
        
        //last name\
        const lastName = await $('//*[@name="last_name"]');
        

        //email address
        const emailAddress = await $('//*[@name="email"]');
    

        //message
        const message = await $('//*[@name="message"]');
        
        //submit button
        const  submitButton = await $('//input[@value="SUBMIT"]');

        

        await firstName.setValue("Pedro");
        await lastName.setValue("Lopez");
        await emailAddress.setValue("pedrikolopez123@gmail.com");
        await message.setValue("Hello, this is a test message");
        await submitButton.click();
        


        //h1 displayed "Thank You for your Message!" 

        const succesfulSubmissionHeader =  await $('#contact_reply > h1');
        await expect(succesfulSubmissionHeader).toHaveText('Thank You for your Message!');
    });

    it('invalid submission - dont submit all information', async() => {

        await browser.url('https://webdriveruniversity.com/Contact-Us/contactus.html')
        //first name
        const firstName = await $('//*[@name="first_name"]');
        const lastName = await $('//*[@name="last_name"]');
        const message = await $('//*[@name="message"]');
        const  submitButton = await $('//input[@value="SUBMIT"]');


        await firstName.setValue("Pedro");
        await lastName.setValue("Lopez");
        await message.setValue("Hello, this is a test message");
        await submitButton.click();

        const succesfulSubmissionHeader =  await $('body');
        await expect(succesfulSubmissionHeader).toHaveTextContaining(['Error: all fields are required', 'Error: Invalid email address']);
        
        



        //last name
        //message
        //submit button
        
    });

});