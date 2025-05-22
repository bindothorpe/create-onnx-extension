const fs = require("fs-extra");
const path = require("path");

/**
 * Copy template directory to target directory
 */
async function copyTemplate(templateDir, targetDir) {
  await fs.copy(templateDir, targetDir, {
    filter: (src) => {
      // Skip node_modules if they exist in template
      return !src.includes("node_modules");
    },
  });
}

/**
 * Replace template variables in a file
 */
async function replaceTemplateVariables(filePath, config) {
  if (!(await fs.pathExists(filePath))) {
    return;
  }

  let content = await fs.readFile(filePath, "utf8");

  // Replace template variables
  content = content.replace(/\{\{extensionName\}\}/g, config.name);
  content = content.replace(
    /\{\{extensionDescription\}\}/g,
    config.description
  );
  content = content.replace(/\{\{extensionAuthor\}\}/g, config.author);
  content = content.replace(/\{\{extensionVersion\}\}/g, config.version);

  // Generate safe package name (lowercase, no spaces)
  const safePackageName = config.name.toLowerCase().replace(/\s+/g, "-");
  content = content.replace(/\{\{packageName\}\}/g, safePackageName);

  await fs.writeFile(filePath, content, "utf8");
}

module.exports = {
  copyTemplate,
  replaceTemplateVariables,
};
