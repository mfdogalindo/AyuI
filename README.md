# Graph-Navigator Collector (AyuI)

[English](#english) | [Español](#español)

---

<a name="english"></a>
## English

### Project Overview
**Graph-Navigator Collector** is a cross-browser extension designed to capture browsing context as a structured **Knowledge Graph**. It collects "nodes" (webpages, text selections, code blocks) and automatically creates "edges" (relationships) between them based on your navigation flow. The ultimate goal is to export this graph into a semantic JSON format optimized for AI Agents (LLMs) to reconstruct the researcher's thought process.

### Features
*   **Investigation Management:** Create and manage multiple research sessions. Data is persisted locally using `chrome.storage.local`.
*   **Contextual Capture:** Right-click "Add to Graph" to capture:
    *   **Text Selections:** Highlighting key information.
    *   **Code Blocks:** Automatically detects `<pre>` or `<code>` tags.
    *   **Webpages:** Captures the current URL and title if no text is selected.
*   **In-Page Annotation:** A non-intrusive modal (Shadow DOM) appears to let you add a quick "User Note" explaining *why* this piece of information is relevant.
*   **Automatic Linking:** The system tracks the `lastActiveNodeId` and automatically creates a "navigation" edge to the next captured node, building a chronological chain of thought.
*   **Timeline Visualization:** View your captured nodes in a chronological timeline within the extension popup.
*   **AI-Ready Export:** Download your investigation as a structured JSON file containing metadata instructions and a knowledge graph ready for AI analysis.

### Installation & Build

1.  **Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) installed.
2.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd graph-navigator-collector
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Build the Extension:**
    ```bash
    npm run build
    ```
    This will generate a `dist` folder containing the compiled extension.

### Loading in Browsers

#### Chrome / Edge / Brave
1.  Open `chrome://extensions`.
2.  Enable **Developer mode** (toggle in the top right).
3.  Click **Load unpacked**.
4.  Select the `dist` folder generated in the previous step.

#### Firefox
1.  Open `about:debugging`.
2.  Click on **This Firefox** in the sidebar.
3.  Click **Load Temporary Add-on...**.
4.  Navigate to the `dist` folder and select the `manifest.json` file.

### Usage
1.  Click the extension icon to open the **Popup**.
2.  Create a **New Investigation** (give it a Title and Description).
3.  Browse the web. When you find something interesting:
    *   Select text or a code block, or just right-click anywhere.
    *   Choose **"Agregar al Grafo"** (Add to Graph) from the context menu.
4.  A modal will appear on the page. Enter a **User Note** and click **Save**.
5.  Open the extension popup again to see your **Timeline**.
6.  Click the **Download JSON** button (in Timeline view) to export the data for an AI agent.

---

<a name="español"></a>
## Español

### Descripción del Proyecto
**Graph-Navigator Collector** es una extensión de navegador (Cross-Browser) diseñada para capturar el contexto de navegación como un **Grafo de Conocimiento** estructurado. Recolecta "nodos" (páginas web, selecciones de texto, bloques de código) y crea automáticamente "aristas" (relaciones) entre ellos basándose en tu flujo de navegación. El objetivo final es exportar este grafo en un formato JSON semántico optimizado para que Agentes de IA (LLMs) puedan reconstruir el proceso de pensamiento del investigador.

### Características
*   **Gestión de Investigaciones:** Crea y gestiona múltiples sesiones de investigación. Los datos persisten localmente usando `chrome.storage.local`.
*   **Captura Contextual:** Haz clic derecho y selecciona "Agregar al Grafo" para capturar:
    *   **Selecciones de Texto:** Resalta información clave.
    *   **Bloques de Código:** Detecta automáticamente etiquetas `<pre>` o `<code>`.
    *   **Páginas Web:** Captura la URL y el título actual si no hay texto seleccionado.
*   **Anotación en Página:** Un modal no intrusivo (Shadow DOM) aparece para permitirte añadir una "Nota de Usuario" rápida explicando *por qué* esta información es relevante.
*   **Enlazado Automático:** El sistema rastrea el `lastActiveNodeId` (último nodo activo) y crea automáticamente una arista de "navegación" hacia el siguiente nodo capturado, construyendo una cadena de pensamiento cronológica.
*   **Visualización de Línea de Tiempo:** Ve tus nodos capturados en una línea de tiempo cronológica dentro del popup de la extensión.
*   **Exportación para IA:** Descarga tu investigación como un archivo JSON estructurado que contiene instrucciones de metadatos y un grafo de conocimiento listo para análisis por IA.

### Instalación y Compilación

1.  **Requisitos Previos:** Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2.  **Clonar el repositorio:**
    ```bash
    git clone <repository-url>
    cd graph-navigator-collector
    ```
3.  **Instalar Dependencias:**
    ```bash
    npm install
    ```
4.  **Compilar la Extensión:**
    ```bash
    npm run build
    ```
    Esto generará una carpeta `dist` que contiene la extensión compilada.

### Cargar en Navegadores

#### Chrome / Edge / Brave
1.  Abre `chrome://extensions`.
2.  Habilita el **Modo de desarrollador** (interruptor en la esquina superior derecha).
3.  Haz clic en **Cargar descomprimida** (Load unpacked).
4.  Selecciona la carpeta `dist` generada en el paso anterior.

#### Firefox
1.  Abre `about:debugging`.
2.  Haz clic en **Este Firefox** (This Firefox) en la barra lateral.
3.  Haz clic en **Cargar complemento temporal...** (Load Temporary Add-on...).
4.  Navega a la carpeta `dist` y selecciona el archivo `manifest.json`.

### Uso
1.  Haz clic en el icono de la extensión para abrir el **Popup**.
2.  Crea una **Nueva Investigación** (dale un Título y Descripción).
3.  Navega por la web. Cuando encuentres algo interesante:
    *   Selecciona texto o un bloque de código, o simplemente haz clic derecho en cualquier lugar.
    *   Elige **"Agregar al Grafo"** en el menú contextual.
4.  Aparecerá un modal en la página. Ingresa una **Nota de Usuario** y haz clic en **Save** (Guardar).
5.  Abre el popup de la extensión nuevamente para ver tu **Línea de Tiempo**.
6.  Haz clic en el botón de **Descargar JSON** (en la vista de Línea de Tiempo) para exportar los datos para un agente de IA.
