class TodoAppWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Create container for the app
    const container = document.createElement('div');
    container.id = 'root';
    this.shadowRoot.appendChild(container);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      #root {
        width: 100%;
        height: 100%;
      }
    `;
    this.shadowRoot.appendChild(style);

    // Load the built app
    this.loadApp();
  }

  loadApp() {
    // First, load the necessary CSS file if it exists
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = './dist/_expo/static/css/main.css';
    this.shadowRoot.appendChild(cssLink);

    // Create a script to inject our initialization code
    const initScript = document.createElement('script');
    initScript.textContent = `
      window.ReactNativeWebComponent = {
        appName: 'TodoApp',
        rootTag: document.getElementById('root'),
        initialProps: {}
      };
    `;
    this.shadowRoot.appendChild(initScript);

    // Load the main app bundle
    const scriptPath = new URL('./dist/_expo/static/js/web/AppEntry-d93609a7d493f72760ef94f74c6c0090.js', document.baseURI).href;

    // Create script element
    const script = document.createElement('script');
    script.src = scriptPath;
    script.async = true;  // Ensures the script loads asynchronously

    // Add a custom init function after the script loads
    script.onload = () => {
      try {
        // Create a custom initialization script that uses ReactNative's AppRegistry
        const appInitScript = document.createElement('script');
        appInitScript.textContent = `
          (function() {
            try {
              // Check if AppRegistry is available in the window context
              if (window.AppRegistry) {
                const rootElement = document.querySelector('todo-app').shadowRoot.getElementById('root');
                window.AppRegistry.registerComponent('TodoApp', () => window.App);
                window.AppRegistry.runApplication('TodoApp', {
                  rootTag: rootElement,
                  initialProps: {}
                });
              } else {
                console.error('AppRegistry not found in window context');
              }
            } catch (e) {
              console.error('Error initializing app:', e);
            }
          })();
        `;
        this.shadowRoot.appendChild(appInitScript);
      } catch (e) {
        console.error('Error setting up app:', e);
      }
    };

    // Add script to shadow DOM
    this.shadowRoot.appendChild(script);
  }

  disconnectedCallback() {
    // Clean up any resources if needed
    try {
      // Attempt to unmount the React component if AppRegistry exists
      if (window.AppRegistry && typeof window.AppRegistry.unmountApplicationComponentAtRootTag === 'function') {
        const rootElement = this.shadowRoot.getElementById('root');
        window.AppRegistry.unmountApplicationComponentAtRootTag(rootElement);
      }
    } catch (e) {
      console.error('Error cleaning up app:', e);
    }
  }
}

// Register the custom element
customElements.define('todo-app', TodoAppWebComponent);

// Export the component class
export default TodoAppWebComponent;
