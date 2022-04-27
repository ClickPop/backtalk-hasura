BEGIN TRANSACTION;
ALTER TABLE "public"."contracts" DROP CONSTRAINT "contracts_pkey";

ALTER TABLE "public"."contracts"
    ADD CONSTRAINT "contracts_pkey" PRIMARY KEY ("address", "survey_id", "chain");
COMMIT TRANSACTION;
