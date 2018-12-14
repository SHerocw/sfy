$(function(){
	/*加载头部*/
	$('header').load('common.html header');
	/*加载底部*/
	$('footer').load('common.html footer');
	/*加载固定定位*/
	$('.side_nav').load('common.html .side_nav',function(){
		$('body').append('<script src="js/common.js"><\/script>')
	});
	
	/*小屏右上角显示*/
	setTimeout(function(){
		$('.navx b').html('公司简介');
		$('.nav_bottom>div').eq(1).find('.nav_text').addClass('cur').parent().siblings().removeClass('cur');
	},0);
	
	/*主体内容*/
	(function(){
		$.ajax({
			url:"about_us.json",
			success:function(res){
				/*公司简介*/
				var topTitle = ''
				res[0].forEach(function(v,i){
					topTitle += `<div class="clearfix"><h1>${v.title}</h1></div>`
				})
				$('.each_company').append(topTitle)
				var comTotal = `<div>
					<img src="${res[0][0].src}"/>
					<div class="text">${res[0][0].text}</div>
				</div>`;
				$('.each_company>div:first-child').append(comTotal);
				
				res[0][1].ranges.forEach(function(v,i){
					var subTitle = '';
					var eachItem = '';
					v.each.forEach(function(e,i){
						eachItem += `<div class="clearfix item${i%2}">
							<img src="${e.pic}" class="wow zoomIn"/>
							<div class="text wow lightSpeedIn">
								<h3>${e.company}</h3>
								<p>${e.brief}</p>
							</div>
						</div>`
					})
					subTitle = `<div class="sub_title"><h2>${v.name}</h2>${eachItem}</div>`
					$('.each_company>div:last-child').append(subTitle)	
				})
				
				/*大事记*/
				res[1].forEach(function(v,i){
					var box = `<div class="evt_box">
						<i class="dot"></i>
						<div class="evt_time">${v.time}</div>
						<div class="evt_detail">
							<img src="${v.pic}"/>
							<div class="evt_brief">${v.brief}</div>
						</div>
					</div>`;
					$('.event').append(box)
				})
			}
		});
		
		/*企业荣誉*/
		var slides = null;
		var allowSwiper = false;
		function banner(){
			if($('body').width()>=1000){
				autoplay = true;
				slides = 4;
				allowSwiper = false;
				loop1 = false;
				loop3 = false;
				pagination = ''
			}else if($('body').width()>=500&&$('body').width()<1000){
				autoplay = 3000;
				slides = 3;
				allowSwiper = true;
				loop1 : true;
				loop3 = false;
				pagination = ''
			}else if($('body').width()<500){
				autoplay = 3000;
				slides = 1;
				allowSwiper = true;
				loop1 = true;
				loop3 = true;
				pagination = '.swiper-pagination'
			}
			var mySwiper1 = new Swiper('.swiper-container1', {
				autoplay : autoplay,
				slidesPerView :slides,
				allowSwipeToNext : allowSwiper,
				allowSwipeToPrev : allowSwiper,
				spaceBetween : 20,
				loop : loop1,
				pagination : pagination,
				paginationType : 'fraction'
			})
			var mySwiper2 = new Swiper('.swiper-container2', {
				autoplay : 3000,
				slidesPerView :slides,
				spaceBetween : 20,
				loop : true,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				pagination : pagination,
				paginationType : 'fraction'
			})
			var mySwiper3 = new Swiper('.swiper-container3', {
				autoplay : autoplay,
				slidesPerView :slides,
				allowSwipeToNext : allowSwiper,
				allowSwipeToPrev : allowSwiper,
				spaceBetween : 20,
				loop : loop3,
				pagination : pagination,
				paginationType : 'fraction'
			})
		}
		banner()
		$(window).resize(banner)
	})();
})