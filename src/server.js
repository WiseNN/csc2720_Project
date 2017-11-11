require('babel-register')({
	presets: ['es2015'],
	plugins: [
		'babel-plugin-transform-es2015-destructuring',
		'transform-es2015-parameters',
		'transform-object-rest-spread'
	]
});


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


console.log("loaded extensions");

require('./app.js');