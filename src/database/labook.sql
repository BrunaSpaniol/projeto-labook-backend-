CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

DROP TABLE users;

CREATE TABLE
    posts(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE posts;

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE likes_dislikes;

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        "u001",
        "Fulano",
        "fulano@email.com",
        "fulano123",
        "ADMIN"
    ), (
        "u002",
        "Beltrana",
        "beltrana@email.com",
        "beltrana00",
        "ADMIN"
    );

INSERT INTO
    posts (
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VALUES (
        "p001",
        "u001",
        "Oie sua chata!",
        0,
        1
    ), (
        "p002",
        "u002",
        "Eu sou chata e vc é doida",
        0,
        1
    );