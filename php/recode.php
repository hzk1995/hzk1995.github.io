<?php
	header("content-type:text/html;charset=utf-8");
	$responseData = array("code" => 0,"message" => "");
	$user = $_POST["user"];
	$pas = $_POST["pas"];
	if(!$user){
		$responseData['code'] = 1;
		$responseData['message'] = '用户名不能为空';
		echo json_encode($responseData);
		exit;
	}
	if(!$pas){
		$responseData['code'] = 2;
		$responseData['message'] = '密码不能为空';
		echo json_encode($responseData);
		exit;
	}
	$link = mysql_connect("localhost","root","123456");
	if(!$link){
		$responseData['code'] = 3;
		$responseData['message'] = '数据库连接失败';
		echo json_encode($responseData);
		exit;
	}
	mysql_set_charset("utf8");
	mysql_select_db("user");
	$md5 = md5($pas);
	$sql = "SELECT * FROM xxx WHERE user='{$user}' AND pas='{$md5}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if(!$row){
		$responseData['code'] = 4;
		$responseData['message'] = '用户名或密码错误';
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['message'] = '登录成功';
		echo json_encode($responseData);
		exit;
	}
	mysql_close($link);
?>