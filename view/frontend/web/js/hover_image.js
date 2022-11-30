define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('dmatthew.HoverImage', {
        /**
         * @private
         */
        _init: function () {
            let container = this.element.parents('.product-item-info');
            let mainImage = container.find('img.product-image-photo');
            let hoverImage = mainImage.data('hover-image');

            // Get picture source elements that "control" how our image tag is displayed
            let getImagePictureSources = function (image) {
                let pictureTag = $(image).parents('picture');
                if (!pictureTag) {
                    return false;
                }
                let pictureSources = $(pictureTag).find('source');
                if (!pictureSources) {
                    return false;
                }
                return pictureSources;
            }

            // Toggle picture source element type between disabled and original type
            let togglePictureSourceTypes = function (image, disableSources) {
                let sources = getImagePictureSources(image);
                if (!sources) {
                    return false;
                }
                sources.each(function(index, source) {
                    let $source = $(source);
                    if (disableSources) {
                        $source.attr('type', 'disabled')
                    } else {
                        $source.attr('type', $source.attr('original-type'));
                    }
                })
            }

            if (hoverImage) {
                mainImage.data('hover-image', hoverImage);
                mainImage.on('mouseenter', function () {
                    if ($(this).data('hover-image')) {
                        $(this).data('original-image', $(this).attr('src'));
                        $(this).attr('src', $(this).data('hover-image'));
                        togglePictureSourceTypes(this, true);
                    }
                });
                mainImage.on('mouseleave', function () {
                    if ($(this).data('original-image')) {
                        $(this).attr('src', $(this).data('original-image'));
                        togglePictureSourceTypes(this, false);
                    }
                });

                // Set original type on sources to be used on toggling
                let imagePictureSources = getImagePictureSources(mainImage);
                if (imagePictureSources) {
                    $(imagePictureSources).each(function(index, source) {
                        let $source = $(source);
                        let originalSourceType = $source.attr('type');
                        $source.attr('original-type', originalSourceType);
                    });
                }
            }
        }
    });

    return $.dmatthew.HoverImage;
});
