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
		$('.navx b').html('可持续发展');
		$('.nav_bottom>div').eq(5).find('.nav_text').addClass('cur').parent().siblings().removeClass('cur');
	}, 0);
	
	/*绿色环保轮播*/
	var mySwiperA = new Swiper('.swiper-containerA', {
		autoplay: 5000,
		loop : true
	})
	var mySwiperB = new Swiper('.swiper-containerB', {
		loop : true,
		pagination : '.swiper-pagination',
		paginationClickable :true
	})
})