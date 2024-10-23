## Getting Started
First, clone the repository to your local machine:

```bash
git clone https://github.com/jsong552/CISC-327-Group-45.git
```

### Install Dependencies
Once inside the project directory, install the necessary packages using:
```bash
npm install
```
This will download and install all the dependencies which will be listed in the ```package.json``` file.

# Running the Application
### Start the Development Server
To start the React app, use the following command:
```bash
npm start
```
This will start the server, and you can view the app in your browser by navigating to http://localhost:3000.

### Running Tests
To execute the test scripts, which are written with react-testing-library and Jest, launch a terminal server. After you have installed the dependencies, run:
```bash
npm run test
```
This should produce an output like this: 
![](https://github.com/jsong552/CISC-327-Group-45/blob/1acf0a4fdad0623c1bb32424be60f4c3becf8ddb/Screenshot%202024-10-22%20221003.png)
### Our Test Cases Were:
1. If it successfully adds a medicine and it appears in inventory.
2. If it fails to add medicine with a missing name and shows an error.
