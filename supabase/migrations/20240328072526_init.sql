create table qset (  -- question set
  id char(44) not null primary key,
  name character varying,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

-- follow up questions -  not part of qset, hmmmm
create table questions (
  id char(44) not null primary key,
  content text not null,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table qset_question_joins ( -- a question can be in multiple qsets
  qset_id char(44) references qset not null,
  question_id char(44) references questions not null,
  position double precision not null,

  primary key (qset_id, question_id),

  created_at timestamp(6) without time zone not null default now()
);

create table interviewer (  -- an intervier persona, eg Terry Gross, not a user
  id char(44) not null primary key,
  name character varying,
  description text,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table interviews (
  id char(44) not null primary key,
  name character varying,
  description text,

  subject_id uuid references auth.users not null,
  interviewer_id char(44) references interviewer not null,

  created_at timestamp(6) without time zone not null default now()
);

create table answers (
  id char(44) not null primary key,
  content text not null,

  user_id uuid references auth.users not null,

  created_at timestamp(6) without time zone not null default now()
);

create table question_answer_joins (
  question_id char(44) references questions not null,
  answer_id char(44) references answers not null,
  interview_id char(44) references interviews not null,

  position double precision not null,

  primary key (question_id, answer_id, interview_id),

  created_at timestamp(6) without time zone not null default now()
);


-- alter publication supabase_realtime add table nodes;
-- alter publication supabase_realtime add table spheres;
