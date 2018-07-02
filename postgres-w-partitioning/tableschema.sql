-- go to root directory
-- open the database you want to use for this
-- run the following in the postgres client: \i postgres/tableschema.sql

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS hostel;
DROP TABLE IF EXISTS location;

CREATE TABLE hostel (
  id serial PRIMARY KEY,
  name varchar(200),
  description text,
  locationid integer,
  -- photosarrayids varchar(10)[]     -- to match against photos, array vals should be int.  If not, could use CAST.
  photosarrayids smallint[]
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

CREATE TABLE photos (
  -- Note that the photoarray id should match the id for the hostel
  -- Ie, photoarray id #33 will be the photos for hostel #33
  id serial PRIMARY KEY,
  url varchar(70)
);

-- Begin partitioning:

-- NOTE!  In a development environment, I would have a way to automatically handle new IDs
-- instead of just creating an alert that says create more tables.
-- Doing this is more of a test to see if I can improve my query speed.

-- DOUBLE NOTE!  You decided the juice wasn't worth the squeeze here given the time constraints.
-- As currently configured, the next step would be to figure out how to tell Postgres
-- NOT to insert the value into the main table, just the partition table.
-- (With current configuration, the insert hits both tables)
-- (You also haven't tested an upload via COPY yet)

CREATE TABLE hostel0M ( CHECK (id > 0 AND id <= 999999) ) INHERITS (hostel);
CREATE TABLE hostel1M ( CHECK (id >= 1000000 AND id <= 1999999) ) INHERITS (hostel);
CREATE TABLE hostel2M ( CHECK (id >= 2000000 AND id <= 2999999) ) INHERITS (hostel);
CREATE TABLE hostel3M ( CHECK (id >= 3000000 AND id <= 3999999) ) INHERITS (hostel);
CREATE TABLE hostel4M ( CHECK (id >= 4000000 AND id <= 4999999) ) INHERITS (hostel);
CREATE TABLE hostel5M ( CHECK (id >= 5000000 AND id <= 5999999) ) INHERITS (hostel);
CREATE TABLE hostel6M ( CHECK (id >= 6000000 AND id <= 6999999) ) INHERITS (hostel);
CREATE TABLE hostel7M ( CHECK (id >= 7000000 AND id <= 7999999) ) INHERITS (hostel);
CREATE TABLE hostel8M ( CHECK (id >= 8000000 AND id <= 8999999) ) INHERITS (hostel);
CREATE TABLE hostel9M ( CHECK (id >= 9000000 AND id <= 9999999) ) INHERITS (hostel);
CREATE TABLE hostel10M ( CHECK (id >= 10000000 AND id <= 10999999) ) INHERITS (hostel);

CREATE TABLE review0M ( CHECK (id > 0 AND id <= 9999999) ) INHERITS (review);
CREATE TABLE review10M ( CHECK (id >= 10000000 AND id <= 19999999) ) INHERITS (review);
CREATE TABLE review20M ( CHECK (id >= 20000000 AND id <= 29999999) ) INHERITS (review);
CREATE TABLE review30M ( CHECK (id >= 30000000 AND id <= 39999999) ) INHERITS (review);
CREATE TABLE review40M ( CHECK (id >= 40000000 AND id <= 49999999) ) INHERITS (review);
CREATE TABLE review50M ( CHECK (id >= 50000000 AND id <= 59999999) ) INHERITS (review);
CREATE TABLE review60M ( CHECK (id >= 60000000 AND id <= 69999999) ) INHERITS (review);
CREATE TABLE review70M ( CHECK (id >= 70000000 AND id <= 79999999) ) INHERITS (review);
CREATE TABLE review80M ( CHECK (id >= 80000000 AND id <= 89999999) ) INHERITS (review);
CREATE TABLE review90M ( CHECK (id >= 90000000 AND id <= 99999999) ) INHERITS (review);
CREATE TABLE review100M ( CHECK (id >= 100000000 AND id <= 109999999) ) INHERITS (review);

-- Trigger function - hostel
CREATE OR REPLACE FUNCTION hostel_insert_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.id > 0 AND NEW.id <= 999999) THEN INSERT INTO hostel0M VALUES (NEW.*);
  ELSIF (NEW.id > 1000000 AND NEW.id <= 1999999) THEN INSERT INTO hostel1M VALUES (NEW.*);
  ELSIF (NEW.id > 2000000 AND NEW.id <= 2999999) THEN INSERT INTO hostel2M VALUES (NEW.*);
  ELSIF (NEW.id > 3000000 AND NEW.id <= 3999999) THEN INSERT INTO hostel3M VALUES (NEW.*);
  ELSIF (NEW.id > 4000000 AND NEW.id <= 4999999) THEN INSERT INTO hostel4M VALUES (NEW.*);
  ELSIF (NEW.id > 5000000 AND NEW.id <= 5999999) THEN INSERT INTO hostel5M VALUES (NEW.*);
  ELSIF (NEW.id > 6000000 AND NEW.id <= 6999999) THEN INSERT INTO hostel6M VALUES (NEW.*);
  ELSIF (NEW.id > 7000000 AND NEW.id <= 7999999) THEN INSERT INTO hostel7M VALUES (NEW.*);
  ELSIF (NEW.id > 8000000 AND NEW.id <= 8999999) THEN INSERT INTO hostel8M VALUES (NEW.*);
  ELSIF (NEW.id > 9000000 AND NEW.id <= 9999999) THEN INSERT INTO hostel9M VALUES (NEW.*);
  ELSIF (NEW.id > 10000000 AND NEW.id <= 10999999) THEN INSERT INTO hostel10M VALUES (NEW.*);
  ELSE
    RAISE EXCEPTION 'Applicable partition table does not exist.  Create more tables!';
  END IF;
  RETURN NULL;
END;
$$
LANGUAGE plpgsql;

-- Trigger function - review
CREATE OR REPLACE FUNCTION review_insert_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.id > 0 AND NEW.id <= 9999999) THEN INSERT INTO review0M VALUES (NEW.*);
  ELSIF (NEW.id > 10000000 AND NEW.id <= 19999999) THEN INSERT INTO review10M VALUES (NEW.*);
  ELSIF (NEW.id > 20000000 AND NEW.id <= 29999999) THEN INSERT INTO review20M VALUES (NEW.*);
  ELSIF (NEW.id > 30000000 AND NEW.id <= 39999999) THEN INSERT INTO review30M VALUES (NEW.*);
  ELSIF (NEW.id > 40000000 AND NEW.id <= 49999999) THEN INSERT INTO review40M VALUES (NEW.*);
  ELSIF (NEW.id > 50000000 AND NEW.id <= 59999999) THEN INSERT INTO review50M VALUES (NEW.*);
  ELSIF (NEW.id > 60000000 AND NEW.id <= 69999999) THEN INSERT INTO review60M VALUES (NEW.*);
  ELSIF (NEW.id > 70000000 AND NEW.id <= 79999999) THEN INSERT INTO review70M VALUES (NEW.*);
  ELSIF (NEW.id > 80000000 AND NEW.id <= 89999999) THEN INSERT INTO review80M VALUES (NEW.*);
  ELSIF (NEW.id > 90000000 AND NEW.id <= 99999999) THEN INSERT INTO review90M VALUES (NEW.*);
  ELSIF (NEW.id > 100000000 AND NEW.id <= 109999999) THEN INSERT INTO review100M VALUES (NEW.*);
  ELSE
    RAISE EXCEPTION 'Applicable partition table does not exist.  Create more tables!';
  END IF;
  RETURN NULL;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER insert_hostel_trigger
    BEFORE INSERT ON hostel
    FOR EACH ROW EXECUTE PROCEDURE hostel_insert_trigger();

CREATE TRIGGER insert_review_trigger
    BEFORE INSERT ON review
    FOR EACH ROW EXECUTE PROCEDURE review_insert_trigger();