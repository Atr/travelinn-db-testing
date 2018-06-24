-- go to root directory
-- open the database you want to use for this
-- run the following in the postgres client: \i postgres/tableschema.sql

DROP TABLE IF EXISTS photoarray;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS hostel;
DROP TABLE IF EXISTS location;

CREATE TABLE hostel (
  id serial PRIMARY KEY,
  name varchar(200),
  description text,
  locationId integer
);

CREATE TABLE location (
  id serial PRIMARY KEY,
  city varchar(100),
  country varchar(100)
);

CREATE TABLE review (
  id serial PRIMARY KEY,
  rating smallint,
  topFeature varchar(30),
  hostelid integer
);

CREATE TABLE photoarray (
  -- Note that the photoarray id should match the id for the hostel
  -- Ie, photoarray id #33 will be the photos for hostel #33
  id serial PRIMARY KEY,
  photos varchar(70)[]
);

-- AFTER LOADING DATA, you'll have to add your foreign key constraints
-- And you indexes.
-- AND:
-- copy table doesn't know to update auto-increment
-- so you'll have to go back for each table once you're done
-- and tell the auto increment to start at a higher number