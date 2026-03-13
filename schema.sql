-- LOKI Support System Schema

CREATE TABLE IF NOT EXISTS loki_supporters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS loki_timeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Timeline Message
INSERT INTO loki_timeline (content) VALUES ('LOKI Tactical Timeline established. Standing by for strategic updates.');
