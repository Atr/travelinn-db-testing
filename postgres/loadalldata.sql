COPY hostel (name, description, locationid, photosarrayids)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/hostels.txt'
DELIMITER '|';

COPY location (city, country)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/locations.txt'
DELIMITER '|';

COPY review (rating, topFeature, hostelid)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/reviews.txt'
DELIMITER '|';

COPY photos (url)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/photos.txt'
-- DELIMITER '|';
;
