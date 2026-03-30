import os
import cv2
import numpy as np

import mysql.connector
import uuid

from dotenv import load_dotenv

load_dotenv()

try:

    db = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

    cursor = db.cursor()
    print("Successfully connected to the database")

except mysql.connector.Error as err:
    print(f"Error{err}")
    exit()

IMAGE_DIR = r'IDD_RESIZED\image_archive' # path to the image directory
MASK_DIR = r'IDD_RESIZED\mask_archive' # path to the mask image directory

images = [f for f in os.listdir(IMAGE_DIR) if f.endswith(".png")]

for img_name in images:

    # Match Image_1.png to Mask_1.png
    num = img_name.split('_')[1]
    mask_name = f"Mask_{num}"

    img_path = os.path.join(IMAGE_DIR, img_name)
    mask_path = os.path.join(MASK_DIR, mask_name)

    mask = cv2.imread(mask_path,cv2.IMREAD_GRAYSCALE)

    if mask is not None:

        road_pct = np.mean(mask) * 100
        # Generate a unique token for sharing
        share_token = str(uuid.uuid4())[:8]

        # Insert into mysql
        sql = "INSERT INTO idd_metadata (image_name,image_path,mask_path,road_percentage,share_token) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(sql,(img_name,img_path,mask_path,road_pct,share_token))

db.commit()
print(f"Successfully indexed {len(images)} records!")