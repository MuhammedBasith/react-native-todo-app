class MyWorkspaceApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Create the root container for the Expo app
    this.container = document.createElement("div");
    this.container.setAttribute("id", "root");
    this.shadowRoot.appendChild(this.container);

    // Inject styles (optional)
    const style = document.createElement("style");
    style.textContent = `
      html, body {
        height: 100%;
        margin: 0;
      }
      #root {
        display: flex;
        height: 100%;
        flex: 1;
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    setTimeout(() => {
      const root = this.shadowRoot.querySelector("#root");

      if (!root) {
        console.error("Root element not found inside Web Component.");
        return;
      }

      // ✅ 1. Set the correct root tag for React Native Web
      window.__REACT_NATIVE_WEB_ROOT__ = root;

      // ✅ 2. Manually call Expo’s AppRegistry to render inside the shadow DOM
      const script = document.createElement("script");
      script.src = "/_expo/static/js/web/AppEntry-d93609a7d493f72760ef94f74c6c0090.js"; // Ensure this path is correct
      script.defer = true;

      script.onload = () => {
        console.log("Expo app loaded successfully!");

        setTimeout(() => {
          if (window.AppRegistry && window.AppRegistry.runApplication) {
            window.AppRegistry.runApplication("main", {
              initialProps: {},
              rootTag: root, // ✅ Pass the correct rootTag
            });
          } else {
            console.error("Expo AppRegistry is not available.");
          }
        }, 100);
      };

      script.onerror = () => {
        console.error("Failed to load Expo bundle.");
      };

      this.shadowRoot.appendChild(script);
    }, 0);
  }
}

// Register custom element
customElements.define("my-workspace-app", MyWorkspaceApp);
