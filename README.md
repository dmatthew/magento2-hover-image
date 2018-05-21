# Dmatthew_HoverImage Module for Magento 2

With this module you can set an image to be displayed when hovering over products on category pages.

## Assigning Hover Image using Magento Import

To update the hover_image attribute on products for **existing images**:

1. Create a CSV that looks like this:

    ```csv
    sku,hover_image
    ABCD1234,/i/m/image.jpg
    ```
	
    sku | hover_image
    --- | ---
    ABCD1234 | /i/m/image.jpg

2. Then, when importing the file change the field "Images File Directory" to "pub/media/catalog/product".
3. This will set the Hover Image attribute to one of the existing images without requiring you to place new images into pub/media/import/.


To update the hover_image attribute on products with **new images**:

1. Create a CSV that looks like this:

    ```csv
    sku,hover_image
    ABCD1234,image.jpg
    ```
	
    sku | hover_image
    --- | ---
    ABCD1234 | image.jpg

2. Upload the image.jpg file to the `media/import/` directory.
3. When importing the file, leave the field "Images File Directory" blank or set it to "pub/media/import".
4. This will save the new image and assign it to the Hover Image attribute.
