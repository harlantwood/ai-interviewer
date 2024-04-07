-- create table users (
--   id uuid references auth.users not null primary key,
--   created_at timestamp(6) without time zone not null default now()
-- );

create table interviewer (  -- an intervier persona, eg Terry Gross, not a user
  id varchar(44) not null primary key,
  name character varying,
  description text,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table scripts (
  id varchar(44) not null primary key,
  name character varying,
  description text,
  user_id uuid references auth.users not null,
  created_at timestamp(6) without time zone not null default now()
);

create table script_questions (
  id varchar(44) not null primary key,
  content text not null,
  script_id varchar(44) references scripts not null,
  created_at timestamp(6) without time zone not null default now()
);

create table interviews (
  id varchar(44) not null primary key,
  name character varying,
  description text,
  subject_id uuid references auth.users not null,
  interviewer_id varchar(44) references interviewer not null,
  script_id varchar(44) references scripts not null,
  created_at timestamp(6) without time zone not null default now()
);

create table interview_questions (
  id varchar(44) not null primary key,
  content text not null,
  script_question_id varchar(44) references script_questions not null,
  interview_id varchar(44) references interviews not null,
  created_at timestamp(6) without time zone not null default now()
);

create table answers (
  id varchar(44) not null primary key,
  transcript text not null,
  summary text,
  -- interview_question_id varchar(44) references interview_questions not null,
  created_at timestamp(6) without time zone not null default now()
);

-- Join table for script and script_questions
create table script_script_question_joins (
  script_id varchar(44) references scripts not null,
  script_question_id varchar(44) references script_questions not null,
  position double precision not null,
  primary key (script_id, script_question_id),
  created_at timestamp(6) without time zone not null default now()
);

-- Join table for interview and script_questions (through script)
create table interview_script_question_joins (
  interview_id varchar(44) references interviews not null,
  script_question_id varchar(44) references script_questions not null,
  position double precision not null,
  primary key (interview_id, script_question_id),
  created_at timestamp(6) without time zone not null default now()
);

-- Join table for interview_question and answers
create table interview_question_answer_joins (
  interview_question_id varchar(44) references interview_questions not null,
  answer_id varchar(44) references answers not null,
  position double precision not null,
  primary key (interview_question_id, answer_id),
  created_at timestamp(6) without time zone not null default now()
);
