INSERT INTO
  users
VALUES 
  (default, 'test@testing.com', 'password'),
  (default, 'test2@testing.com', 'password');

INSERT INTO
  subjects
VALUES
  (default, (SELECT id FROM users WHERE email = 'test@testing.com'), 'Javascript'),
  (default, (SELECT id FROM users WHERE email = 'test@testing.com'), 'HTML'),
  (default, (SELECT id FROM users WHERE email = 'test2@testing.com'), 'Physics'),
  (default, (SELECT id FROM users WHERE email = 'test2@testing.com'), 'Biology');

INSERT INTO
  cards
VALUES
  (default, 'Describe variable scope.', 'You should know this...', (SELECT id FROM subjects WHERE name = 'Javascript'), 1),
  (default, 'How long did it take for JS to be created?', '10 days (and you can tell...)', (SELECT id FROM subjects WHERE name = 'Javascript'), 1),
  (default, 'What does the tag "a" stand for in HTML?', 'Anchor', (SELECT id FROM subjects WHERE name = 'HTML'), 1),
  (default, 'Does this question work?', 'Apparently!', (SELECT id FROM subjects WHERE name = 'HTML'), 1),
  (default, 'A Physics question...', 'A Physics answer', (SELECT id FROM subjects WHERE name = 'Physics'), 1),
  (default, 'What is the name of the positively-charged particle in the nucleus of an atom?', 'Proton', (SELECT id FROM subjects WHERE name = 'Physics'), 1),
  (default, 'What is the most famous single-celled organism?', 'Amoeba', (SELECT id FROM subjects WHERE name = 'Biology'), 1),
  (default, 'What is the best mammal on earth?', 'Charlie', (SELECT id FROM subjects WHERE name = 'Biology'), 1);