const fs = require('fs');
let c = fs.readFileSync('node_modules/datamaps/dist/datamaps.ind.js', 'utf8');
let start = c.indexOf('"type":"Topology"');
let jsonStr = '{' + c.substring(start);
let end = jsonStr.lastIndexOf('}');
jsonStr = jsonStr.substring(0, end+1);
try {
  let obj = JSON.parse(jsonStr);
  console.log("Successfully parsed JSON!", Object.keys(obj.objects || {}));
  fs.writeFileSync('public/india.json', jsonStr);
} catch(e) {
  console.error("Parse fail", e);
}
