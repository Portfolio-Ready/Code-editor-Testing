// Select DOM elements with error handling
const runButton = document.getElementById('run-button');
const htmlEditor = document.getElementById('html-code');
const cssEditor = document.getElementById('css-code');
const jsEditor = document.getElementById('js-code');
const outputFrame = document.getElementById('output');
const consoleMessages = document.getElementById('console-messages');

// Ensure all required DOM elements are available
if (!runButton || !htmlEditor || !cssEditor || !jsEditor || !outputFrame || !consoleMessages) {
    console.error("One or more required DOM elements are missing.");
    alert("Error: Required elements are missing from the page.");
}

// Function to display messages in the console
function handleConsole(message, type = 'log') {
    const messageElement = document.createElement('div');
    messageElement.textContent = `[${type.toUpperCase()}] ${message}`;
    consoleMessages.appendChild(messageElement);
    consoleMessages.scrollTop = consoleMessages.scrollHeight; // Scroll to latest message
}

// Bind handleConsole to window to access it within the iframe
window.handleConsole = handleConsole;

// Function to run the user's code with error handling
function runCode() {
    try {
        // Clear console before each run
        consoleMessages.innerHTML = '';

        // Combine HTML, CSS, and JS into a single output
        const htmlContent = htmlEditor.value;
        const cssContent = `<style>${cssEditor.value}</style>`;
        const jsContent = `
            <script>
                window.onerror = function (msg, url, lineNo, columnNo, error) {
                    parent.handleConsole('Error: ' + msg + ' at line ' + lineNo + ':' + columnNo, 'error');
                    return true;
                };
                (function() {
                    const console = { 
                        log: (msg) => parent.handleConsole(msg, 'log'), 
                        warn: (msg) => parent.handleConsole(msg, 'warn'), 
                        error: (msg) => parent.handleConsole(msg, 'error') 
                    };
                    ${jsEditor.value}
                })();
            <\/script>`;

        // Write to iframe (output)
        const fullContent = htmlContent + cssContent + jsContent;
        const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
        outputDocument.open();
        outputDocument.write(fullContent);
        outputDocument.close();

    } catch (error) {
        handleConsole(`JavaScript Execution Error: ${error.message}`, 'error');
    }
}

// Save editor content to localStorage with error handling
function saveContent() {
    try {
        localStorage.setItem('htmlContent', htmlEditor.value);
        localStorage.setItem('cssContent', cssEditor.value);
        localStorage.setItem('jsContent', jsEditor.value);
    } catch (error) {
        handleConsole("Error saving to local storage: " + error.message, 'error');
    }
}

// Load content from localStorage on page load with error handling
function loadContent() {
    try {
        htmlEditor.value = localStorage.getItem('htmlContent') || '';
        cssEditor.value = localStorage.getItem('cssContent') || '';
        jsEditor.value = localStorage.getItem('jsContent') || '';
    } catch (error) {
        handleConsole("Error loading from local storage: " + error.message, 'error');
    }
}

// Auto-complete for basic HTML structure when typing "!" and pressing Enter
htmlEditor.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && htmlEditor.value.trim() === '!') {
        e.preventDefault();
        htmlEditor.value = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>`;
    }
});

// Event listeners with error handling
runButton.addEventListener('click', () => {
    consoleMessages.innerHTML = ''; // Clear console before each run
    runCode();
});

htmlEditor.addEventListener('input', saveContent);
cssEditor.addEventListener('input', saveContent);
jsEditor.addEventListener('input', saveContent);
window.addEventListener('load', loadContent);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Responsive code navbar

    //    code sec
    let htmlCode = document.querySelector('.html-code');
    let cssCode = document.querySelector('.css-code');
    let jsCode = document.querySelector('.js-code');

    // nav
    let htmlNav = document.querySelector('.html-nav');
    let cssNav = document.querySelector('.css-nav');
    let jsNav = document.querySelector('.js-nav');




    // Display Html Editor
    htmlNav.addEventListener('click', ()=>{
        cssCode.style.display = "none";
        htmlCode.style.display = "block";
        jsCode.stye.display = "none";
    })

    // Display css Editor
    cssNav.addEventListener('click', ()=>{
        cssCode.style.display = "block";
        htmlCode.style.display = "none";
        jsCode.style.display = "none";
    })

    // Display Js Editor
    jsNav.addEventListener('click', ()=>{
        cssCode.style.display = "none";
        htmlCode.style.display = "none";
        jsCode.style.display = "block";
    })


