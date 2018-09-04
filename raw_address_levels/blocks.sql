SELECT json_agg(json_build_object('uuid', uuid, 'name', name, 'level', level, 'type', type, 'parents', parents))
FROM (
       SELECT
         b.uuid,
         b.name,
         3                        AS "level",
         'Block'                  AS "type",
         json_build_array(json_build_object('uuid',d.uuid)) AS "parents"
       FROM block b
         INNER JOIN district d ON b.district_id = d.id) AS b;

