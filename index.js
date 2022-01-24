let fs = require('fs');
let simplify = require('@turf/simplify');
let truncate = require('@turf/truncate');
let union = require('@turf/union');
let geoJSONis = require('geojson-validation');

console.log('SUCCESS: require modules');

// Load file data

let shapeFileNames = fs.readdirSync('./shape-files');
let shape = {};
let shapeData = shapeFileNames.map(fileName => {
    shape = JSON.parse(fs.readFileSync('./shape-files/' + fileName));
    return shape.features[0].geometry;
});

console.log(shapeData[0]);

// Combine shapes

// console.log('is valide? ', geoJSONis.valid(shapeData[0]), geoJSONis.valid(shapeData[1]));

let finalShape = shapeData.reduce((total, current) => union.default(total, current));

console.log('total shape is: ', finalShape);

// Reduce precision to save file space

finalShape = truncate.default(finalShape, {
    precision: 5,
    coordinates: 2
});

// Simplify

finalShape = simplify.default(finalShape, {
    tolerance: 0.01,
    highQuality: true
});

// Write final result

fs.writeFileSync('./total-boundary-simplified.json', JSON.stringify(finalShape));