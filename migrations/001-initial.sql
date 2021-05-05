DROP TABLE IF EXISTS Files;

--  Create Table(s) --
CREATE TABLE Files (
    id CHAR(64) PRIMARY KEY,
    originalName VARCHAR(120) NOT NULL,
    pathName VARCHAR(120) NOT NULL 
);

