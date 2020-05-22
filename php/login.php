<?php
	header("content-type:text/html;charset=utf-8");
	$responseData = array('code'=>0,'massage'=>'');
	$user = $_POST['user'];
	$phone = $_POST['phone'];
	$pas = $_POST['pas'];
	$time = $_POST['time'];
	$link = mysql_connect("localhost",'root',"123456");
	if(!$link){
		$responseData['code'] = 1;
		$responseData['massage'] = '链接数据库失败';
		echo json_encode($responseData);
		exit;
 	}
	mysql_set_charset('utf8');
	mysql_select_db("user");
	$sql = "SELECT * FROM xxx WHERE user = '{$user}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_array($res);
	if($row){
		$responseData['code'] = 2;
		$responseData['massage'] = '该用户名已存在';
		echo json_encode($responseData);
		exit;
	}
	$md5 = md5($pas);
	$sql1 = "INSERT INTO xxx(user,phone,pas,time) VALUES('{$user}','{$phone}','{$md5}','{$time}')";
	$res1 = mysql_query($sql1);
	if(!$res1){
		$responseData['code'] = 3;
		$responseData['massage'] = '注册失败，请重试';
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['code'] = 0;
		$responseData['massage'] = '注册成功';
		echo json_encode($responseData);
	}
	mysql_close($link);
?>