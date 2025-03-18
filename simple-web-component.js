class TodoAppWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.container = document.createElement('div');
    this.container.id = 'todo-app-container';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      #todo-app-container {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    `;
    this.shadowRoot.appendChild(style);

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.setAttribute('title', 'Todo App');
    
    iframe.srcdoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Todo App</title>
          <script>
            window.process = {
              env: {
                NODE_ENV: 'production'
              }
            };
          </script>
          <style>
            html, body, #root {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.addEventListener('load', () => {
              const container = document.getElementById('root');
              
              if (window.AppRegistry) {
                window.AppRegistry.registerComponent('TodoApp', () => window.App);
                window.AppRegistry.runApplication('TodoApp', {
                  rootTag: container,
                  initialProps: {}
                });
              }
            });
          </script>
          <script src="./dist/_expo/static/js/web/AppEntry-d93609a7d493f72760ef94f74c6c0090.js"></script>
        </body>
      </html>
    `;
    
    this.container.appendChild(iframe);
  }

  disconnectedCallback() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}

customElements.define('todo-app', TodoAppWebComponent);

export default TodoAppWebComponent; 