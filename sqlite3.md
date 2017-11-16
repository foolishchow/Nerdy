# use sqlite3 with electron


> intro

recently I'm working on a project with electron and sqlite3 .
it works well in `mac osX` , but it costs me a lot to rebulid it in windows.

> problems you may have.

To rebuild native modules in node. you should know sth. about [`node-gyp`][node-gyp]

1. stuck in install packages
    
	- in `yarn`
	```shell
	yarn
    yarn install v0.24.4
    [1/4] Resolving packages...
    [2/4] Fetching packages...
    [3/4] Linking dependencies...
    [4/4] Building fresh packages...
    [1/2] ⠁ electron
    [2/2] ⠂ sqlite3: gyp-info ok
    [-/2] ⠂ waiting...
    [-/2] ⠂ waiting...
    [-/2] ⠂ waiting...
	```

    - in `npm install`
	
	```shell
	> electron@1.6.7 postinstall D:\codes\myProject\node_modules\electron
    > node install.js
	```
	
    this is downloading `electron` dependencies , when face this , you probably in China .
    Yes , time to use mirrors .
	```shell
	npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
	```
	
	**Next steps if you are in windows**  please ensure you have get the administrator auth.
	
	
2. build native modules for `sqlite3`   
    `tips` : please do as `node-gyp` told . It works .
	
	when you face the error .
	```shell
	“C:\Users\Administrator\.node-gyp\gypVersion\Release\node.lib : fatal error LNK1106: 
	文件无效或磁盘已满: 无法查找到 0x164FE 
	[D:\Project\node_modules\sqlite3\build\node_sqlite3.vcxproj] 
    gyp ERR! build error” 
	```
    `key words` : `fatal error LNK1106:`
	
	- solution:  
	delete the floder `.node-gyp`. my floder path is `C:\Users\Administrator\.node-gyp`
    
	
3. rebuild native modules of `sqlite3` for `electron`  
    `tips` : please do as `node-gyp` told . It works .
	
	when you face the error .
	```shell
	“C:\Users\Administrator\.node-gyp\gypVersion\Release\node.lib : fatal error LNK1106: 
	文件无效或磁盘已满: 无法查找到 0x164FE 
	[D:\Project\node_modules\sqlite3\build\node_sqlite3.vcxproj] 
    gyp ERR! build error” 
	```
    `key words` : `fatal error LNK1106:`
	
	- solution:  
	delete the floder `.electron-gyp`. my floder path is `C:\Users\Administrator\.electron-gyp`
    
		
	
[node-gyp]: https://www.npmjs.com/packages/node-gyp "node-gyp"

