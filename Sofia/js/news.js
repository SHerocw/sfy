$(function(){
	/*加载头部*/
	$('header').load('common.html header');
	/*加载底部*/
	$('footer').load('common.html footer');
	/*加载固定定位*/
	$('.side_nav').load('common.html .side_nav', function() {
		$('body').append('<script src="js/common.js"><\/script>')
	});

	/*小屏右上角显示*/
	setTimeout(function() {
		$('.navx b').html('新闻中心');
		$('.nav_bottom>div').eq(6).find('.nav_text').addClass('cur').parent().siblings().removeClass('cur');
	}, 0);
	
	/*新闻数据加载*/
	(function(){
		var num = parseInt(location.search.substr(1,1))
		$.ajax({
			url:"news.json",
			success : function(res){
				var init = ''
				res.slice(0,10).forEach(function(o,i){
					init += `<li>
						<a href="newdetail.html?${i}" target="_blank">
							<div class="imglist"><img src="${o.imglist}"/></div>
							<div class="textlist">
								<h4>${o.textlist}</h4>
								<p>${o.timelist}</p>
							</div>
						</a>
					</li>`
				})
				$('.news_list').html(init)
				$('#page5').pagination({
					totalData : res.length,
					showData : 10,
					pageCount : res.length/10,
					current: 1,
					prevContent : '上一页',
					nextContent : '下一页',
					keepShowPN: true,
					mode: 'fixed',
					count: 4,
					jump: true,
					jumpBtn:'确定',
					callback : function(i){
						var arr = res.slice((i.getCurrent()-1)*10,i.getCurrent()*10)
						$('#page5').prepend(`<b>共${res.length}项</b><b>共${Math.ceil(res.length/10)}页</b>`)
						$('.page input').before('跳转到')
						$('.page input').after('页')
						var init = ''
						arr.forEach(function(o,i){
							init += `<li>
								<a href="newdetail.html?${i}" target="_blank">
									<div class="imglist"><img src="${o.imglist}"/></div>
									<div class="textlist">
										<h4>${o.textlist}</h4>
										<p>${o.timelist}</p>
									</div>
								</a>
							</li>`
						})
						$('.news_list').html(init)
					}
				})
				$('#page5').prepend(`<b>共${res.length}项</b><b>共${Math.ceil(res.length/12)}页</b>`)
				$('.page input').before('跳转到')
				$('.page input').after('页')
				
				if($('.newdetail').attr('req')=='ajax'){
					$('.newdetail h1').html(res[num].textlist)  
					$('.info_time').html(res[num].timelist)
					$('.new_con').html(res[num].newdetail)
					$('title').html(res[num].textlist)
					if(num == 0){
						$('.new_next').html(`下一篇： 无更多新闻`)
					}else{
						$('.new_next').html(`上一篇: <a href="newdetail.html?${num-1}">${res[num-1].textlist}</a>`)
					}
					$('.new_prev').html(`上一篇: <a href="newdetail.html?${num+1}">${res[num+1].textlist}</a>`)
				}	
			}
		});
	})();
	
	/*媒体报道*/
	(function(){
		var deg = parseInt(location.hash.substr(1,1))
		$.ajax({
			url : 'videos.json',
			success : function(res){
				var list = ''
				res.forEach(function(o,i){
					list += `<li><a href="news_video.html#${i}"><div class="vid_img"><img src="${o.img}"/><div class="shadow"></div></div><p>${o.text}</p></a></li>`
				})
				$('.report').append(list)
				if(location.hash !== ''){
					$('.videos').append(`<h3>${res[deg].text}</h3><video src="${res[deg].video}" controls autoplay></video>`)
				}	
			}
		})
	})()
})