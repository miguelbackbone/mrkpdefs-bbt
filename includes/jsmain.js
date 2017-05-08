(function($){
	function initSliders(){
		$('.sample').each(function(){
			$slider = $(this);
			$slider.slick({
				adaptiveHeight: true,
				arrows: true,
				dots: false,
				prevArrow: '<i class="fa fa-long-arrow-left slick-prev"/>',
				nextArrow: '<i class="fa fa-long-arrow-right slick-next"/>',
				slidesToShow: 3,
				slidesToScroll: 3,
				responsive: [
					{
						breakpoint: 980,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 720,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		});
	}
	function hideOnClickout(e){
		e.stopPropagation();

		/*sample*/
		var $holder = $(".navitemsample");
		if ($holder.has(e.target).length === 0) {
			$holder.find('.dropdownsample').stop().slideUp('fast');
			$holder.find('.togglebtnsample').removeClass('active');
		}
	}
	function toggleHref(e){
		e.preventDefault();
		var target = $.attr(this,'href');
		$(this).toggleClass('active',!$(target).is(':visible'));
		$(target).stop().slideToggle('fast',function(){
			$(this).css('height','auto');
		});
	}
	function goToHref(e){
		e.preventDefault();
		var target = $.attr(this,'href'),
			header_height = $('#main-header').outerHeight(),
			sticky_height = ($('.sticky').length) ? $('.sticky').outerHeight() : 0;
			topSpace = $(target).offset().top - header_height - sticky_height;
		$('html,body').stop().animate({ scrollTop: topSpace }, 1500, 'easeInOutCubic');
	}
	function makeBg() {
		$('.makeBg').each(function(){
			if($(this).find('img').length){
				var theBgPic = $(this).children('img').first();
				theBgPic.hide();
				var bgSrc = "url('" + theBgPic.attr('src') + "')";
				$(this).css('background-image',bgSrc);
			}
		});
	}

	$(document).ready(function(){

		makeBg();
		initSliders();

		$(window).on('resize',function(){
			//
		}).on('scroll',function(){
			//
		});

		$('.goto').click(goToHref);
		$('.toggleAnchor').click(toggleHref);
		$(document).click(hideOnClickout);

	});

	$(window).load(function(){});
})(jQuery);