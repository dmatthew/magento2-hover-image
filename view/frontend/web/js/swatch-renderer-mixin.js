define([
    'jquery'
], function ($) {
    'use strict';

    var mixin = {
	    /**
         * @private
         */
        _init: function () {
	        var $widget = this;
	        
            $widget._super();
            
            if ($widget.options.jsonConfig !== '') {
                $widget.renderHoverImages();
            }
        },

        renderHoverImages: function () {
            var $widget = this,
            	container = $widget.element.parents('.product-item-info'),
            	mainImage = container.find('.product-image-photo'),
            	hoverImage = mainImage.attr('data-hover-image');
            	
            if (!hoverImage) {
                hoverImage = this.options.jsonConfig['hover_image'];
            }
            
            if (hoverImage) {
                mainImage.attr('data-hover-image', hoverImage)
	                .on('mouseenter', function () {
		            	return $widget._OnMouseEnter($(this), $widget);
		    		}).on('mouseleave', function() {
			    		return $widget._OnMouseLeave($(this), $widget);
			    	});
            }
        },
        
        /**
         * Event for mouse enter event hover image
         *
         * @param {Object} $this
         * @param {Object} $widget
         * @private
         */
        _OnMouseEnter: function($this, $widget) {
            if ($this.attr('data-hover-image')) {
                $this.attr('data-original-image', $this.attr('src'));
                $this.attr('src', $this.attr('data-hover-image'));
            }
        },
        
        /**
         * Event for mouse leave event hover image
         *
         * @param {Object} $this
         * @param {Object} $widget
         * @private
         */
        _OnMouseLeave: function($this, $widget) {
            if ($this.attr('data-original-image')) {
                $this.attr('src', $this.attr('data-original-image'));
            }
        },
        
		/**
         * Callback for product media
         *
         * @param {Object} $this
         * @param {String} response
         * @param {Boolean} isInProductView
         * @private
         */
        _ProductMediaCallback: function ($this, response, isInProductView) {
	        var $widget = this,
	        	container = $widget.element.parents('.product-item-info'),
            	mainImage = container.find('.product-image-photo')
	        
            $widget._super($this, response, isInProductView);
            
            if (response.hasOwnProperty('hover_image')) {
            	mainImage.attr('data-original-image', response.medium || '')
            		.attr('data-hover-image', response.hover_image)
            		.on('mouseenter', function () {
		            	return $widget._OnMouseEnter($(this), $widget);
		    		}).on('mouseleave', function() {
			    		return $widget._OnMouseLeave($(this), $widget);
			    	});
            } else {
	            mainImage.removeAttr('data-original-image')
	            	.removeAttr('data-hover-image');
            }
        }
    };

    return function (swatchRenderer) {
        $.widget('mage.SwatchRenderer', swatchRenderer, mixin);
        return $.mage.SwatchRenderer;
    };
});
