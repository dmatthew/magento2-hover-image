define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('dmatthew.HoverImage', {
        /**
         * @private
         */
        _init: function () {
            var container = this.element.parents('.product-item-info');
            var mainImage = container.find('.product-image-photo');
            var hoverImage = mainImage.data('hover-image');
            // if (!hoverImage) {
            //     hoverImage = this.options.jsonConfig['hover_image'];
            // }
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
        }
    });

    return $.dmatthew.HoverImage;
});
