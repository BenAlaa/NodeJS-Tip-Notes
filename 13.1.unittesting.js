/**
 * 
 * https://jestjs.io/docs/en/getting-started
-Automated testing is the practice of writing code to test our code.
- Automated tests help us deliver software with fewer bugs and of better quality.
They also help us refactor our code with confidence.
    - Jest is a new trending popular testing framework recommended by Facebook. It
      comes with everything you need to write automated tests.
    - We have 3 types of automated tests:
        - Unit tests: test a unit of an application without external resources (eg db
        - Integration tests: test the application with external resources.
        - Functional or end-to-end tests: test the application through its UI. 
    - Tests should not be too general nor too specific. If they’re too general, they don’t
        give you much confidence that your code works. If they’re too specific, they
        become fragile and can break easily. As you write code, you have to spend extra
        unnecessary time to fix these broken tests. 
    - Mocking is replacing a real implementation of a function with a fake or mock
    function. It allows us to isolate our application code from its external resources.
-
 */

/**
 * favor unit test over ui or e2e tests
 * start with unit test then integration 
 * use end to end at the important parts of the application
 */
/**
 *  Popular Jest matcher functions: 
    // Equality
    expect(…).toBe();
    expect(…).toEqual();
    // Truthiness
    expect(…).toBeDefined();
    expect(…).toBeNull();
    expect(…).toBeTruthy();
    expect(…).toBeFalsy();
    // Numbers
    expect(…).toBeGreaterThan();
    expect(…).toBeGreaterThanOrEqual();
    expect(…).toBeLessThan();
    expect(…).toBeLessThanOrEqual();
    // Strings
    expect(…).toMatch(/regularExp/);
    // Arrays
    expect(…).toContain();
    // Objects
    expect(…).toBe(); // check for the equality of object references
    expect(…).toEqual(); // check for the equality of properties
    expect(…).toMatchObject();
    // Exceptions
    expect(() => { someCode }).toThrow();
 */
// npm i jest --save -dev because it's development dependency 
//in package.json use jest at the test property "scripts":{"test":"jest"}
//if you want jest to continue to run tests each time you edit your code
//in package.json use jest at the test property "scripts":{"test":"jest --watchAll"}

//now npm test will run your tests
//any files that ends with test.js or spec.js will run
//create a new folder tests, then add a file  name of the thing you want to test.test.js for instance Repo.test.js

test('name of the test', () => {
    //your test
});
// if you run this it will show you it passed
/*
 PASS  tests/lib.test.js
  √ name of the test (1ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.919s




the number of unit tests should be equal or greater than the number of paths



testing numbers

 *
  function lib.absolute = function(number) {
  if (number > 0) return number; 
  if (number < 0) return -number; 
  return 0; 
}
 */
test("absoulte -should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);

});

test('absoulte -should return a negative number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(-1);

});
test('absoulte -should return a zero number if input is zero', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);

});
////////////////
test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);    This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});

//organizing tests
//grouping
describe('absolute', () => {

    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);

    });
    it('should return a negative number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(-1);

    });
    it('should return a zero number if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);

    });
});

//refactoring 
//if i have tests already existing for a function, 
//and i refactor it and the same tests pass,
// this means that this refactoring didn't mess up the function


//strings
/**
 * lib.greet = function(name) { 
  return 'Welcome ' + name; 
}
 */

describe('Greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Loai');
        //this test is too specific and it may break easily
        expect(result).toBe('Welcome Loai');
    });
    it('should return the greeting message', () => {
        const result = lib.greet('Loai');

        expect(result).toMatch(/Loai/); //using regular expression to see if the results contain the name
        expect(result).toContain('Loai');
    });
});
//testing arrays 
describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        //bad ways 
        //  expect(result[0]).toBe('USD');

        //proper way instead of hardcoded ones
        //  expect(result).toContain('USD');
        //  expect(result).toContain('AUD');
        //  expect(result).toContain('EUR');

        //ideal way 
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
    });
});

//testing objects
/**
 * module.exports.getProduct = function(productId) { 
  return { id: productId, price: 10 };
}

 */
describe('getProduct', () => {
    it('should return product with given id', () => {
        const result = lib.getProduct(1);
        //testing objects and naming all the properties
        //if the result have three properties this will fail, even if the id is 1 and the price is 10
        expect(result).toEqual({ id: 1, price: 10 });
        //testing objects and only listing some of its properties
        expect(result).toMatchObject({ id: 1, price: 10 });
        //another way is 
        expect(result).toHaveProperty('id', 1); //  TYPE IS IMPORTANT

    });
});

// Testing exceptions 
// module.exports.registerUser = function(username) { 
//     if (!username) throw new Error('Username is required.');

//     return { id: new Date().getTime(), username: username }
//   }
describe('resgisterUser', () => {
    //first path
    it('should throw if user is falsy', () => {
        //we should test against all these values (null, undefined, nan, '',0, false)
        expect(() => {
            {
                //since we are not getting a result form the function
                //we will use a callback
                lib.registerUser(null);
            }
        }).toThrow();
    });
    //jest doesn't support parameterized tests
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(element => {
        expect(() => {
            lib.registerUser(element);
        }).toThrow();
    });

    ///single assertion wrongdoing
    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Loai');
        expect(result).toMatchObject({ username: 'Loai' });
        expect(result.id).toBeGreaterThan(0);

    });
    //there's a concept (single assertion) which means that every test should assert one thing
    //in the case above this is not single assertion, to make it that wat we should have multiple it() methods each should assert one argument
    //second path
    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Loai');
        expect(result).toMatchObject({ username: 'Loai' });


    });
    it('should return a valid id if valid user is passed', () => {
        const result = lib.registerUser('Loai');

        expect(result.id).toBeGreaterThan(0);

    });
});

// fizzBuzz = function(input) { 
//     if (typeof input !== 'number') 
//       throw new Error('Input should be a number.');

//     if ((input % 3 === 0) && (input % 5) === 0)
//       return 'FizzBuzz';

//     if (input % 3 === 0)
//       return 'Fizz';

//     if (input % 5 === 0)
//       return 'Buzz'; 

//     return input; 
//   }

describe('fizzBuzz', () => {
    //paths
    //input not a number  error
    //input dividable by 3 and 5 
    //input dividable by only 3
    //input dividable by only 5
    //input  not dividable by either 3 or 5
    //path one
    it('should return an error if input is NaN ', () => {
        //(type of NaN is number so we shouldn't check that)
        const args = [null, undefined, '', false];
        args.forEach(element => {
            expect(() => {
                exc.fizzBuzz(element);
            }).toThrow();
        });
    });
    //path two
    it('should return FizzBuzz if input is dividable by 3 and 5 ', () => {
        const result = exc.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });
    //path three
    it('should return Fizz if input is dividable by 3 and not 5', () => {
        const result = exc.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });
    //path four
    it('should return Buzz if input is dividable by 5 and not 3 ', () => {
        const result = exc.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });
    //path five
    it('should return input if input is not dividable by either 3 or 5 ', () => {
        const result = exc.fizzBuzz(19);
        expect(result).toBe(19);
    });
});


//working with dependencies,
// if you touch a method that works with database, this is an integration test
//the idea of unit test is to decouple your code from external dependencies
//how to unit test a function that depends on external resources
//using mock functions
//mock functions will work with modules because node only puts one instance of the module in the memory
//so if we make changes to it, it'll affect every imported version everywhere since they're the same instance

getCustomerSync = function(id) {
    //imagine this is the one that calls the database
    console.log('Reading a customer from MongoDB...');
    return { id: id, points: 11 };
}


applyDiscount = function(order) {

    //here the applyDiscount depends on the get customer method
    //the method doesn't really go to the database but imagine that it does

    const customer = getCustomerSync(order.customerId);

    if (customer.points > 10)
        order.totalPrice *= 0.9;
}
describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points ', () => {
        //here instead of using the function that gets customer from database we will change its implementation
        getCustomerSync = function(id) {
                return { id: id, points: 20 };
            }
            //now we do our unit test
        const order = { customerId: 1, totalPrice: 10 };
        //since we changed the method inside apply discount it's no longer coupled

        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

notifyCustomer = function(order) {
    const customer = getCustomerSync(order.customerId);

    sendEmail(customer.email, 'Your order was placed successfully.');
}

sendEmail = function(to, subject) {
        console.log('Sending an email...');
    }
    //writing a unit test for notifyCustomer
    //since it too depends on getCustomer, we should use mock functions
describe('notifyCustomer', () => {
    it('should notify customer', () => {
        //first make a mock function out of getCustomer
        getCustomerSync = function(id) {
                return { customerId: id, email: 'a' };
            }
            //now implement the function notifyCustomer
            //but since we depend on SendEmail we need to change that too
            //to make sure that we sent the email
            //we can add a boolean to the body of sendEmail
        let mailSent = false;
        let cusEmail = 0;
        sendEmail = function(to, subject) {
            console.log('Sending an email...');
            mailSent = true;
            cusId = to.email;
        }

        lib.notifyCustomer(customer, "subject");
        expect(mailSent).toBe(true);
        expect(cusEmail).toBe('a');
    });
});
//creating mockFucntions using jest.fn()
describe('notifyCustomer', () => {
    it('should notify customer', () => {
        //first make a mock function instead of getCustomer 
        // const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // //result = 1
        // const result = mockFunction();
        // //returning a promise
        // mockFunction.mockResolvedValue(1);
        // const result   = await mockFunction();
        // //error
        // mockFunction.mockRejectedValue(new Error('errr'));

        getCustomerSync = jest.fn().mockReturnValue({ customerId: id, email: 'a' });
        sendEmail = jest.fn();
        //instead of the booleans we can user .toHaveBeenCalled()

        lib.notifyCustomer(customer, "subject");

        expect(sendEmail).toHaveBeenCalled();
        //if you need to assert the arguments sent to the method
        expect(sendEmail.mock.calls[0][0].toBe('a'));
        expect(sendEmail.mock.calls[0][0].toMatch(/order/)); //use toMatch and regular expressions when working with strings so you don't end up with rigid unit tests




    });
});

getCustomerAsync = async function(id) {
    return new Promise((resolve, reject) => {
        console.log('Reading a customer from MongoDB...');
        resolve({ id: id, points: 11 });
    });
}