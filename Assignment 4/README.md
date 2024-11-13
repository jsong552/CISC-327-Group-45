##
Instructions for Running Test Coverage

=====================================


1. Update package.json: Before running test coverage, ensure the following scripts are
added to your package.json file:

    "scripts": { "test": "nyc react-scripts test",
    "test:coverage": "react-scripts test --coverage" }

2. Install required packages:'npm install'

3. Run Test Coverage: After updating package.json, run the following command to
initiate test coverage in watch mode:

npm run test:coverage -- --watchAll

This will execute all tests and generate a code coverage report