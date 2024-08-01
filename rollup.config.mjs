import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'build/visual-modeller.min.js',
        	name: 'visualModeller',
			format: 'iife', 
			sourcemap: true,
			plugins: [terser()]
		},
		{
			file: 'build/visual-modeller.js',
			format: 'esm'
		}
	],
	plugins: [
		resolve(), 
		commonjs(), 
		replace({preventAssignment: true, 'process.env.NODE_ENV': JSON.stringify( 'development' )})
	]

};


