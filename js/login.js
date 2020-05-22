define(['jquery'], function($) {
	function login1() {
		$('#login').click(function() {
			$(".show").css("display", "block").find('input').val('')
		})
		$(".show .close").click(function() {
			$(".show").css("display", "none")
		})
		$(".show .login .topnav li div").click(function() {
			$(this).addClass("active").parent('li').siblings("li").find('div').removeClass('active');
			$(".show form").eq($(this).parent('li').index()).css("display", 'flex').siblings("form").hide();
		})
	}

	function post() {
		var phone = false;
		var email = false;
		var user = false;
		var pas = false;
		var pas1 = false;
		var arr = ['请输入11位手机号','请输入邮箱账号','用户名可用中文数字字母组合','请输入6到16位密码区分大小写','请确认密码']
		$(".show .login .loginMain form .box input").focus(function(){
			$(this).parent('.input').siblings('div').css({
				'display': 'block',
				'background': "rgb(180,160,120)"
			}).text(arr[$(this).parent('.input').parent('.box').index() - 1])
		})
		$(".phonebox input").blur(function(){
			if ($(this).val()) {
				if (!(/^1[3456789]\d{9}$/.test($(this).val()))) {
					$('.phone').text('❗ 请填写正确的手机号').css('background', "rgb(255,100,0)");
					phone = false;
				} else {
					$('.phone').text('✔ 手机号格式正确').css('background', "rgb(100,255,0)");
					phone = true;
				}
			} else {
				$('.phone').css('display', 'none');
				phone = false;
			}
		})
		$('.emailbox input').blur(function(){
			if($(this).val()){
				if(!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test($(this).val()))){
					$('.email').text('❗ 请填写正确的邮箱').css('background', "rgb(255,100,0)");
					email = false;
				}else{
					$('.email').text('✔ 邮箱格式正确').css('background', "rgb(100,255,0)");
					email = true;
				}
			}else{
				$('.email').css('display', 'none');
				email = false;
			}
		})
		$('.pasbox input').blur(function(){
			if($(this).val()){
				if($(this).val().length < 6 || $(this).val().length > 16){
					$('.pas').text('❗ 密码长度为6到16位').css('background', "rgb(255,100,0)");
					pas = false;
				}else{
					if(!(/^\w{6,16}$/.test($(this).val()))){
						$('.pas').text('❗ 密码应为数字字母下划线组成').css('background', "rgb(255,100,0)");
						pas = false;
					}else{
						$('.pas').text('✔ 密码格式正确').css('background', "rgb(100,255,0)");
						pas = true;
						$(".pas1box input").blur(function(){
							if($(this).val() == $('.pasbox input').val()){
								$('.pas1').text('✔ 密码格式正确').css('background', "rgb(100,255,0)");
								pas1 = true;
							}else{
								$('.pas1').text('❗ 两次密码输入不一致').css('background', "rgb(255,100,0)");
								pas1 = false;
							}
						})
					}
				}
			}else{
				$('.pas').css('display', 'none');
				pas = false;
			}
		})
		$('.userbox input').blur(function(){
			if($(this).val()){
				if($(this).val().length >= 2 && $(this).val().length <= 6){
					if(!(/^[\u4E00-\u9FA5]+$/.test($(this).val()))){
						$('.user').text('❗ 用户名为2到6位的汉字').css('background', "rgb(255,100,0)");
						user = false;
					}else{
						$('.user').text('✔ 用户名格式正确').css('background', "rgb(100,255,0)");
						user = true;
					}
				}else{
					$('.user').text('❗ 用户名为2到6位的汉字').css('background', "rgb(255,100,0)");
					user = false;
				}
			}else{
				$('.user').css('display', 'none');
				user = false;
			}
		})
		$('.loginMain form .but1').click(function(){
			if(phone && email && pas && pas1 && user){
				$.ajax({
					type:'post',
					url:'php/login.php',
					data:{
						user:$(".userbox input").val(),
						phone:$(".phonebox input").val(),
						pas:$('.pasbox input').val(),
						time:new Date().getTime()
					},
					success:function(response){
						var res = JSON.parse(response);
						if(!res.code){
							$(".loginMain .dl").show().css("display","flex").siblings("form").hide().find("input").val("")
						}
					},
					error:function(msg){
						alert(msg)
					}
				})
			}else{
				if(!phone){
					alert("手机号格式错误");
					return false;
				}
				if(!email){
					alert("邮箱格式错误");
					return false;
				}
				if(!pas){
					alert("密码格式错误");
					return false;
				}
				if(!pas1){
					alert("密码不一致");
					return false;
				}
				if(!user){
					alert("用户名格式错误");
				}
			}
			return false;
		})
		
	}
	function get(){
		$(".loginMain .dl .but2").click(function(){
			
			$.ajax({
				type:"post",
				url:"php/recode.php",
				data:{
					user:$(".dl .userbox input").val(),
					pas:$(".dl .pasbox input").val()
				},
				success:function(response){
					var res = JSON.parse(response);
					$(".tishi").html(res.message)
					if($('.tishi').html() == "登录成功"){
						$("#login").html($(".dl .userbox input").val());
						$(".show").hide()
						$(".tishi").html("")
					}
				},
				error:function(msg){
					alert(msg)
				}
			})
		})
	}
	return {
		login1: login1,
		post: post,
		get:get
	}
})
