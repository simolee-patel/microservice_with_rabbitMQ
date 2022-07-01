This is a sample project for microservice with rabbitMQ

for start rabbitMQ in local with docker use this command

> docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management

then you can use rabbitMQ server with local url: http://localhost:15672/

default username and password is guest

Here Task is publisher in queue
-> when new task is added then publish it in queue

User is subscriber
->it always listen to the event when new events compes it will store it in it's database

Main use of rabbitMQ here is if any one service is down and another send any event then it store event in the queue until user service subscribe and acknolege it
