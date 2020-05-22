console.log("加载成功");

/* 
	配置所有引入的.js文件的路径
 */
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"nav":"nav",
		"index":"index",
		"login":"login"
	},
	shim:{
		"jquery-cookie":["jquery"]
	}
	
})



//遵从amd规范编写代码
require(["nav","index","login"],function(nav,index,login){
	nav.lbt();
	nav.top();
	index.download();
	login.login1();
	login.post();
	login.get();
})