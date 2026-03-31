from fastapi import FastAPI,Depends,Query
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from database import get_db
from sqlalchemy import text

import os

app = FastAPI()

# 1. SERVE YOUR IMAGES
# This allows the browser to access images via URL: http://localhost:8000/images/Image_1.png
# UPDATE THESE PATHS to where your actual folders are located!

app.mount("/images", StaticFiles(directory=r"C:\Users\deepa\Documents\Projects\IndianDrivingDataset\IDD_RESIZED\image_archive"), name="images")
app.mount("/masks", StaticFiles(directory=r"C:\Users\deepa\Documents\Projects\IndianDrivingDataset\IDD_RESIZED\mask_archive"), name="masks")

# 2. THE SEARCH ENDPOINT
@app.get("/api/search")
def search_images(
    min_road: float = Query(0, ge=0, le=100),
    max_road: float = Query(100, ge=0, le=100),
    db: Session = Depends(get_db)
):
    # This SQL query filters based on the Road Percentage you calculated
    query = "SELECT id, image_name, road_percentage, share_token FROM idd_metadata WHERE road_percentage BETWEEN :min AND :max"
    # result = db.execute(query, {"min": min_road, "max": max_road})
    result = db.execute(text(query), {"min": min_road, "max": max_road})    
    return [dict(row._mapping) for row in result]

# 3. GET SINGLE IMAGE DETAILS (For your sharing feature)
@app.get("/api/image/{image_id}")
def get_image(image_id: int, db: Session = Depends(get_db)):
    result = db.execute("SELECT * FROM idd_metadata WHERE id = :id", {"id": image_id}).fetchone()
    return dict(result._mapping) if result else {"error": "Not found"}