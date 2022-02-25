<?php

namespace Dmatthew\HoverImage\Block\Plugin\Product;

use Magento\Catalog\Model\Product;

class ImageFactory
{
    /**
     * @var \Magento\Catalog\Helper\Image
     */
    protected $imageHelper;

    public function __construct(
        \Magento\Catalog\Helper\Image $imageHelper
    ) {
        $this->imageHelper = $imageHelper;
    }

    public function beforeCreate(
        \Magento\Catalog\Block\Product\ImageFactory $subject,
        Product $product,
        string $imageId,
        array $attributes = null
    ): array {
        $baseHoverImage = $product->getData('hover_image');
        if ($baseHoverImage) {
            $hoverImage = $this->imageHelper->init($product, 'category_page_grid_hover')
                ->setImageFile($baseHoverImage)
                ->getUrl();
            $attributes['data-hover-image'] = $hoverImage;
            $attributes['data-hover'] = 'true';
        }

        return [$product, $imageId, $attributes];
    }
}
