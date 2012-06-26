function initSlideBox(itemClass,speed,contentBgHover,headingHoverColor) {//items selector, transition speed, hover colors
	var $items = $(itemClass),//cache item collection
		isMobile = (//check mobile useragent
			(navigator.userAgent.match(/iPhone/i))||
			(navigator.userAgent.match(/iPod/i))||
			(navigator.userAgent.match(/iPad/i))||
			(navigator.userAgent.match(/Android/i))
		);
	$.each($items, function(idx,ele){//process each item
		var $ele = $(ele),//cache item
			$imgThumb = $ele.find('.imgThumb'),//img thumb
			$content = $ele.find('.content'),//content container
			$hoverContent = $ele.find('.hoverContent').css('opacity','0'),//hover content, hidden initially
			$heading = $ele.find('.heading'),//heading title
			/*get initial properties*/
			eleH = $ele.innerHeight(),//get item container height
			imgThumbT = $imgThumb.css('margin-top'),//get img top, must be defined in css
			contentH = $content.innerHeight(),//get content container height
			contentT = $content.css('top'),//get content container top
			contentBg = $content.css('background-color'),//get content container bg color
			headingColor = $heading.css('color'),//get heading color
			/*prepare hover properties*/
			hoverT = (eleH > contentH) ? eleH-contentH : 0,//set hover top based on content height and container height
			imgThumbHoverT = Math.round((Number(contentT.replace('px',''))-hoverT)*-0.38);//img shift amount
		function updateProperties() {//update content height and relevant properties for animation
			contentH = $content.innerHeight();
			hoverT = (eleH > contentH) ? eleH-contentH : 0;
		}
		function itemOn(){//on
			/*
			  get latest content height and relevant properties right before animation, 
			  Web fonts can be active after initial JS and causing incorrect heights (e.g. webkit)
			 */
			updateProperties();
			//animation
			$imgThumb.stop().animate({ marginTop:imgThumbHoverT },speed,function(){  });//animte img shift
			$heading.stop().animate({ color:headingHoverColor },speed,function(){  });//animte heading color
			$content.stop().animate({ top:hoverT,backgroundColor:contentBgHover },speed,//animte content position
				function(){
					$hoverContent.stop().animate({ opacity:'1' },speed*0.6,function(){  });//animte hover content
				}
			);
		}
		function itemOff(){//off
			$imgThumb.stop().animate({ marginTop:imgThumbT },speed,function(){  });
			$heading.stop().animate({ color:headingColor },speed,function(){  });
			$content.stop().animate({ top:contentT,backgroundColor:contentBg },speed,function(){  });
			$hoverContent.stop().animate({ opacity:'0' },speed*0.6,function(){  });
		}
		if (!isMobile) {//only enalbe sliding box on non-mobile devices
			$ele.hoverIntent(itemOn,itemOff);//bind events
		} else {
			//console.log('on mobile, do nothing');
		}
	});
}