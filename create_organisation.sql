
CREATE ROLE mdsr NOINHERIT PASSWORD 'password';

GRANT mdsr TO openchs;

GRANT ALL ON ALL TABLES IN SCHEMA public TO mdsr;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO mdsr;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO mdsr;

INSERT into organisation(name, db_user, uuid, parent_organisation_id)
    SELECT 'MDSR', 'mdsr', 'feb521da-9d33-42f2-9c12-caa2cda6b7da', id FROM organisation WHERE name = 'OpenCHS';
