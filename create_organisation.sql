CREATE ROLE unicef_moha
  NOINHERIT
  PASSWORD 'password';

GRANT unicef_moha TO openchs;

GRANT ALL ON ALL TABLES IN SCHEMA public TO unicef_moha;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO unicef_moha;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO unicef_moha;

INSERT INTO organisation (name, db_user, uuid, parent_organisation_id)
  SELECT
    'UNICEF - MOHA',
    'unicef_moha',
    'feb521da-9d33-42f2-9c12-caa2cda6b7da',
    id
  FROM organisation
  WHERE name = 'OpenCHS';
