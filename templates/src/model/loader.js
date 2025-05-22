// Model loader script that runs in the sandboxed iframe
// This handles the actual ONNX model loading using ONNX Runtime Web

const MODEL_PATH = "assets/models/model.onnx";

let session = null;
let isModelLoaded = false;

// Load ONNX Runtime from CDN
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.14.0/ort.min.js';
script.onload = () => {
    console.log('ONNX Runtime loaded');
    // Notify parent that sandbox is ready
    window.parent.postMessage({ type: 'SANDBOX_READY' }, '*');
};
script.onerror = () => {
    console.error('Failed to load ONNX Runtime');
    window.parent.postMessage({ 
        type: 'MODEL_LOADED', 
        success: false, 
        error: 'Failed to load ONNX Runtime' 
    }, '*');
};
document.head.appendChild(script);

// Load the ONNX model
async function loadModel() {
    if (isModelLoaded) {
        window.parent.postMessage({ type: 'MODEL_LOADED', success: true }, '*');
        return;
    }

    try {
        console.log('Loading ONNX model from:', MODEL_PATH);

        // Fetch the model file
        const response = await fetch(chrome.runtime.getURL(MODEL_PATH));
        if (!response.ok) {
            throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
        }

        const modelArrayBuffer = await response.arrayBuffer();
        console.log(`Model fetched (${(modelArrayBuffer.byteLength / (1024 * 1024)).toFixed(2)} MB)`);

        // Create ONNX inference session
        session = await ort.InferenceSession.create(modelArrayBuffer, {
            executionProviders: ['wasm']
        });

        console.log('Model loaded successfully');
        console.log('Input names:', session.inputNames);
        console.log('Output names:', session.outputNames);

        isModelLoaded = true;
        window.parent.postMessage({ type: 'MODEL_LOADED', success: true }, '*');

    } catch (error) {
        console.error('Error loading model:', error);
        window.parent.postMessage({ 
            type: 'MODEL_LOADED', 
            success: false, 
            error: error.message 
        }, '*');
    }
}

// Listen for messages from parent window
window.addEventListener('message', (event) => {
    // Security check - only accept messages from parent
    if (event.source !== window.parent) return;

    const message = event.data;

    switch (message.type) {
        case 'LOAD_MODEL':
            loadModel();
            break;
    }
});