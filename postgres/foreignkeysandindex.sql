ALTER TABLE hostel ADD CONSTRAINT fk_links_hostel_to_location FOREIGN KEY (locationId) REFERENCES location (id);
ALTER TABLE review ADD CONSTRAINT fk_links_review_to_hostel FOREIGN KEY (hostelId) REFERENCES hostel (id);
ALTER TABLE photoarray ADD CONSTRAINT fk_links_photoarray_to_hostel FOREIGN KEY (id) REFERENCES hostel (id);

CREATE INDEX locationId_idx ON hostel (locationId);
CREATE INDEX hostelid_idx ON review (hostelid);