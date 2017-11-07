require('babel-register')({presets: ['es2015']});


// require.extensions['.css'] = () => {
//   return;
// };
// require.extensions['.jpg'] = () => {
//   return;
// };
// require.extensions['.png'] = () => {
//   return;
// };
// require.extensions['.svg'] = () => {
//   return;
// };


console.log("loadd extensions");

require('./app.js');