const { generateExtension } = require("./generator");
const { copyTemplate, replaceTemplateVariables } = require("./file-utils");

module.exports = {
  generateExtension,
  copyTemplate,
  replaceTemplateVariables,
};
