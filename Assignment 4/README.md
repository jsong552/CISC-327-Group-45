
# Instructions for Running Test Coverage

### 1. Update `package.json`

Before running test coverage, ensure the following scripts are added to your `package.json` file:

```
"scripts": {
  "test": "nyc react-scripts test",
  "test:coverage": "react-scripts test --coverage"
}
```

### 2. Install Required Packages

Run the following command to install all required dependencies:

```
npm install
```

### 3. Run Test Coverage

After updating `package.json`, initiate test coverage in watch mode with this command:

```
npm run test:coverage -- --watchAll
```

This command will execute all tests and generate a code coverage report, which will be displayed in the terminal.

---

### Additional Notes

- The `--watchAll` flag keeps the tests running in watch mode, so any code changes will re-run the tests automatically.
- Ensure NYC and Jest are properly configured in your project for the best results.

---

