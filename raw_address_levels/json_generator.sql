DROP TABLE IF EXISTS raw_phc;
DROP TABLE IF EXISTS phc;
DROP TABLE IF EXISTS block;
DROP TABLE IF EXISTS district;

CREATE TABLE raw_phc (
  id       VARCHAR,
  district VARCHAR,
  block    VARCHAR,
  phc      VARCHAR
);

CREATE TABLE district (
  id   SERIAL PRIMARY KEY,
  name VARCHAR,
  uuid VARCHAR DEFAULT uuid_generate_v4()
);

CREATE TABLE block (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR,
  uuid        VARCHAR DEFAULT uuid_generate_v4(),
  district_id INT REFERENCES district (id)
);

CREATE TABLE phc (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR,
  uuid     VARCHAR DEFAULT uuid_generate_v4(),
  block_id INT REFERENCES block (id)
);

COPY raw_phc (id, district, block, phc) FROM '/Users/mihir/projects/work/openchs/unicef-moha/raw_address_levels/phcs.csv' WITH CSV DELIMITER ',';

INSERT INTO district (name) SELECT DISTINCT initcap(lower(trim(district)))
                            FROM raw_phc;

INSERT INTO block (district_id, name)
  SELECT DISTINCT
    d.id,
    initcap(lower(trim(rp.block)))
  FROM raw_phc rp
    INNER JOIN district d ON initcap(lower(trim(rp.district))) = d.name
  WHERE rp.block IS NOT NULL;

INSERT INTO phc (block_id, name)
  SELECT DISTINCT
    b.id,
    initcap(lower(trim(rp.phc)))
  FROM raw_phc rp
    INNER JOIN block b ON initcap(lower(trim(rp.block))) = b.name
  WHERE rp.block IS NOT NULL;