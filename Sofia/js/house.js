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
		$('.navx b').html('大家居服务');
		$('.nav_bottom>div').eq(3).find('.nav_text').addClass('cur').parent().siblings().removeClass('cur');
	}, 0);
	
	/*视频效果*/
	$('.mp4_img').click(function(){
		$(this).hide().siblings().prepend('<video width="100%" controls autoplay><source src="video/11.mp4" type="video/mp4"></source></video>').find('.vid_close').show()
	})
	$('.vid_close').click(function(){
		$(this).hide().parent().siblings('.mp4_img').show().siblings().find('video').remove()
	});
	/*视频小窗模式*/
	$(window).scroll(function(){
		console.log()
		if($(window).scrollTop() >= 640 && $(window).width() > 460){
			$('.video_wrap').addClass('video_cur')
		}else{
			$('.video_wrap').removeClass('video_cur')
		}
	});
	
	/*大家居轮播图*/
	(function(){
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 5000,
			effect : 'fade',
			loop : true ,
			onSlideChangeStart(swiper){
				$('.room_dir>div').eq(swiper.activeIndex -1).addClass('cur').siblings().removeClass('cur')
			}
		})
		$('.room_dir>div').mouseover(function(){
			$(this).addClass('cur').siblings().removeClass('cur')
			mySwiper.slideTo($(this).index()+1)
		})
	})();
	/*大家居全屏轮播通用*/
	(function(){
		$('.pics img').click(function(){
			$(this).parents('.pics').siblings('.fullScreenPic').show().height('100%')
			var mySwiper1 = new Swiper('.swiper-container1',{
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				initialSlide : $(this).parent().index()
			})
			setTimeout(function(){
				$('.full_btn').height(0)
			},3000)
		})
		$('.fullScreenPic').click(function(){
			$(this).find('.full_btn').height(50)
			setTimeout(function(){
				$('.full_btn').height(0)
			},3000)
		})
		$('.full_close').click(function(){
			$('.fullScreenPic').hide(500)
		})
	})();
	/*轮播通用*/
	var mySwiper2 = new Swiper('.swiper-container2',{
		autoplay : 3000,
		loop : true,
		pagination : '.swiper-pagination',
		paginationClickable :true,
	})
	
	/*品牌产品图片展示*/
	$.ajax({
		url:"pro_pics.json",
		success : function(res){
			var num = $('.all_pro').attr('type')
			var nav = ''
			var pics = ''
			var swis = ''
			var swiper = ''
			if(num != undefined){
				res[num].pros.forEach(function(o,i){
					nav += `<li>${o.name}</li>`
					var pic = ''
					var swi = ''
					o.pics.forEach(function(p,i){
						pic += `<div><img src="${p.src}"/><p>${p.text}<i></i></p></div>`
						swi += `<div class="swiper-slide swiper-no-swiping"><img src="${p.src}"/></div>`
					})
					pics += `<div class="pics clearfix">${pic}</div>`
					swis = `<div class="swiper-wrapper">${swi}</div>`
				})
				
				swiper = `<div class="swiper-container1">${swis}
							<div class="full_btn">
							  	<div class="container common">
								  	<div class="swiper-button-prev"></div>
		   							<div class="swiper-button-next"></div>
							  	</div>
							  </div>
							</div>
							<div class="full_close">×</div>
						</div>`
				$('.fullScreenPic').append(swiper)
				$('.all_pro').prepend(`<h2 class="comh2">${res[num].title}</h2><div class="pro_nav clearfix">${nav}</div>`)
				$('.all_pro').append(`<div class="pro_pics clearfix">${pics}</div>`)
				$('.pro_nav li:first').addClass('cur')
				$('.pro_nav li').click(function(){
					$(this).addClass('cur').siblings().removeClass('cur');
					$('.pics,.bri').eq($(this).index()).show().siblings().hide();
				})
			}
			$('.pics img').click(function(){
				$(this).parents('.all_pro').siblings('.fullScreenPic').show().height('100%')
				var mySwiper1 = new Swiper('.swiper-container1',{
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
					initialSlide : $(this).parent().index()
				})
				setTimeout(function(){
					$('.full_btn').height(0)
				},5000)
			})
			$('.full_close').click(function(){
				$('.fullScreenPic').hide(500)
			})
		}
	});
})