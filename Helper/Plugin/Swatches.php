<?php

namespace Dmatthew\HoverImage\Helper\Plugin;

class Swatches
{
    /**
     * @var \Magento\Catalog\Helper\Image
     */
    private $imageHelper;

    public function __construct(
        \Magento\Catalog\Helper\Image $imageHelper
    ) {
        $this->imageHelper = $imageHelper;
    }

    public function aroundGetProductMediaGallery(
        \Magento\Swatches\Helper\Data $subject,
        \Closure $proceed,
        \Magento\Catalog\Model\Product $product
    ) {
        $result = $proceed($product);

        $baseHoverImage = $product->getData('hover_image');
        if ($baseHoverImage) {
            $hoverImage = $this->imageHelper->init($product, 'category_page_grid_hover')
                ->setImageFile($baseHoverImage)
                ->getUrl();
            $result['hover_image'] = $hoverImage;
        }
        return $result;
    }
}
