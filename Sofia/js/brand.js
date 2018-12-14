$(function() {
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
		$('.navx b').html('品牌优势');
		$('.nav_bottom>div').eq(2).find('.nav_text').addClass('cur').parent().siblings().removeClass('cur');
	}, 0);

	/*主体内容*/
	/*鼠标经过与滚轮效果之生产制造*/
	(function() {
		$(document).one('mousewheel DOMMouseScroll', function(e) {
			$('.dot span').css('opacity', 1)
			var num1 = 0;
			var num2 = 0
			var add = setInterval(function() {
				if(num1 < 1350 && num2 < 3000) {
					num1 += 100;
					num2 += 200
				} else {
					num1 = 1350;
					num2 = 3000
					clearInterval(add)
				}
				$('.bri_num .num1').html(num1 + '+')
				$('.bri_num .num2').html(num2 + '+')
			}, 50)
		})
	})();
	$('.dot span').hover(function() {
		$(this).parents('.cre_locate').find('li').eq($(this).index()).find('h5').addClass('h5cur')
	}, function() {
		$(this).parents('.cre_locate').find('li').eq($(this).index()).find('h5').removeClass('h5cur')
	})
	$('.loc_list li').hover(function() {
		$(this).parents('.cre_locate').find('span').eq($(this).index()).css({
			transform: 'scale(1.2)'
		})
	}, function() {
		$(this).parents('.cre_locate').find('span').eq($(this).index()).css({
			transform: 'scale(1)'
		})
	});
	//		销售网络轮播
	(function() {
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 5000,
			loop: true,
			prevButton: '.button-prev',
			nextButton: '.button-next',
		})
	})();
	
	/*门店查询*/
	$.ajax({
		url: "store.json",
		success: function(res) {
			var optionp = '';
			var optionc = '';
			var optionz = '';
			var areashow = ''
			res.forEach(function(p, i) {
				optionp += `<option value="${p.province}">${p.province}</option>`
			})
			$('#province').html(optionp)
			res[0].city.forEach(function(c, i) {
				optionc += `<option value="${c.cityname}">${c.cityname}</option>`
				c.zone.forEach(function(z, i) {
					z.store.forEach(function(s, i) {
						areashow += `<div>
					<h6>${s.name}</h6>
					<p>${s.tel}</p>
					<p>${s.address}</p>
				</div>`
					})
				})
			})
			$('#city').html(optionc)
			$('.lis_area').html(areashow)
			res[0].city[0].zone.forEach(function(z, i) {
				optionz += `<option value="${z.area}">${z.area}</option>`
			})
			$('#zone').append(optionz);
			$('#province').change(function() {
				res.forEach((p, i) => {
					if($(this).context.value == p.province) {
						optionc = ''
						optionz = '<option>区县</option>'
						p.city.forEach(function(c, i) {
							optionc += `<option value="${c.cityname}">${c.cityname}</option>`
						})
						$('#city').html(optionc)
						p.city[0].zone.forEach(function(z, i) {
							optionz += `<option value="${z.area}">${z.area}</option>`
						})
						$('#zone').html(optionz);
					}
				})
			});
			$('#city').change(function() {
				res.forEach((p, i) => {
					p.city.forEach((c, i) => {
						if($(this).context.value == c.cityname) {
							optionz = '<option>区县</option>'
							c.zone.forEach((z, i) => {
								optionz += `<option value="${z.area}">${z.area}</option>`
							})
							$('#zone').html(optionz);
						}
					})
				})
			});
			$('#search').click(function() {
				var num = 0;
				areashow = '';
				res.forEach((p, i) => {
					if($('#province option:selected').val() == p.province) {
						p.city.forEach((c, i) => {
							if($('#city option:selected').val() == c.cityname) {
								if($('#zone option:selected').val() == '区县') {
									c.zone.forEach((z, i) => {
										z.store.forEach(function(s, i) {
											areashow += `<div>
												<h6>${s.name}</h6>
												<p>${s.tel}</p>
												<p>${s.address}</p>
											</div>`
										})
										num = $('.lis_area>div').length
										$('.lis_area').html(areashow)
										$('.number').html(num)
									})
								}else {
									c.zone.forEach((z, i) => {
										if($('#zone option:selected').val() == z.area) {
											z.store.forEach(function(s, i) {
												areashow += `<div>
													<h6>${s.name}</h6>
													<p>${s.tel}</p>
													<p>${s.address}</p>
												</div>`
											})
											$('.lis_area').html(areashow)
											num = z.store.length
											$('.number').html(num)
										}
									})
								}
							}
						})
					}
				})
			});
		}
	})
})