const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const { copyTemplate, replaceTemplateVariables } = require("./file-utils");

async function generateExtension(config) {
  const { name } = config;
  const targetDir = path.resolve(process.cwd(), name);

  // Check if directory already exists
  if (await fs.pathExists(targetDir)) {
    throw new Error(`Directory "${name}" already exists`);
  }

  const spinner = ora("Creating extension files...").start();

  try {
    // Create target directory
    await fs.ensureDir(targetDir);

    // Get template directory
    const templateDir = path.join(__dirname, "../templates");

    // Copy all template files
    await copyTemplate(templateDir, targetDir);

    // Replace template variables in specific files
    const filesToProcess = [
      "package.json",
      "public/manifest.json",
      "README.md",
      "public/popup.html",
      "src/background/index.js",
    ];

    for (const file of filesToProcess) {
      const filePath = path.join(targetDir, file);
      await replaceTemplateVariables(filePath, config);
    }

    // Create necessary directories
    await fs.ensureDir(path.join(targetDir, "public/assets/models"));
    await fs.ensureDir(path.join(targetDir, "build"));

    // Create placeholder for ONNX model
    const modelPlaceholder = path.join(
      targetDir,
      "public/assets/models/README.md"
    );
    await fs.writeFile(
      modelPlaceholder,
      `# ONNX Model

Place your ONNX model file here and rename it to \`model.onnx\`.

The model will be loaded by the extension when you click the "Load Model" button in the popup.

Make sure your model file is named exactly \`model.onnx\` for the extension to find it.
`
    );

    spinner.succeed("Extension files created successfully");
  } catch (error) {
    spinner.fail("Failed to create extension files");
    throw error;
  }
}

module.exports = { generateExtension };
