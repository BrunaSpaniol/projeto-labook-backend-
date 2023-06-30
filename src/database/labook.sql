CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Fulano",
        "fulano@email.com",
        "fulano123"
    ), (
        "u002",
        "Beltrana",
        "beltrana@email.com",
        "beltrana00"
    );