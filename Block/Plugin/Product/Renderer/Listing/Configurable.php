<?php

namespace Dmatthew\HoverImage\Block\Plugin\Product\Renderer\Listing;

class Configurable
{
    protected $serializer;

    /**
     * @var \Magento\Catalog\Helper\Image
     */
    protected $imageHelper;

    public function __construct(
        \Magento\Framework\Serialize\Serializer\Json $serializer,
        \Magento\Catalog\Helper\Image $imageHelper
    ) {
        $this->serializer = $serializer;
        $this->imageHelper = $imageHelper;
    }

    public function afterGetJsonConfig(
        \Magento\Swatches\Block\Product\Renderer\Listing\Configurable $subject,
        $config
    ) {
        $config = $this->serializer->unserialize($config);

        $baseHoverImage = $subject->getProduct()->getData('hover_image');
        if ($baseHoverImage) {
            $hoverImage = $this->imageHelper->init($subject->getProduct(), 'category_page_grid_hover')
                ->setImageFile($baseHoverImage)
                ->getUrl();
            $config['hover_image'] = $hoverImage;
        }

        return $this->serializer->serialize($config);
    }
}
