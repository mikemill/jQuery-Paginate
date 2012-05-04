/**
 * This plug-in is designed to paginate sets of items
 *
 * @author Michael Miller mikemill@gmail.com
 * @license BSD http://www.opensource.org/licenses/bsd-license.php
 * @copyright 2012 Michael Miller
 * @link https://github.com/mikemill/jQuery-Paginate Main Repoistory
 *
 */

(function($){
	$.fn.paginate = function(options) {
		var settings = $.extend({
			perpage: 20,
			start: 1,
			pagerid: '#pager',
			scrollDelay: 20,
			scrollStep: 1,
			mouseScrollStep: 5,
			firstText: 'First',
			lastText: 'Last',
			allText: 'All',
			clickText: 'Click to scroll faster',
			changepage: function(target, page, numpages, scroller, $page, perpage)
			{
				if (page == 'first')
				{
					page = 1;
					scroller.scrollLeft(0);
					$('.pager-page-current').removeClass('pager-page-current');
					$('.pager-page').filter(function(){return $(this).data('page') == page;}).addClass('pager-page-current');
				}
				else if (page == 'last')
				{
					page = numpages;
					scroller.scrollLeft(scroller.width());
					$('.pager-page-current').removeClass('pager-page-current');
					$('.pager-page').filter(function(){return $(this).data('page') == page;}).addClass('pager-page-current');
				}
				else if (page == 'all')
				{
					if ($page.hasClass('pager-page-current'))
					{
						$('.pager-page').filter(function(){return $(this).data('page') == $.fn.paginate.lastpage;}).click();
					}
					else
					{
						$('.pager-page-current').removeClass('pager-page-current');
						$page.addClass('pager-page-current');
						target.children().show();
					}
					return;
				}
				else
				{
					$('.pager-page-current').removeClass('pager-page-current');
					$page.addClass('pager-page-current');
				}

				var start = (page-1) * perpage;

				target.children().hide().slice(start, start + perpage).show();
				$.fn.paginate.lastpage = page;
			},
			redraw: function()
			{
				$('.pager-page-current').click();
			},
			buildpager: function (pageclient, settings, numpages)
			{
				var target = settings.pagerid;

				var frontcontrol = $('<span>').addClass('pager-control');

				$('<span>').addClass('pager-page').text(settings.firstText).data('page', 'first').appendTo(frontcontrol);
				var leftscroll = $('<span>').addClass('pager-scroll').html('&laquo;').appendTo(frontcontrol);

				var backcontrol = $('<span>').addClass('pager-control');

				var rightscroll = $('<span>').addClass('pager-scroll').html('&raquo;').appendTo(backcontrol);
				$('<span>').addClass('pager-page').text(settings.lastText).data('page', 'last').appendTo(backcontrol);
				$('<span>').addClass('pager-page pager-page-all').text(settings.allText).data('page', 'all').appendTo(backcontrol);

				var ul = $('<ul class="pager-list">');

				for (var i = 1; i <= numpages; i++)
				{
					$('<li>').addClass('pager-page' + (i == settings.start ? ' pager-page-current' : '')).text(i).data('page', i).appendTo(ul);
				}

				frontcontrol.appendTo(target);
				ul.appendTo(target);
				backcontrol.appendTo(target);

				$('.pager-page', target).click(function()
				{
					var page = $(this).data('page');
					settings.changepage(pageclient, page, numpages, ul, $(this), settings.perpage);
				});

				// Now "click" the active page
				$('.pager-page-current').click();


				
				var scrollinterval = null;
				var mousescrollinterval = null;

				leftscroll.hover(function()
				{
					scrollinterval = setInterval(function(){var left = ul.scrollLeft() - settings.scrollStep;ul.scrollLeft(left);}, settings.scrollDelay);
				}, function()
				{
					clearInterval(scrollinterval);
				}).mousedown(function()
				{
					mousescrollinterval = setInterval(function(){var left = ul.scrollLeft() - settings.mouseScrollStep;ul.scrollLeft(left);}, settings.scrollDelay);
				}).mouseup(function()
				{
					clearInterval(mousescrollinterval);
				})


				rightscroll.hover(function()
				{
					scrollinterval = setInterval(function(){var left = ul.scrollLeft() + settings.scrollStep;ul.scrollLeft(left);}, settings.scrollDelay);
				}, function()
				{
					clearInterval(scrollinterval);
				}).mousedown(function()
				{
					mousescrollinterval = setInterval(function(){var left = ul.scrollLeft() + settings.mouseScrollStep;ul.scrollLeft(left);}, settings.scrollDelay);
				}).mouseup(function()
				{
					clearInterval(mousescrollinterval);
				})
			}

		}, options);

		var numitems = this.children().size()
		console.log(numitems);
		var pages = Math.ceil(numitems / settings.perpage);

		settings.buildpager(this, settings, pages);

		$.fn.paginate.redraw = settings.redraw;

		return this;
	}

})(jQuery);

