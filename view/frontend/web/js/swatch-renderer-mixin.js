define([
    'jquery'
], function ($) {
    'use strict';

    var mixin = {
        _init: function () {
            this._super();
            if (this.options.jsonConfig !== '') {
                this.renderHoverImage();
            }
        },

        renderHoverImage: function () {
            var container = this.element.parents('.product-item-info');
            var mainImage = container.find('.product-image-photo');
            var hoverImage = mainImage.data('hover-image');
            if (!hoverImage) {
                hoverImage = this.options.jsonConfig['hover_image'];
            }
            if (hoverImage) {
                mainImage.data('hover-image', hoverImage);
                mainImage.on('mouseenter', function () {
                    if ($(this).data('hover-image')) {
                        $(this).data('original-image', $(this).attr('src'));
                        $(this).attr('src', $(this).data('hover-image'));
                    }
                });
                mainImage.on('mouseleave', function () {
                    if ($(this).data('original-image')) {
                        $(this).attr('src', $(this).data('original-image'));
                    }
                });
            }
        },

        _ProductMediaCallback: function ($this, response) {
            this._super($this, response);
            var container = this.element.parents('.product-item-info');
            var mainImage = container.find('.product-image-photo');
            mainImage.data('original-image', response.medium || '');
            if (response.hasOwnProperty('hover_image')) {
                mainImage.data('hover-image', response.hover_image);
            }
            else {
                mainImage.data('hover-image', '');
            }
        }
    };

    return function (swatchRenderer) {
        $.widget('mage.SwatchRenderer', swatchRenderer, mixin);
        return $.mage.SwatchRenderer;
    };
});
