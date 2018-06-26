ALTER TABLE hostel ADD CONSTRAINT fk_links_hostel_to_location FOREIGN KEY (locationid) REFERENCES location (id);
ALTER TABLE review ADD CONSTRAINT fk_links_review_to_hostel FOREIGN KEY (hostelid) REFERENCES hostel (id);
ALTER TABLE photoarray ADD CONSTRAINT fk_links_photoarray_to_hostel FOREIGN KEY (id) REFERENCES hostel (id);

CREATE INDEX locationid_idx ON hostel (locationid);
CREATE INDEX hostelid_idx ON review (hostelid);