const fs = require('fs').promises;
async function loadTemplateFileContent() {
  const data = await fs.readFile('./template.html');
  return Buffer.from(data);
}

(async function init() {
  const templateFile = await loadTemplateFileContent();
  const r = templateFile.toString();
  const w = r.split('{{');
  const components = w.slice(1).map((d) => d.split('}}')[0]);
  console.log(components);
  console.log(w);
})();
