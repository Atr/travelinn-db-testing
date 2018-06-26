COPY hostel (name, description, locationid)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/hostels.txt'
DELIMITER '|';

COPY location (city, country)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/locations.txt'
DELIMITER '|';

COPY review (rating, topFeature, hostelid)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/reviews.txt'
DELIMITER '|';

COPY photoarray (photos)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/photos.txt'
-- DELIMITER '|';
;