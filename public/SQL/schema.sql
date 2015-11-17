DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS subjects cascade;
DROP TABLE IF EXISTS cards cascade;

CREATE TABLE users (
  id serial primary key,
  email varchar(30),
  password varchar(80)
);

CREATE TABLE subjects (
  id serial primary key,
  user_id int references users(id) on delete cascade,
  name varchar(30)
);

CREATE TABLE cards (
  id serial primary key,
  question text,
  answer text,
  subject_id int references subjects(id) on delete cascade,
  rating int
);