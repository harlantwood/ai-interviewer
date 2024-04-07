-- Insert sample users
INSERT INTO auth.users (id, email) VALUES
    ('00000000-0000-0000-0000-000000000001', 'user1@example.com'),
    ('00000000-0000-0000-0000-000000000002', 'user2@example.com'),
    ('00000000-0000-0000-0000-000000000003', 'user3@example.com');

-- Insert sample question sets
INSERT INTO qset (id, name, user_id) VALUES
    ('00000000-0000-0000-0001-000000000000', 'Question Set 1', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0002-000000000000', 'Question Set 2', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0000-0003-000000000000', 'Question Set 3', '00000000-0000-0000-0000-000000000003');

-- Insert sample questions
INSERT INTO questions (id, content, user_id) VALUES
    ('00000000-0000-0001-0000-000000000000', 'What is your favorite color?', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0002-0000-000000000000', 'What is your favorite food?', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0003-0000-000000000000', 'What is your hobby?', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0004-0000-000000000000', 'What is your favorite movie?', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0005-0000-000000000000', 'What is your favorite book?', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0006-0000-000000000000', 'What is your favorite sport?', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0007-0000-000000000000', 'What is your favorite music genre?', '00000000-0000-0000-0000-000000000003'),
    ('00000000-0000-0008-0000-000000000000', 'What is your favorite holiday?', '00000000-0000-0000-0000-000000000003'),
    ('00000000-0000-0009-0000-000000000000', 'What is your favorite animal?', '00000000-0000-0000-0000-000000000003');

-- Insert sample question set and question joins
INSERT INTO qset_question_joins (qset_id, question_id, position) VALUES
    ('00000000-0000-0000-0001-000000000000', '00000000-0000-0001-0000-000000000000', 1),
    ('00000000-0000-0000-0001-000000000000', '00000000-0000-0002-0000-000000000000', 2),
    ('00000000-0000-0000-0001-000000000000', '00000000-0000-0003-0000-000000000000', 3),
    ('00000000-0000-0000-0002-000000000000', '00000000-0000-0004-0000-000000000000', 1),
    ('00000000-0000-0000-0002-000000000000', '00000000-0000-0005-0000-000000000000', 2),
    ('00000000-0000-0000-0002-000000000000', '00000000-0000-0006-0000-000000000000', 3),
    ('00000000-0000-0000-0003-000000000000', '00000000-0000-0007-0000-000000000000', 1),
    ('00000000-0000-0000-0003-000000000000', '00000000-0000-0008-0000-000000000000', 2),
    ('00000000-0000-0000-0003-000000000000', '00000000-0000-0009-0000-000000000000', 3);

-- Insert sample interviewers
INSERT INTO interviewer (id, name, description, user_id) VALUES
    ('00000000-0001-0000-0000-000000000000', 'John Smith', 'Experienced interviewer', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0002-0000-0000-000000000000', 'Jane Doe', 'Skilled interviewer', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0003-0000-0000-000000000000', 'Mike Johnson', 'Professional interviewer', '00000000-0000-0000-0000-000000000003');

-- Insert sample interviews
INSERT INTO interviews (id, name, description, subject_id, interviewer_id) VALUES
    ('10000000-0000-0000-0000-000000000000', 'Interview 1', 'Interview with User 1', '00000000-0000-0000-0000-000000000001', '00000000-0001-0000-0000-000000000000'),
    ('20000000-0000-0000-0000-000000000000', 'Interview 2', 'Interview with User 2', '00000000-0000-0000-0000-000000000002', '00000000-0002-0000-0000-000000000000'),
    ('30000000-0000-0000-0000-000000000000', 'Interview 3', 'Interview with User 3', '00000000-0000-0000-0000-000000000003', '00000000-0003-0000-0000-000000000000');

-- Insert sample answers
INSERT INTO answers (id, content, user_id) VALUES
    ('00000001-0000-0000-0000-000000000000', 'My favorite color is blue.', '00000000-0000-0000-0000-000000000001'),
    ('00000002-0000-0000-0000-000000000000', 'I love pizza.', '00000000-0000-0000-0000-000000000001'),
    ('00000003-0000-0000-0000-000000000000', 'I enjoy playing guitar.', '00000000-0000-0000-0000-000000000001'),
    ('00000004-0000-0000-0000-000000000000', 'My favorite movie is The Shawshank Redemption.', '00000000-0000-0000-0000-000000000002'),
    ('00000005-0000-0000-0000-000000000000', 'I love reading mystery novels.', '00000000-0000-0000-0000-000000000002'),
    ('00000006-0000-0000-0000-000000000000', 'I enjoy playing basketball.', '00000000-0000-0000-0000-000000000002'),
    ('00000007-0000-0000-0000-000000000000', 'I love listening to rock music.', '00000000-0000-0000-0000-000000000003'),
    ('00000008-0000-0000-0000-000000000000', 'Christmas is my favorite holiday.', '00000000-0000-0000-0000-000000000003'),
    ('00000009-0000-0000-0000-000000000000', 'I adore dogs.', '00000000-0000-0000-0000-000000000003'),
    ('00000010-0000-0000-0000-000000000000', 'My favorite color is green.', '00000000-0000-0000-0000-000000000001'),
    ('00000011-0000-0000-0000-000000000000', 'I also enjoy sushi.', '00000000-0000-0000-0000-000000000001'),
    ('00000012-0000-0000-0000-000000000000', 'I like hiking in my free time.', '00000000-0000-0000-0000-000000000001'),
    ('00000013-0000-0000-0000-000000000000', 'The Godfather is another favorite movie of mine.', '00000000-0000-0000-0000-000000000002'),
    ('00000014-0000-0000-0000-000000000000', 'I enjoy science fiction books as well.', '00000000-0000-0000-0000-000000000002'),
    ('00000015-0000-0000-0000-000000000000', 'I also enjoy playing tennis.', '00000000-0000-0000-0000-000000000002'),
    ('00000016-0000-0000-0000-000000000000', 'I appreciate classical music too.', '00000000-0000-0000-0000-000000000003'),
    ('00000017-0000-0000-0000-000000000000', 'I love Thanksgiving for the family gatherings.', '00000000-0000-0000-0000-000000000003'),
    ('00000018-0000-0000-0000-000000000000', 'Cats are also wonderful companions.', '00000000-0000-0000-0000-000000000003');

-- Insert sample question and answer joins
INSERT INTO question_answer_joins (question_id, answer_id, interview_id, position) VALUES
    ('00000000-0000-0001-0000-000000000000', '00000001-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0001-0000-000000000000', '00000010-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0002-0000-000000000000', '00000002-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0002-0000-000000000000', '00000011-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0003-0000-000000000000', '00000003-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0003-0000-000000000000', '00000012-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0004-0000-000000000000', '00000004-0000-0000-0000-000000000000', '20000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0004-0000-000000000000', '00000013-0000-0000-0000-000000000000', '20000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0005-0000-000000000000', '00000005-0000-0000-0000-000000000000', '20000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0005-0000-000000000000', '00000014-0000-0000-0000-000000000000', '20000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0006-0000-000000000000', '00000006-0000-0000-0000-000000000000', '20000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0006-0000-000000000000', '00000015-0000-0000-0000-000000000000', '20000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0007-0000-000000000000', '00000007-0000-0000-0000-000000000000', '30000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0007-0000-000000000000', '00000016-0000-0000-0000-000000000000', '30000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0008-0000-000000000000', '00000008-0000-0000-0000-000000000000', '30000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0008-0000-000000000000', '00000017-0000-0000-0000-000000000000', '30000000-0000-0000-0000-000000000000', 2),
    ('00000000-0000-0009-0000-000000000000', '00000009-0000-0000-0000-000000000000', '30000000-0000-0000-0000-000000000000', 1),
    ('00000000-0000-0009-0000-000000000000', '00000018-0000-0000-0000-000000000000', '30000000-0000-0000-0000-000000000000', 2);