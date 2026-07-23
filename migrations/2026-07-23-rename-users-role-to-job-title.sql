-- Manual Neon/Postgres migration (Payload push is disabled).
-- Renames users.role → users.job_title for the jobTitle select field.
-- Safe to re-run: no-ops when role is already gone.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
      AND column_name = 'role'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
      AND column_name = 'job_title'
  ) THEN
    ALTER TABLE users RENAME COLUMN role TO job_title;
  END IF;
END $$;
