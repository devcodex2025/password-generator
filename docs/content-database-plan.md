# Content Database Plan

## Current state
- Pages read content from `src/content/articles.ts` through `src/lib/content-repository.ts`.
- Active source is controlled by `CONTENT_SOURCE` env variable.
- Default source: `json`.
- Supported DB backends:
  - `database` = PostgreSQL
  - `mongodb` (or `mongo`) = MongoDB Atlas/local MongoDB

## Database schema
- SQL schema file: `db/content_schema.sql`.
- DB engine: PostgreSQL (works for Supabase/Neon/Hostinger Postgres).

## Switch strategy
1. Create DB tables using schema script:
   - PowerShell:
     `$env:DATABASE_URL='postgresql://...'; npm run db:apply-schema`
   - Or with alias:
     `$env:SUPABASE_DB_URL='postgresql://...'; npm run db:apply-schema`
2. Prepare agent output JSON using schema from `docs/content-agent-brief.json`.
3. Import article JSON into DB:
   - Validate first:
     `npm run content:validate -- --content .openclaw/agents/generate-password-content-writer/output/content-batch.json`
   - PowerShell:
     `$env:DATABASE_URL='postgres://...'; npm run db:seed-content -- .openclaw/agents/generate-password-content-writer/output/content-batch.json`
   - Bash:
     `DATABASE_URL=... npm run db:seed-content -- .openclaw/agents/generate-password-content-writer/output/content-batch.json`
4. Set env:
   - `CONTENT_SOURCE=database`
   - `DATABASE_URL=...` (or `SUPABASE_DB_URL=...`)
   - `DATABASE_SSL=true` only if you need explicit override
   - For Supabase hostnames, SSL is auto-enabled by default
   - Certificate verification is always on. Supply a provider CA with
     `DATABASE_SSL_CA` (PEM), `DATABASE_SSL_CA_BASE64`, or `DATABASE_SSL_CA_PATH`
     if the system trust store is not enough.

## Notes
- `DatabaseContentRepository` is implemented and used when `CONTENT_SOURCE=database`.
- `MongoContentRepository` is implemented and used when `CONTENT_SOURCE=mongodb` (or `mongo`).
- JSON source remains default and acts as fallback during migration.
- Use `.env.example` as baseline for local configuration.

## MongoDB quick start
1. Set env:
   - `CONTENT_SOURCE=mongodb`
   - `MONGODB_URI=mongodb+srv://...`
   - `MONGODB_DB_NAME=generatepassword`
   - `MONGODB_COLLECTION=content_guides` (optional)
2. Validate content:
   - `npm run content:validate -- --content .openclaw/agents/generate-password-content-writer/output/content-batch.json`
3. Seed MongoDB:
   - PowerShell:
     `$env:MONGODB_URI='mongodb+srv://...'; npm run db:seed-content:mongo -- .openclaw/agents/generate-password-content-writer/output/content-batch.json`
   - Bash:
     `MONGODB_URI='mongodb+srv://...' npm run db:seed-content:mongo -- .openclaw/agents/generate-password-content-writer/output/content-batch.json`
