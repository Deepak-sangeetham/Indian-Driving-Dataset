# IDD Dataset Explorer: Intelligent Road Analytics

A full-stack data engineering and visualization platform designed to filter, explore, and extract specific scenes from the **Indian Driving Dataset (IDD)** based on semantic road coverage.

## 📌 Task
The objective of this project is to automate the analysis of a large-scale driving dataset (approx. 7,000 images). Instead of manually searching through folders, the system allows researchers to:
1.  **Quantify** the road area in every image using Computer Vision.
2.  **Index** image metadata into a relational database for high-speed querying.
3.  **Filter** and **Visualize** specific environmental conditions (e.g., "Show me only images with 20% to 30% road coverage").
4.  **Bulk Extract** filtered data into a compressed ZIP format for model training.

---

## 🛠 Approach

### 1. Data Pipeline (ETL)
* **Extraction:** Iterating through nearly 7,000 PNG images and their corresponding segmentation masks.
* **Transformation:** Utilizing **OpenCV** to calculate the "Road Percentage" by analyzing pixel values in the mask files (identifying the specific class ID for roads).
* **Loading:** Storing the image name, file path, and calculated road percentage into a **MySQL** database.

### 2. Backend Architecture
* Developed a high-performance API using **FastAPI**.
* Implemented **SQLAlchemy** for secure, parameterized database communication.
* Created a streaming endpoint to generate **dynamic ZIP files** in-memory, allowing for instant bulk downloads without cluttering server storage.

### 3. Frontend Dashboard
* Built a responsive UI using **ReactJS**.
* Implemented "Input Cell" filtering to allow precise decimal-based searches.
* Used a **Thumbnail Gallery** approach to preview results without overloading the browser's memory.

---

## 🔄 Workflow
1.  **Indexing:** The `index_data.py` script processes the raw dataset and populates MySQL.
2.  **API Hosting:** FastAPI connects to MySQL and serves image metadata and actual image files.
3.  **User Interaction:** The user enters a `Min %` and `Max %` on the React Dashboard.
4.  **Querying:** React fetches the top 10 matching results for a quick preview.
5.  **Extraction:** The user clicks "Download Filtered ZIP" to trigger a backend process that zips **all** images in that specific range for offline use.

---

## 🚀 Setup & Installation

### Prerequisites
* **Python 3.10+**
* **Node.js & npm**
* **MySQL Server**

### 1. Database Setup
Create a database named `idd_project` and run the following SQL:
```sql
CREATE TABLE idd_metadata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255),
    road_percentage FLOAT,
    share_token VARCHAR(50)
);
```

### 2. Backend Setup (System-wide)
Since no virtual environment is used, install the dependencies globally:
```bash
pip install fastapi uvicorn sqlalchemy mysql-connector-python python-dotenv opencv-python
```
**Configure your `.env` file in the `/backend` folder:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_with_@_encoded
DB_NAME=idd_project
```

### 3. Frontend Setup
Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

---

## 🖥️ Running the Project

1.  **Populate the Database:**
    ```bash
    python index_data.py
    ```
2.  **Start the Backend:**
    ```bash
    cd backend
    uvicorn main:app --reload
    ```
3.  **Start the Frontend:**
    ```bash
    cd frontend
    npm start
    ```

## ⚠️ Troubleshooting
* **Port Hanging:** If the server hangs, run `taskkill /F /IM python.exe /T` in CMD to clear zombie processes.
* **CORS Error:** Ensure the `CORSMiddleware` in `main.py` is configured to allow `http://localhost:3000`.