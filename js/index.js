define(["jquery"],function($){
	function download(){
		$.ajax({ 
			type:"get",
			url:"data/index.json",
			success:function(data){
				var banner = data.nav.banner;
				var tillte = data.tillte;
				var mask = data.main.brand;
				var news = data.main.new;
				var popularity = data.main.Popularity;
				var dd = $(`<dd></dd>`)
				
				var picbox = $("<div class='picbox'></div>");
				for(var i = 0;i < tillte.length;i++){
					var node = `<li>
									<a href="">${tillte[i]}</a>
								</li>`
					$(".navbox nav dl dd .nav1").append(node)
				}
				for(var j = 0;j < banner.length;j++){
					var node1 = `<li></li>`;
					var node2 = `<li style="background: url(${banner[j].img});"></li>`
					$("#div1 #ol1").append(node1);
					$("#div1 ul").append(node2);
				}
				for(var z = 0;z < 2;z++){
					var node4 =`<div class="pic mask">
									<div class="name">
										<h2>${mask.small[z].business}</h2>
										<span>${mask.small[z].price}</span>
									</div>
									<img src="${mask.small[z].img}" >
								</div>`;
					var node3 = `<div class="mask">
								<div class="name">
									<h2>${mask.big[z].business}</h2>
									<span>${mask.big[z].price}</span>
								</div>
								<img src="${mask.big[z].img}" >
							</div>`;
					$(".mainbox main .Producers .maskbox").append(node3);
					picbox.append(node4);
				}
				$(".mainbox main .Producers .maskbox").append(picbox);
				for(var a = 0;a < news.length;a++){
					var node5 = `<a href='' id='${news[a].id}' class="list shop">
										<div class="ulbox">
											<ul>
												<li><img src="${news[a].img1}" ></li>
												<li><img src="${news[a].img2}" ></li>
											</ul>
										</div>
										<div class="message">
											<p>${news[a].tillte}</p>
											<div class="posi">
												<p>${news[a].name}</p>
												<span>${news[a].price}</span>
											</div>
										</div>
									</a>`
					$(".mainbox main .Producers .newpic").append(node5)
				}
				$(".popularitybox .popularity .dlbox .dl1").append(`<dt>
								<a href='' id="${popularity.top.left.id}" class="mask shop">
									<img src="${popularity.top.left.img}" >
								</a>
								<div class="message">
									<p>${popularity.top.left.labal}</p>
									<div class="posi">
										<p>${popularity.top.left.commodity}</p>
										<span>${popularity.top.left.price}</span>
									</div>
								</div>
							</dt>`)
				for(var b = 0;b < popularity.top.right.length;b++){
					var node6 = `<a href='' class="maskbox shop" id="${popularity.top.right[b].id}">
									<div class="mask">
										<img src="${popularity.top.right[b].img}" >
									</div>
									<div class="message">
										<p>${popularity.top.right[b].labal}</p>
										<div class="posi">
											<p>${popularity.top.right[b].commodity}</p>
											<span>${popularity.top.right[b].price}</span>
										</div>
									</div>
								</a>`
					dd.append(node6)
				}
				$(".popularitybox .popularity .dlbox .dl1").append(dd)
				href()
			},
			error:function(msg){
				console.log(msg)
			}
		})
	}
	function href(){
		$(".shop").click(function(){
			window.open(`html/item.html?id=${$(this).attr("id")}`)
		})
	}
	return{
		download:download
	}
})