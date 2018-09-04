SELECT json_agg(json_build_object('uuid', uuid, 'name', name, 'level', level, 'type', type, 'parents', parents))
FROM (
       SELECT
         uuid,
         name,
         4            AS "level",
         'District'   AS "type",
         '[]' :: JSON AS "parents"
       FROM district) AS d;
