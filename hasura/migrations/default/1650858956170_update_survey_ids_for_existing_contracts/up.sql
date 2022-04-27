UPDATE contracts
SET survey_id = (
        SELECT surveys.id
        FROM surveys
        WHERE surveys.contract_address = contracts.address
        LIMIT 1
    )
WHERE contracts.address IS NOT NULL;
