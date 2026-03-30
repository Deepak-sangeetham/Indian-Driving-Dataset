import cv2
import numpy as np

# Load one of your masks
mask = cv2.imread(r'IDD_RESIZED\mask_archive\Mask_1.png', cv2.IMREAD_GRAYSCALE)

# Scale it: Multiply every pixel by 255 
# (Now 0 stays 0, but 1 becomes 255/White)
visible_mask = mask * 255 

cv2.imshow('Visible Road Mask', visible_mask)
cv2.waitKey(0)