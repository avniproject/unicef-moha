SELECT json_agg(json_build_object('uuid', uuid, 'name', name, 'level', level, 'type', type, 'parents', parents))
FROM
  (
    SELECT
      p.uuid,
      p.name,
      2                        AS "level",
      'PHC Area'               AS "type",
      json_build_array(json_build_object('uuid',b.uuid)) AS "parents"
    FROM phc p
      INNER JOIN block b ON b.id = p.block_id) AS p;
