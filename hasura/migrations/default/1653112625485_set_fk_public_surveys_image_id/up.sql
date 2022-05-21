alter table "public"."surveys"
  add constraint "surveys_image_id_fkey"
  foreign key ("image_id")
  references "public"."survey_images"
  ("id") on update set null on delete set null;
