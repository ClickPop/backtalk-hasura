alter table "public"."contracts" drop constraint "contracts_pkey";
alter table "public"."contracts"
    add constraint "contracts_pkey"
    primary key ("address");
