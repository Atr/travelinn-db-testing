DROP TABLE IF EXISTS hostel;
DROP TABLE IF EXISTS location;

CREATE TABLE hostel (
  id varchar(10),
  name varchar(200),
  description text,
  photos varchar(70)[],
  reviews json[],
  locationId varchar(10)
);

CREATE TABLE location (
  id varchar(10),
  city varchar(100),
  country varchar(100)
);