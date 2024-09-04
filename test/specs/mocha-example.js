// skipped test describe.skip

describe.skip('Description of test suite', ()=> {

    before(() => {
        console.log("Runs once before the first test in the block")
    });

    after(() => {
        console.log("Runs once after the last test in the block")
    });

    beforeEach(() => {
        console.log("Runs once before each test")
        
    });

    afterEach(() => {
        console.log("Runs once after each test")
    });

    it('Individual test 1', () => {
        console.log("Executed test 1")


    })

    it('Individual test 2', () => {

        console.log("Executed test 2")
        
    }); 

});
