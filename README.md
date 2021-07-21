## Automating attendance for PS1 at 8:45 AM (anytime basically)

Dockerfile also included to ease deployment on cloud (Docker container has UTC timezone by default)

Environment Variables to be set:
- googleId
- googlePass
- telegramBotApiToken
- chatId
- NTBA_FIX_319 (equal to 1)
- NTBA_FIX_350 (equal to 1)

This can be done by creating a file named ".env" in the root directory with all the environment variables also.
