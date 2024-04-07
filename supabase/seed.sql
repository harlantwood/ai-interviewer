-- Insert sample users
INSERT INTO auth.users (id, email) VALUES
    ('00000000-0000-0000-0000-000000000001', 'user1@example.com'),
    ('00000000-0000-0000-0000-000000000002', 'user2@example.com'),
    ('00000000-0000-0000-0000-000000000003', 'user3@example.com');

-- Insert sample question sets
INSERT INTO qset (id, name, user_id) VALUES
    ('qset1', 'Question Set 1', '00000000-0000-0000-0000-000000000001'),
    ('qset2', 'Question Set 2', '00000000-0000-0000-0000-000000000002'),
    ('qset3', 'Question Set 3', '00000000-0000-0000-0000-000000000003');

-- Insert sample questions
INSERT INTO questions (id, content, user_id) VALUES
    ('question1', 'What is your favorite color?', '00000000-0000-0000-0000-000000000001'),
    ('question2', 'What is your favorite food?', '00000000-0000-0000-0000-000000000001'),
    ('question3', 'What is your hobby?', '00000000-0000-0000-0000-000000000001'),
    ('question4', 'What is your favorite movie?', '00000000-0000-0000-0000-000000000002'),
    ('question5', 'What is your favorite book?', '00000000-0000-0000-0000-000000000002'),
    ('question6', 'What is your favorite sport?', '00000000-0000-0000-0000-000000000002'),
    ('question7', 'What is your favorite music genre?', '00000000-0000-0000-0000-000000000003'),
    ('question8', 'What is your favorite holiday?', '00000000-0000-0000-0000-000000000003'),
    ('question9', 'What is your favorite animal?', '00000000-0000-0000-0000-000000000003');

-- Insert sample question set and question joins
INSERT INTO qset_question_joins (qset_id, question_id, position) VALUES
    ('qset1', 'question1', 1),
    ('qset1', 'question2', 2),
    ('qset1', 'question3', 3),
    ('qset2', 'question4', 1),
    ('qset2', 'question5', 2),
    ('qset2', 'question6', 3),
    ('qset3', 'question7', 1),
    ('qset3', 'question8', 2),
    ('qset3', 'question9', 3);

-- Insert sample interviewers
INSERT INTO interviewer (id, name, description, user_id) VALUES
    ('interviewer1', 'John Smith', 'Experienced interviewer', '00000000-0000-0000-0000-000000000001'),
    ('interviewer2', 'Jane Doe', 'Skilled interviewer', '00000000-0000-0000-0000-000000000002'),
    ('interviewer3', 'Mike Johnson', 'Professional interviewer', '00000000-0000-0000-0000-000000000003');

-- Insert sample interviews
INSERT INTO interviews (id, name, description, subject_id, interviewer_id) VALUES
    ('interview1', 'Interview 1', 'Interview with User 1', '00000000-0000-0000-0000-000000000001', 'interviewer1'),
    ('interview2', 'Interview 2', 'Interview with User 2', '00000000-0000-0000-0000-000000000002', 'interviewer2'),
    ('interview3', 'Interview 3', 'Interview with User 3', '00000000-0000-0000-0000-000000000003', 'interviewer3');

-- Insert sample answers
INSERT INTO answers (id, content, user_id) VALUES
    ('answer1', 'My favorite color is blue.', '00000000-0000-0000-0000-000000000001'),
    ('answer2', 'I love pizza.', '00000000-0000-0000-0000-000000000001'),
    ('answer3', 'I enjoy playing guitar.', '00000000-0000-0000-0000-000000000001'),
    ('answer4', 'My favorite movie is The Shawshank Redemption.', '00000000-0000-0000-0000-000000000002'),
    ('answer5', 'I love reading mystery novels.', '00000000-0000-0000-0000-000000000002'),
    ('answer6', 'I enjoy playing basketball.', '00000000-0000-0000-0000-000000000002'),
    ('answer7', 'I love listening to rock music.', '00000000-0000-0000-0000-000000000003'),
    ('answer8', 'Christmas is my favorite holiday.', '00000000-0000-0000-0000-000000000003'),
    ('answer9', 'I adore dogs.', '00000000-0000-0000-0000-000000000003'),
    ('answer10', 'My favorite color is green.', '00000000-0000-0000-0000-000000000001'),
    ('answer11', 'I also enjoy sushi.', '00000000-0000-0000-0000-000000000001'),
    ('answer12', 'I like hiking in my free time.', '00000000-0000-0000-0000-000000000001'),
    ('answer13', 'The Godfather is another favorite movie of mine.', '00000000-0000-0000-0000-000000000002'),
    ('answer14', 'I enjoy science fiction books as well.', '00000000-0000-0000-0000-000000000002'),
    ('answer15', 'I also enjoy playing tennis.', '00000000-0000-0000-0000-000000000002'),
    ('answer16', 'I appreciate classical music too.', '00000000-0000-0000-0000-000000000003'),
    ('answer17', 'I love Thanksgiving for the family gatherings.', '00000000-0000-0000-0000-000000000003'),
    ('answer18', 'Cats are also wonderful companions.', '00000000-0000-0000-0000-000000000003');

-- Insert sample question and answer joins
INSERT INTO question_answer_joins (question_id, answer_id, interview_id, position) VALUES
    ('question1', 'answer1', 'interview1', 1),
    ('question1', 'answer10', 'interview1', 2),
    ('question2', 'answer2', 'interview1', 1),
    ('question2', 'answer11', 'interview1', 2),
    ('question3', 'answer3', 'interview1', 1),
    ('question3', 'answer12', 'interview1', 2),
    ('question4', 'answer4', 'interview2', 1),
    ('question4', 'answer13', 'interview2', 2),
    ('question5', 'answer5', 'interview2', 1),
    ('question5', 'answer14', 'interview2', 2),
    ('question6', 'answer6', 'interview2', 1),
    ('question6', 'answer15', 'interview2', 2),
    ('question7', 'answer7', 'interview3', 1),
    ('question7', 'answer16', 'interview3', 2),
    ('question8', 'answer8', 'interview3', 1),
    ('question8', 'answer17', 'interview3', 2),
    ('question9', 'answer9', 'interview3', 1),
    ('question9', 'answer18', 'interview3', 2);
