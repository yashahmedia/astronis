const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, esModuleInterop:true}}).outputText, filename);
const {services} = require('../src/data/services.ts');
const {practices} = require('../src/data/service-identities.ts');
const {serviceFormConfig} = require('../src/data/serviceFormConfig.ts');
const {matchesService} = require('../src/data/service-search.ts');
const hierarchy = require('../src/data/service-hierarchy.json');
assert.equal(services.length,21);
assert.equal(new Set(services.map(s=>s.slug)).size,21);
assert.deepEqual(services.map(s=>[s.title,s.slug]),practices.map(s=>[s.title,s.slug]));
assert.deepEqual(serviceFormConfig.map(s=>s.label),services.map(s=>s.title));
const capabilities=services.flatMap(s=>[...s.subServices,...s.relatedCapabilities]);
for(const family of hierarchy) for(const group of family.subServices) {
  assert(capabilities.some(c=>c.title===group.title && JSON.stringify(c.children)===JSON.stringify(group.children)),`Missing workbook group: ${group.title}`);
}
for(const service of services) {
  assert(fs.existsSync('public'+service.image),`Missing image: ${service.image}`);
  assert.equal(new Set(service.subServices.map(s=>s.title)).size,service.subServices.length,`Duplicate capabilities: ${service.title}`);
  const words=service.shortDescription.split(/\s+/).length;
  assert(words>=30 && words<=50,`Description length: ${service.title} (${words})`);
}
const corporate=services[0];
assert(matchesService(corporate,'M&A','Transactions'));
assert(matchesService(corporate,'company private','All'));
assert(matchesService(services[1],'  DPDP  compliance ','Technology'));
assert(matchesService(services[6],'FEMA FDI','International'));
assert(!matchesService(corporate,'zzzzzz','All'));
assert(!matchesService(corporate,'','Risk'));
console.log('PASS: 21 identities, form parity, all 15 workbook families and exact child relationships, images, descriptions, search and filters.');
