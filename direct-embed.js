// Initialize the Todo App in the specified container
function initTodoApp(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {

}

(function() {
  // Create a container for the app if it doesn't exist
  let container = document.getElementById('todo-app-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'todo-app-root';
    document.body.appendChild(container);
  }

  // Load the main CSS file if available
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = './dist/_expo/static/css/main.css';
  document.head.appendChild(cssLink);

  // Load the main app bundle
  const script = document.createElement('script');
  script.src = './dist/_expo/static/js/web/AppEntry-d93609a7d493f72760ef94f74c6c0090.js';
  script.async = true;
  
  // Initialize the app after script loads
  script.onload = function() {
    if (window.AppRegistry) {
      window.AppRegistry.registerComponent('TodoApp', () => window.App);
      window.AppRegistry.runApplication('TodoApp', {
        rootTag: container,
        initialProps: {}
      });
    } else {
      console.error('AppRegistry not found in the bundle');
    }
  };
  
  document.body.appendChild(script);
})();
