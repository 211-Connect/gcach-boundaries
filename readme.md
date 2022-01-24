# GCACH Boundaries

The `total-boundary-?*.json` files define the geographic boundaries of the total service area for the Greater Columbia ACH. Of the three, `total-boundary.json` is the most precise, and `total-boundary-simplified.json` is the best balance of accuracy and file size.

`index.js` describes how we created the total boundary, and can be used to regenerate future shapes, possible with more aggressive simplification if an even smaller file size is required.

`./shape-files` were pulled from census data.