# docker-demo-www

A simple web application that enable to:
- create a message
- list the existing message

This application sends request to an api though the API environment variable.

It uses a redis kv store to save sessions through REDIS_HOST environment variable.
