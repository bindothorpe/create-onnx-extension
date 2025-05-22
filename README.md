<div align="center">
  <img src="templates/public/icons/icon128.png" alt="ONNX Extension Generator" width="128" height="128">
  
  # create-onnx-extension
  
  **Create Chrome extensions powered by ONNX machine learning models**
  
  [![npm version](https://badge.fury.io/js/create-onnx-extension.svg)](https://www.npmjs.com/package/create-onnx-extension)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## Overview

`create-onnx-extension` provides a ready-to-use boilerplate for ML-powered browser extensions. It generates a complete Chrome extension with secure ONNX model loading capabilities, allowing developers to quickly prototype and deploy machine learning features in the browser.

## Prerequisites

Before using this package, you should have:

- **JavaScript knowledge**: Familiarity with modern JavaScript and async/await patterns
- **ONNX/ML experience**: Understanding of ONNX models and basic machine learning concepts
- **Chrome extension basics**: Knowledge of Chrome extension architecture and development workflow
- **Node.js**: Version 14.0.0 or higher installed on your system

## Installation

Create a new ONNX-powered Chrome extension using npx (no installation required):

```bash
npx create-onnx-extension my-extension-name --description "My ML Extension" --author "Your Name" --version "1.0.0"
```

Or install globally:

```bash
npm install -g create-onnx-extension
create-onnx-extension my-extension-name --description "My ML Extension" --author "Your Name"
```

## Usage

### Basic Command

```bash
npx create-onnx-extension <extension-name> [options]
```

### Options

- `--description <description>`: Extension description (default: "An extension powered by ONNX models")
- `--author <author>`: Extension author (default: "Anonymous") 
- `--version <version>`: Extension version (default: "1.0.0")

### Quick Start

1. **Generate the extension:**
   ```bash
   npx create-onnx-extension my-ml-extension --description "AI-powered browser extension"
   ```

2. **Install dependencies:**
   ```bash
   cd my-ml-extension
   npm install
   ```

3. **Add your ONNX model:**
   ```bash
   # Place your model file at:
   # public/assets/models/model.onnx
   ```

4. **Build the extension:**
   ```bash
   npm run build
   ```

5. **Load in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build/` folder

## What's Included

The generated extension includes:

### Technical Architecture
- **Sandboxed ONNX Loading**: Secure model execution in isolated iframe context
- **Webpack Build System**: Complete build pipeline with development and production modes
- **Chrome Extension Manifest V3**: Latest extension API with proper permissions and CSP
- **Popup Interface**: Pre-built UI for model loading and status display
- **Background Service Worker**: Extension lifecycle management and message handling

### Security Features
- **Content Security Policy**: Strict CSP preventing code injection attacks
- **Sandboxed Execution**: ONNX models run in restricted iframe environment
- **Minimal Permissions**: Only requests necessary Chrome extension permissions

### Development Tools
- **Hot Reload**: Watch mode for development with automatic rebuilding
- **Source Maps**: Debug support for development builds
- **Code Formatting**: Prettier integration for consistent code style

## Security

The generated extensions use a sandboxed architecture for enhanced security:

**Why Sandboxing Matters:**
- **Chrome Extension Security**: Prevents malicious model files from accessing extension APIs
- **WASM Execution Safety**: Isolates WebAssembly execution from the main extension context  
- **Content Security Policy**: Enforces strict CSP rules while allowing necessary ONNX Runtime functionality
- **API Isolation**: Limits access to sensitive Chrome APIs from model processing code

This approach follows Chrome extension security best practices while enabling powerful ML capabilities.

## Example

### Computer Vision Extension
```bash
npx create-onnx-extension image-classifier \
  --description "Real-time image classification extension" \
  --author "Your Name"
```

The generated extension provides a secure ONNX loading foundation - simply replace `model.onnx` with your specific trained model.

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and test with generated extensions
4. **Commit your changes:** `git commit -m 'Add amazing feature'`  
5. **Push to the branch:** `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Setup

```bash
git clone https://github.com/yourusername/create-onnx-extension.git
cd create-onnx-extension
npm install
npm link

# Test your changes
create-onnx-extension test-extension --description "Test Extension"
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ for the ML and Chrome Extension developer community
</div>
