define(["jquery"],function($){
	function fdj(){
		$("#j-app .picsWrap").mouseenter(function(){
				$('.hk,.img2').remove()
				$(`<div class='img2'></div>`).html($(this).html()).appendTo($(this).parent(".m-slide"))
				$(`<div class='hk'></div>`).appendTo($(this))
				
				$('#j-app .picsWrap').mousemove(function(e){
					var sizel = parseInt($(".hk").css("width"));
					var sizet = parseInt($(".hk").css("height"));
					var l = e.pageX - $(this).offset().left - sizel*0.5;
					var t = e.pageY - $(this).offset().top - sizet*0.5;
					if(l <= 0){
						l = 0;
					}
					if(l >= (parseInt($(this).css("width")) - sizel)){
						l = parseInt($(this).css("width")) - sizel
					}
					if(t <= 0){
						t = 0
					}
					if(t >= (parseInt($(this).css("height")) - sizet - 4)){
						t = parseInt($(this).css("height")) - sizet -4
					}
					$(".hk").css({
						top:t,
						left:l
					})
					$(".img2 img").css({
						top:t*-2,
						left:l*-2
					})
				})
		}).mouseleave(function(){
			$('.hk,.img2').remove()
		})
	}
	function change(){
		fdj()
		$("ul.data-reactid").on("click","a",function(){
			$(".picsWrap").html($(this).html())
			fdj()
			return false
		})
	}
	function download(){
		var id = location.search.substr(4);
		$(".gwc").find(".gwcbox").hide()
		$.ajax({
			type:"get",
			url:"../data/item.json",
			success:function(data){
				var obj = data[id];
				$(`
			<div class="m-crumb">
				<span><span class="crumb-name">首页</span> > </span>
				<span><a class="crumb-url" href="">${obj.parents}</a> > </span>
				<span><a class="crumb-url" href="">${obj.parent}</a> > </span>
				<span class="crumb-name">${obj.name}</span>
			</div>
			<div class="m-tetail">
				<div class="m-slide">
					<div class="magnifier">
						🔍
					</div>
					<div class="picsWrap">
						<img src="${obj.img}" alt="" class="thumbimg">
					</div>
					<ul class="data-reactid">
						<li class="data-reactid"><a href=""><img src="${obj.list[0]}" alt=""></a></li>
						<li class="data-reactid"><a href=""><img src="${obj.list[1]}" alt=""></a></li>
						<li class="data-reactid"><a href=""><img src="${obj.list[2]}" alt=""></a></li>
						<li class="data-reactid"><a href=""><img src="${obj.list[3]}" alt=""></a></li>
						<li class="data-reactid"><a href=""><img src="${obj.list[4]}" alt=""></a></li>
					</ul>
				</div>
				<div class="m-info">
					<div class="intro">
						<div class="name">
							<span>${obj.name}</span>
							<p>${obj.title}</p>
						</div>
						<span class="data-reactid">
							<span class="f-fz20">97.9%</span>
							<br>
							<span class="f-fz13">好评率 ></span>
						</span>
					</div>
					<div class="price u-formctr">
						<div class="f-clearfix">
							<div class="label">价格</div>
							<span class="rp">
								<span class="rmb">￥</span>
								<span class="num">${obj.price}</span>
							</span>
						</div>
						<div class="m-feedbackBonus f-clearfix">
							<div class="label">购物返</div>
							<div class="right">
								<span class="r1">新用户最高返</span>
								<span class="r2">${obj.fanli}</span>
							</div>
						</div>
						<div class="field pointlnfo f-clearfix">
							<div class="label">限制</div>
							<span class="poinCt"></span>
						</div>
						<div class="field pointlnfo f-clearfix">
							<div class="label">配送</div>
							<span class="poinCt">至山东省</span>
						</div>
						<div class="field server f-clearfix">
							<div class="label">服务</div>
							<ul class="policyBox">
								<li>不支持无忧退换货</li>
								<li>48小时快速退款</li>
								<li>不参加88免邮</li>
								<li>未央满99免邮</li>
								<li>国内仅部分地区支持配送</li>
								<li>不支持红包支付</li>
								<li>不享受企业特权</li>
								<li>不享受学生特权</li>
							</ul>
						</div>
					</div>
					<div class="f-clearfix1">
						<div class="name">数量</div>
						<div class="u-selnum">
							<span class="less z-dis">-</span>
							<input type="text" value="1">
							<span class="more z-dis">+</span>
						</div>
					</div>
					<div class="btns">
						<a href="#" class="btn">立即购买</a>
						<a onclick="return false" href="" class="btn car"><i class="iconfont icon-gouwuchekong"></i>加入购物车</a>
					</div>
				</div>
			</div>`).appendTo($("#j-app"))
			change()
			},
			error:function(msg){
				console.log(msg)
			}
		})
	}
	return{
		fdj:download
	}
})