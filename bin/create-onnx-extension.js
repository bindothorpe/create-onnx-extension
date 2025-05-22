const { Command } = require("commander");
const chalk = require("chalk");
const { generateExtension } = require("../lib/generator");

const program = new Command();

program
  .name("create-onnx-extension")
  .description("Create Chrome extensions with ONNX model support")
  .version("1.0.0")
  .argument("<extension-name>", "Name of the extension to create")
  .option(
    "-d, --description <description>",
    "Extension description",
    "An extension powered by ONNX models"
  )
  .option("-a, --author <author>", "Extension author", "Anonymous")
  .option("-v, --version <version>", "Extension version", "1.0.0")
  .action(async (extensionName, options) => {
    try {
      console.log(chalk.blue("🚀 Creating ONNX Chrome Extension..."));
      console.log();

      const config = {
        name: extensionName,
        description: options.description,
        author: options.author,
        version: options.version,
      };

      await generateExtension(config);

      console.log();
      console.log(chalk.green("✅ Extension created successfully!"));
      console.log();
      console.log(chalk.yellow("Next steps:"));
      console.log(`  1. cd ${extensionName}`);
      console.log("  2. npm install");
      console.log(
        "  3. Place your ONNX model at public/assets/models/model.onnx"
      );
      console.log("  4. npm run build");
      console.log(
        "  5. Load the build/ folder in Chrome extensions (Developer mode)"
      );
      console.log();
      console.log(chalk.blue("Happy coding! 🎉"));
    } catch (error) {
      console.error(chalk.red("❌ Error creating extension:"), error.message);
      process.exit(1);
    }
  });

program.parse();
