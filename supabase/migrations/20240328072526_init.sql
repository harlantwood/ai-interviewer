create table qset (  -- question set
  id uuid not null default uuid_generate_v4() primary key,
  name character varying,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table questions (
  id uuid not null default uuid_generate_v4() primary key,
  content text not null,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table qset_question_joins ( -- a question can be in multiple qsets
  qset_id uuid references qset not null,
  question_id uuid references questions not null,
  position double precision not null,

  primary key (qset_id, question_id),

  created_at timestamp(6) without time zone not null default now()
);

create table interviewer (  -- an intervier persona, eg Terry Gross, not a user
  id uuid not null default uuid_generate_v4() primary key,
  name character varying,
  description text,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table interviews (
  id uuid not null default uuid_generate_v4() primary key,
  name character varying,
  description text,

  subject_id uuid references auth.users not null,
  interviewer_id uuid references interviewer not null,

  created_at timestamp(6) without time zone not null default now()
);

create table answers (
  id uuid not null default uuid_generate_v4() primary key,
  content text not null,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table question_answer_joins (
  question_id uuid references questions not null,
  answer_id uuid references answers not null,
  interview_id uuid references interviews not null,

  position double precision not null,

  primary key (question_id, answer_id, interview_id),

  created_at timestamp(6) without time zone not null default now()
);


-- alter publication supabase_realtime add table nodes;
-- alter publication supabase_realtime add table spheres;
