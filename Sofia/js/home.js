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
		$('.navx b').html('首页');
		$('.nav_bottom>div').eq(0).find('.nav_text').addClass('cur').parent().siblings().removeClass('cur');
	},0);
	
	/*banner*/
	;(function(){
		var mySwiper1 = new Swiper('#swiper1', {
			autoplay: 5000,
			effect : 'fade',
			pagination : '.swiper-pagination',
			paginationType : 'bullets',
			paginationClickable :true,
			prevButton:'.button-prev',
			nextButton:'.button-next',
			loop : true,
		})
	})();
	
	/*大家居服务轮播*/
	(function(){
		$.ajax({
			url:"common_nav.json",
			async:false,
			success:function(res){
				var servearr = res.filter(function(item,index){
					return item.title == '大家居服务'
				})[0].main.slice(1);
				var noPro = ''
				var slide = '';
				var nav = '';
				servearr.forEach(function(v,i){
					noPro = i == 4 ? '' : '<span></span><a href="https://www.suofeiya.com/" class="go_mall">前往商城</a>'
					slide += `<div class="swiper-slide">
						    	<img src="${v.src}"/>
						    	<div class="swi_name">
						    		<i></i>
						    		<h5>${v.subtitle}</h5>
						    	</div>
						    	<div class="brief_box">
						    		<h6>${v.subtitle}</h6>
						    		<p>${v.brief}</p>
						    		<div>
						    			<a href="${v.href}" class="go_detail">查看详情</a>${noPro}
						    		</div>
						    	</div>
						    </div>`
					nav += `<li>${v.subtitle}</li>`
				})
				$('.turn_nav').append(nav)
				$('.my-swiper2').append(slide)
				$('.my-swiper3').append(slide)
				$('.my-swiper4').append(slide)
			}
		});
		var mySwiper2 = new Swiper('#swiper2', {
			autoplay: 3000,
			loop : true,
			slidesPerView : 'auto',
			loopedSlides :5,
			slidesPerView : 3,
			centeredSlides : true,
			spaceBetween : '5%',
			slideActiveClass : 'swiper-slide-active2',
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next'
		});
		var mySwiper3 = new Swiper('#swiper3', {
			autoplay: 3000,
			loop : true,
			slidesPerView : 'auto',
			loopedSlides :5,
			slidesPerView : 2,
			spaceBetween : '5%',
			slideActiveClass : 'swiper-slide-active2',
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
		});
		var mySwiper4 = new Swiper('#swiper4', {
			autoplay: 3000,
			loop : true,
			slidesPerView : 'auto',
			loopedSlides :5,
			centeredSlides : true,
		});
		$('#swiper2').hover(function(){
			mySwiper2.stopAutoplay();
		},function(){
			mySwiper2.startAutoplay();
		});
		$('.turn_nav li:first-child').addClass('cur')
		$('.turn_nav li').click(function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			mySwiper2.slideTo($(this).index())
			mySwiper3.slideTo($(this).index())
		})
	})();
	
})