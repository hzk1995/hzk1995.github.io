define(["jquery","jquery-cookie"],function($){
	function btn(){
		$("#j-app").on("click",".z-dis",function(){
			var num = $(this).siblings("input").val();
			if($(this).text() == "-"){
				if(num != 1){
					num--
				}
			}else{
				num++
			}
			$(this).siblings("input").val(num)
		})
	}
	function car(){
		num()
		show()
		$("#j-app").on("click",".car",function(){
			 var id = location.search.substr(4)
			 var first = $.cookie("goods") == null ? true : false;
			 if(first){
			 	//是第一次存储
			 	var arr = [{id: id, num: parseInt($(".u-selnum input").val())}];
			 	$.cookie("goods", JSON.stringify(arr), {
			 		expires: 7
			 	})
			 }else{
			 	//判断之前是否添加过
			 	var cookieStr = $.cookie("goods");
			 	var cookieArr = JSON.parse(cookieStr);
			 	var same = false; //假设没有存储过
			 	//通过循环遍历是否有之前存储过的商品
			 	for(var i = 0; i < cookieArr.length; i++){
			 		if(cookieArr[i].id == id){
			 			cookieArr[i].num += parseInt($('.u-selnum input').val());
			 			same = true;
			 			break;
			 		}
			 	}
			 
			 	//判断如果没有添加过
			 	if(!same){
			 		var obj = {id: id, num: parseInt($(".u-selnum input").val())};
			 		cookieArr.push(obj);
			 	}
			 
			 	$.cookie("goods", JSON.stringify(cookieArr), {
			 		expires: 7
			 	})
				
			 }
			 num()
			 show()
			$(".gwcbox").show(2000,function(){
				setTimeout(function(){
					$(".gwcbox").hide(500)
				},2000)
			}).css("display","flex")
			
		})
		$(".gwc").on("click","b",function(){
			var id = $(this).parent(".shopbox").remove().attr("id");
			var cookieArr = JSON.parse($.cookie("goods"));
			for(var i = 0;i<cookieArr.length;i++){
				if(id == cookieArr[i].id){
					cookieArr.splice(i, 1);
					break;
				}	
			}
			if(cookieArr.length){
			    $.cookie("goods", JSON.stringify(cookieArr), {
			        expires: 7
			    })
			}else{
			    $.cookie("goods", null);
			}
			num()
			show()
		})
		//统计购物车商品数量
		function num(){
			var cookieStr = $.cookie("goods")
			if(cookieStr){
				var cookieArr = JSON.parse(cookieStr);
				var sum = 0
				for(var i = 0;i<cookieArr.length;i++){
					sum += cookieArr[i].num;
				}
				
				$(".gwc .num").html(sum);
				
				
			}else{
				$(".gwc .num").html(0);
			}
		}
		//给购物车加入商品
		function show(){
			$.ajax({
				type:"get",
				url:"../data/item.json",
				success:function(data){
					var cookieStr = $.cookie("goods");
					if(cookieStr){
						var cookieArr = JSON.parse(cookieStr);
						var arr = []
						for(var i = 0;i<data.length;i++){
							for(var j = 0;j<cookieArr.length;j++){
								if(data[i].id == cookieArr[j].id){
									data[i].num = cookieArr[j].num
									arr.push(data[i]);
								}
							}
						}
						$(".gwcbox .main").empty()
						var sum = 0
						for(var i = 0;i<arr.length;i++){
							sum += (arr[i].price*arr[i].num);
							$(`<div class="shopbox" id="${arr[i].id}">
								<img src="${arr[i].img}" alt="">
								<div class="center">
									<p class='p11'>${arr[i].name}</p>
									<div><p>${arr[i].title}</p><span>x</span><span class="number">${arr[i].num}</span></div>
								</div>
								<div class="right">￥${arr[i].price}</div>
								<b>X</b>
							</div>`).appendTo($(".gwcbox .main"))
						}
						$(".left .price").html(`￥${sum}`)
					}
				
				}
			})
			
		}
	}
	function showbox(){
		var flag = false
		$('.gwc').mouseenter(function() { flag = true; }).mouseleave(function() { flag = false; }); 
		$(".gwc").mouseenter(function(){
			$(".gwcbox").css("display","flex").show(500,function(){
				$(".gwc").mouseleave(function(){
			setTimeout(function(){
				if(!flag){
					$(".gwcbox").hide(500)
				}
			},1000)
		})
			})
		})
	}
	return{
		btn:btn,
		car:car,
		showbox:showbox
	}
})