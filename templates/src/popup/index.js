// Popup script that handles the "Load Model" button

let sandboxFrame = null;
let isModelLoaded = false;

// UI elements
const loadButton = document.getElementById('loadModelBtn');
const statusDiv = document.getElementById('status');

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    loadButton.addEventListener('click', loadModel);
    updateStatus('Ready to load model', 'info');
});

// Update status display
function updateStatus(message, type = 'info') {
    statusDiv.textContent = message;
    statusDiv.className = 'status';
    
    if (type !== 'info') {
        statusDiv.classList.add(type);
    }
}

// Load the ONNX model
async function loadModel() {
    if (isModelLoaded) {
        updateStatus('Model already loaded!', 'success');
        return;
    }

    loadButton.disabled = true;
    updateStatus('Loading model...', 'loading');

    try {
        // Create sandboxed iframe for model loading
        await createSandboxFrame();
        
        // Set up message listener
        window.addEventListener('message', handleSandboxMessage);
        
        // Initialize model loading
        sandboxFrame.contentWindow.postMessage({ type: 'LOAD_MODEL' }, '*');
        
    } catch (error) {
        console.error('Error loading model:', error);
        updateStatus('Failed to load model: ' + error.message, 'error');
        loadButton.disabled = false;
    }
}

// Create sandbox iframe
function createSandboxFrame() {
    return new Promise((resolve, reject) => {
        // Remove existing frame if present
        const existingFrame = document.getElementById('model-sandbox');
        if (existingFrame) {
            existingFrame.remove();
        }

        // Create new sandbox iframe
        sandboxFrame = document.createElement('iframe');
        sandboxFrame.id = 'model-sandbox';
        sandboxFrame.src = chrome.runtime.getURL('model.html');
        sandboxFrame.style.display = 'none';
        document.body.appendChild(sandboxFrame);

        sandboxFrame.onload = () => resolve();
        sandboxFrame.onerror = () => reject(new Error('Failed to load sandbox'));
    });
}

// Handle messages from sandbox
function handleSandboxMessage(event) {
    // Make sure message is from our sandbox
    if (event.source !== sandboxFrame?.contentWindow) return;

    const message = event.data;

    switch (message.type) {
        case 'MODEL_LOADED':
            if (message.success) {
                isModelLoaded = true;
                updateStatus('✅ Model loaded successfully!', 'success');
                loadButton.textContent = 'Model Loaded';
            } else {
                updateStatus('❌ Failed to load model: ' + message.error, 'error');
                loadButton.disabled = false;
            }
            break;

        case 'SANDBOX_READY':
            console.log('Sandbox is ready');
            break;
    }
}