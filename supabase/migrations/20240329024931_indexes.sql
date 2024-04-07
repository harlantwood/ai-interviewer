-- -- Indexes for the `qset` table
-- CREATE INDEX idx_qset_user_id ON qset(user_id);

-- -- Indexes for the `questions` table
-- CREATE INDEX idx_questions_user_id ON questions(user_id);

-- -- Indexes for the `qset_question_joins` table
-- CREATE INDEX idx_qset_question_joins_qset_id ON qset_question_joins(qset_id);
-- CREATE INDEX idx_qset_question_joins_question_id ON qset_question_joins(question_id);
-- CREATE INDEX idx_qset_question_joins_position ON qset_question_joins(position);

-- -- Indexes for the `interviewer` table
-- CREATE INDEX idx_interviewer_user_id ON interviewer(user_id);

-- -- Indexes for the `interviews` table
-- CREATE INDEX idx_interviews_subject_id ON interviews(subject_id);
-- CREATE INDEX idx_interviews_interviewer_id ON interviews(interviewer_id);

-- -- Indexes for the `answers` table
-- CREATE INDEX idx_answers_user_id ON answers(user_id);

-- -- Indexes for the `question_answer_joins` table
-- CREATE INDEX idx_question_answer_joins_question_id ON question_answer_joins(question_id);
-- CREATE INDEX idx_question_answer_joins_answer_id ON question_answer_joins(answer_id);
-- CREATE INDEX idx_question_answer_joins_interview_id ON question_answer_joins(interview_id);
-- CREATE INDEX idx_question_answer_joins_position ON question_answer_joins(position);
