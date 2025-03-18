
# Todo App Web Component

This project demonstrates two approaches for running a Todo App as a Web Component:
1. **Web Component approach**: The app is rendered directly inside the Web Component using the shadow DOM.
2. **Web Component with iframe approach**: The app is rendered inside an iframe within the Web Component.

## Steps to Run the Project

### 1. Install Dependencies

Before running the server, make sure to install all necessary dependencies. Run the following command in the root of your project:

```bash
npm install
```

### 2. Start the Development Server

To start the server, run:

```bash
node test-server.js
```

This will start a local server, and you will be able to access the app in your browser.

### 3. Access the App in the Browser

Once the server is running, you can access the Todo App in two different modes:

#### **Normal Web Component Approach**

- Open your browser and go to:  
  [http://localhost:3000](http://localhost:3000)

This will load the Todo app directly inside the Web Component (using the shadow DOM).

#### **Web Component with iframe Approach**

- Open your browser and go to:  
  [http://localhost:3000/simple](http://localhost:3000/simple)

This will load the Todo app inside an iframe within the Web Component.

## File Structure

- `test-server.js`: Node.js server to serve the app.
- `dist/`: Contains the compiled application files.
  - `dist/_expo/static/css/`: Styles for the Todo App.
  - `dist/_expo/static/js/web/`: JavaScript files for the Todo App.
- `src/`: Source code for the Web Component and app logic.

## Troubleshooting

- If you encounter any `404` errors for missing files, make sure the paths to the app’s CSS and JS files are correct.
- Ensure that the server is running on port 3000 and that your browser has access to this local server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
