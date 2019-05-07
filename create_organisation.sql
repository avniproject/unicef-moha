select create_db_user('unicef_moha', 'password');

INSERT INTO organisation (name, db_user, uuid, parent_organisation_id)
  SELECT
    'UNICEF - MOHA',
    'unicef_moha',
    'feb521da-9d33-42f2-9c12-caa2cda6b7da',
    id
  FROM organisation
  WHERE name = 'OpenCHS' and not exists (select 1 from organisation where name = 'UNICEF - MOHA');
