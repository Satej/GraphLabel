CREATE TABLE "documents" (
  "id" serial NOT NULL,
  PRIMARY KEY ("id"),
  "location_path" text NOT NULL,
  "content" text NOT NULL,
  "create_date" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "entities" JSONB,
  "questions" JSONB,
  "annotations" JSONB
);