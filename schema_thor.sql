-- Thor Web Intelligence Metadata
CREATE TABLE IF NOT EXISTS thor_metadata (
  id TEXT PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  word_count INTEGER,
  last_scraped DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);
