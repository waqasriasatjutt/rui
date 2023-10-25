-- Create dbo.UploadOrder Table
CREATE TABLE dbo.orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255),
    address1 NVARCHAR(255),
    address2 NVARCHAR(255),
    email NVARCHAR(255),
    suburb NVARCHAR(255),
    postCode NVARCHAR(50),
    state NVARCHAR(50),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- Create dbo.uploads Table
CREATE TABLE dbo.uploads (
    id INT IDENTITY(1,1) PRIMARY KEY,
    url NVARCHAR(255),
    filesize NVARCHAR(50),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- Create dbo.UploadOrderUploads Table
CREATE TABLE dbo.ordersUpload (
    id INT IDENTITY(1,1) PRIMARY KEY,
    Upload_id INT,
    order_id INT,
    qty INT,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (Upload_id) REFERENCES dbo.uploads(id),
    FOREIGN KEY (order_id) REFERENCES dbo.orders(id)
);