/* 
	遵从AMD规范编写代码
 */
define(["jquery"],function($){
	function lbt(){
		var isNow = 0;
		$('#div1 ol li').hover(function(){
			isNow = $(this).index();
			tab();
		})
		var timer = setInterval(function(){
			isNow++;
			if(isNow == 8){
				isNow = 0;
			}
			tab();
		},2000);
		$("#div1").hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
				isNow++;
				if(isNow == 8){
					isNow = 0;
				}
				tab();
			},2000);
		})
		$("#div1 button").click(function(){
			if($(this).attr("class") == "zuo iconfont icon-zuo "){
				if(isNow == 0){
					isNow = 7;
				}else{
					isNow--
				}
			}else{
				if(isNow == 7){
					isNow = 0;
				}else{
					isNow++;
				}
			}
			tab()
		})
		function tab(){
			$('#div1 ul').css({
					top:isNow * -420
			})
		}
		
	}
	function top(){
		$(".navbox nav dl dd .nav1").on("mouseenter",'li',function(){
			$(".navbox nav dl dd .nav1 div").html('');
			$(".navbox nav dl dd div").css({'display':'flex','padding':"20px"});
			var _this = $(this);
			
			$.ajax({
				type:'get',
				url:'../data/nav.json',
				success:function(arr1){
					var arrs = arr1[_this.index() - 1];
					
					for(var i = 0; i< arrs.length;i++){
						var node1  =$(`<dl>
											<dt>${arrs[i][0]}</dt>
				 				</dl>`)
						node1.appendTo('.navbox nav dl dd .nav1 div');
						for(var j = 0;j < arrs[i][1].length;j++){
							var node2 =$(`<dd>
											<img src="${arrs[i][1][j].img}" >
											<span>${arrs[i][1][j].title}</span>
										</dd>`)
							$('.navbox nav dl dd .nav1 div dl').eq(i).append(node2)
						}
					}
					console.log(1)
					
				},
				error:function(msg){
					alert(msg);
				}
			})
		}).on("mouseleave",function(){
			$(".navbox nav dl dd div").css({'display':'none',"padding":0})
		})
			
	}
	return{
		lbt:lbt,
		top:top
	}
})