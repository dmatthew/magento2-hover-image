<?php
namespace Dmatthew\HoverImage\Helper\Plugin;

use \Magento\Catalog\Helper\Image;
use \Magento\Catalog\Model\Product as CatalogProduct;

class Swatches
{
    /**
     * @var \Magento\Catalog\Helper\Image
     */
    private $imageHelper;

    public function __construct(
        Image $imageHelper
    ) {
        $this->imageHelper = $imageHelper;
    }

    public function afterGetProductMediaGallery(
        \Magento\Swatches\Helper\Data $subject,
        $result,
        CatalogProduct $product
    ) {
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
