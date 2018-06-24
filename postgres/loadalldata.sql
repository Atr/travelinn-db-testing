COPY hostel (name, description, locationId)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/hostels.txt'
DELIMITER '|';

COPY location (city, country, hostelId)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/locations.txt'
DELIMITER '|';

COPY review (rating, topFeature, hostelId)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/reviews.txt'
DELIMITER '|';

COPY photoarray (photos, hostelId)
FROM '/Users/alexromanak/Desktop/repos/sdc/testing/travelinn-db-testing/postgres/datafiles/photos.txt'
DELIMITER '|';