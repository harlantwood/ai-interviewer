-- Insert users
INSERT INTO auth.users (id, email) VALUES
    ('00000000-0000-0000-0000-000000000001', 'user1@example.com'),
    ('00000000-0000-0000-0000-000000000002', 'user2@example.com'),
    ('00000000-0000-0000-0000-000000000003', 'user3@example.com');

-- Insert sample interviewers
INSERT INTO interviewer (id, name, description, user_id) VALUES
    ('interviewer1', 'John Smith', 'Experienced interviewer', '00000000-0000-0000-0000-000000000001'),
    ('interviewer2', 'Jane Doe', 'Skilled interviewer', '00000000-0000-0000-0000-000000000002'),
    ('interviewer3', 'Mike Johnson', 'Professional interviewer', '00000000-0000-0000-0000-000000000003');

-- Insert scripts
INSERT INTO scripts (id, name, description, user_id) VALUES
  ('script1', 'Script 1', 'Description for Script 1', '00000000-0000-0000-0000-000000000001'),
  ('script2', 'Script 2', 'Description for Script 2', '00000000-0000-0000-0000-000000000002'),
  ('script3', 'Script 3', 'Description for Script 3', '00000000-0000-0000-0000-000000000003');

-- Insert script_questions
INSERT INTO script_questions (id, content, script_id) VALUES
  ('sq1', 'What is your favorite movie?', 'script1'),
  ('sq2', 'What is your favorite book?', 'script1'),
  ('sq3', 'What is your favorite sport?', 'script1'),
  ('sq4', 'What is your favorite movie?', 'script2'),
  ('sq5', 'What is your favorite book?', 'script2'),
  ('sq6', 'What is your favorite sport?', 'script2'),
  ('sq7', 'What is your favorite movie?', 'script3'),
  ('sq8', 'What is your favorite book?', 'script3'),
  ('sq9', 'What is your favorite sport?', 'script3');

-- Insert interviews
INSERT INTO interviews (id, name, description, subject_id, interviewer_id, script_id) VALUES
  ('interview1', 'Interview 1', 'Description for Interview 1', '00000000-0000-0000-0000-000000000001', 'interviewer1', 'script1'),
  ('interview2', 'Interview 2', 'Description for Interview 2', '00000000-0000-0000-0000-000000000002', 'interviewer2', 'script2'),
  ('interview3', 'Interview 3', 'Description for Interview 3', '00000000-0000-0000-0000-000000000003', 'interviewer3', 'script3');

-- Insert interview_questions
INSERT INTO interview_questions (id, content, script_question_id, interview_id) VALUES
  ('iq1', 'What is your actual favorite movie?', 'sq1', 'interview1'),
  ('iq2', 'What is your actual favorite book?', 'sq2', 'interview1'),
  ('iq3', 'What is your actual favorite sport?', 'sq3', 'interview1'),
  ('iq4', 'What is your actual favorite movie?', 'sq4', 'interview2'),
  ('iq5', 'What is your actual favorite book?', 'sq5', 'interview2'),
  ('iq6', 'What is your actual favorite sport?', 'sq6', 'interview2'),
  ('iq7', 'What is your actual favorite movie?', 'sq7', 'interview3'),
  ('iq8', 'What is your actual favorite book?', 'sq8', 'interview3'),
  ('iq9', 'What is your actual favorite sport?', 'sq9', 'interview3');

-- Insert answers
INSERT INTO answers (id, transcript, summary) VALUES
  ('a1', 'My favorite movie is The Shawshank Redemption.', 'The Shawshank Redemption'),
  ('a2', 'The Godfather is another favorite movie of mine.', 'The Godfather'),
  ('a3', 'I love reading mystery novels.', 'Mystery novels'),
  ('a4', 'I enjoy science fiction books as well.', 'Science fiction books'),
  ('a5', 'I enjoy playing basketball.', 'Basketball'),
  ('a6', 'I also enjoy playing tennis.', 'Tennis'),
  ('a7', 'My favorite movie is Forrest Gump.', 'Forrest Gump'),
  ('a8', 'I also like the movie Inception.', 'Inception'),
  ('a9', 'My favorite book is To Kill a Mockingbird.', 'To Kill a Mockingbird'),
  ('a10', 'I also enjoy reading The Great Gatsby.', 'The Great Gatsby'),
  ('a11', 'I love playing soccer.', 'Soccer'),
  ('a12', 'I enjoy watching football.', 'Football'),
  ('a13', 'My favorite movie is The Lord of the Rings trilogy.', 'The Lord of the Rings'),
  ('a14', 'I also like the movie The Matrix.', 'The Matrix'),
  ('a15', 'My favorite book is 1984 by George Orwell.', '1984'),
  ('a16', 'I also enjoy reading Brave New World.', 'Brave New World'),
  ('a17', 'I enjoy playing volleyball.', 'Volleyball'),
  ('a18', 'I also like swimming.', 'Swimming');

-- Insert script_script_question_joins
INSERT INTO script_script_question_joins (script_id, script_question_id, position) VALUES
  ('script1', 'sq1', 1),
  ('script1', 'sq2', 2),
  ('script1', 'sq3', 3),
  ('script2', 'sq4', 1),
  ('script2', 'sq5', 2),
  ('script2', 'sq6', 3),
  ('script3', 'sq7', 1),
  ('script3', 'sq8', 2),
  ('script3', 'sq9', 3);

-- Insert interview_script_question_joins
INSERT INTO interview_script_question_joins (interview_id, script_question_id, position) VALUES
  ('interview1', 'sq1', 1),
  ('interview1', 'sq2', 2),
  ('interview1', 'sq3', 3),
  ('interview2', 'sq4', 1),
  ('interview2', 'sq5', 2),
  ('interview2', 'sq6', 3),
  ('interview3', 'sq7', 1),
  ('interview3', 'sq8', 2),
  ('interview3', 'sq9', 3);

-- Insert interview_question_answer_joins
INSERT INTO interview_question_answer_joins (interview_question_id, answer_id, position) VALUES
  ('iq1', 'a1', 1),
  ('iq1', 'a2', 2),
  ('iq2', 'a3', 1),
  ('iq2', 'a4', 2),
  ('iq3', 'a5', 1),
  ('iq3', 'a6', 2),
  ('iq4', 'a7', 1),
  ('iq4', 'a8', 2),
  ('iq5', 'a9', 1),
  ('iq5', 'a10', 2),
  ('iq6', 'a11', 1),
  ('iq6', 'a12', 2),
  ('iq7', 'a13', 1),
  ('iq7', 'a14', 2),
  ('iq8', 'a15', 1),
  ('iq8', 'a16', 2),
  ('iq9', 'a17', 1),
  ('iq9', 'a18', 2);
