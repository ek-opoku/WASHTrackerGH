const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname + '/..').filter(f => f.endsWith('.xlsx'));
const output = {};

files.forEach(f => {
    output[f] = {};
    try {
        const wb = xlsx.readFile(path.join(__dirname, '..', f));
        wb.SheetNames.forEach(sheetName => {
            const ws = wb.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
            output[f][sheetName] = [];
            for (let i = 0; i < Math.min(data.length, 3); i++) {
                output[f][sheetName].push(data[i]);
            }
        });
    } catch (e) {
        output[f].error = e.message;
    }
});

fs.writeFileSync(path.join(__dirname, '..', 'excel_headers.json'), JSON.stringify(output, null, 2));
