// import the svg module using the following rules
// Some value (the src) gets initialized and then export by default
declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
