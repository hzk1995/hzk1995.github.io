console.log("加载成功");

/* 
	配置所有引入的.js文件的路径
 */
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"fdj":"fdj",
		"car":"car"
	},
	shim:{
		"jquery-cookie":["jquery"],
		"car":["fdj"]
	}
	
})



//遵从amd规范编写代码
require(["fdj","car"],function(fdj,car){
	fdj.fdj();
	car.btn();
	car.car();
	car.showbox();
})