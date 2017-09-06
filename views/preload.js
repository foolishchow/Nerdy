process.once('loaded', () => {
	const path = require('path'),
		root = path.resolve(__dirname,'..');;
	
	const {enhance} = require('electron-nokogiri/lib/utils');
	enhance({
		root:root
	});
	// make .vue .css requirable 
	enhance.styleToProtocol((filePath)=>`nerdy://${path.relative(root,filePath)}?type=vue-style-loader`)
	enhance.requireVue({
		style({module, filePath}){
        	return `nerdy://${path.relative(root,filePath)}?type=vue-style-loader`;
		}
	})

	const manacoPath = function (_path){
		_path = path.join(__dirname, _path);
		var pathName = path.resolve(_path).replace(/\\/g, '/');
		if (pathName.length > 0 && pathName.charAt(0) !== '/') {
			pathName = '/' + pathName;
		}
		return encodeURI( pathName);
	}
	
	global.manaco_path = manacoPath('../node_modules/monaco-editor/min/');
	const {fetcher,webSocket} = require('electron-nokogiri/lib/web');
	const Vue = require('vue');
	global.Vue = Vue;
	const Vuex = require('vuex');
	global.Vuex = Vuex;
	global.manacoPath = manacoPath;
	global.fetcher = fetcher;
	global.webSocket = webSocket;
	global.markdown = require('@.root.src.markdown')
	// here Vue is loaded earlier than vue-devtools , so init the tool in hand
	let vueTools = setInterval(()=>{
		if(__VUE_DEVTOOLS_GLOBAL_HOOK__){
			__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init',Vue);
			clearInterval(vueTools);
		}
	},20)
});