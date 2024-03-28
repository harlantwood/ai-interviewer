User
- has many QuestionGroups

QuestionGroup
- has many Questions

Interview
- has one User
- has one QuestionGroup

Question
- has many Answers through QuestionAnswerJoins
