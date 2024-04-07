User
- has many Scripts (that they own)
- has many Interviews (as subject)

Script
- has many ScriptQuestions
- fields
  - name
  - description

Interview
- has one subject (User)
- has one Script
- has many ScriptQuestions through Script
- has many InterviewQuestions
- fields
  - name
  - description

ScriptQuestions
- fields
  - content

InterviewQuestion
- has one ScriptQuestion
- has many Answers
- fields
  - content

Answer
- transcript
- summary
