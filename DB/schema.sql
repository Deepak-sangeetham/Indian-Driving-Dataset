use idd_project;



CREATE TABLE idd_metadata(



id INT PRIMARY KEY AUTO_INCREMENT,

image_name VARCHAR(255) NOT NULL,

image_path VARCHAR(500) NOT NULL,

mask_path VARCHAR(500) NOT NULL,

road_percentage FLOAT,

share_token VARCHAR(64) UNIQUE,

is_private BOOLEAN DEFAULT FALSE,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP



);

