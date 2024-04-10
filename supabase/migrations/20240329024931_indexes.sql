-- Indexes for table: interviewer
CREATE INDEX idx_interviewer_user_id ON interviewer (user_id);

-- Indexes for table: scripts
CREATE INDEX idx_scripts_user_id ON scripts (user_id);

-- Indexes for table: script_questions
CREATE INDEX idx_script_questions_script_id ON script_questions (script_id);

-- Indexes for table: interviews
CREATE INDEX idx_interviews_subject_id ON interviews (subject_id);
CREATE INDEX idx_interviews_interviewer_id ON interviews (interviewer_id);
CREATE INDEX idx_interviews_script_id ON interviews (script_id);

-- Indexes for table: interview_questions
CREATE INDEX idx_interview_questions_script_question_id ON interview_questions (script_question_id);
CREATE INDEX idx_interview_questions_interview_id ON interview_questions (interview_id);

-- Indexes for table: answers
-- CREATE INDEX idx_answers_interview_question_id ON answers (interview_question_id);

-- Indexes for table: script_script_question_joins
CREATE INDEX idx_script_script_question_joins_script_id ON script_script_question_joins (script_id);
CREATE INDEX idx_script_script_question_joins_script_question_id ON script_script_question_joins (script_question_id);

-- Indexes for table: interview_script_question_joins
CREATE INDEX idx_interview_script_question_joins_interview_id ON interview_script_question_joins (interview_id);
CREATE INDEX idx_interview_script_question_joins_script_question_id ON interview_script_question_joins (script_question_id);

-- Indexes for table: interview_question_answer_joins
CREATE INDEX idx_interview_question_answer_joins_interview_question_id ON interview_question_answer_joins (interview_question_id);
CREATE INDEX idx_interview_question_answer_joins_answer_id ON interview_question_answer_joins (answer_id);
