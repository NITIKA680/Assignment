# Assignment

This project is a simple skeleton code for Nodejs, Mongodb and Docker.

## Services

By now, the functional services are still decomposed into two core services. Each of them can be tested, built, and deployed independently.

### Backend service
Contains API related to CRUD Operation.

### Frontend service
Contains user Data, uses next.js


## How to run the project

    To run the project you need to install docker and docker-compose. 
    Here is the link to install <a href="https://phoenixnap.com/kb/install-docker-on-ubuntu-20-04">docker</a> and <a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04">docker-compose</a>

    Need to define the services on docker-compose.yml file.
    Steps:
    1. Clone the poroject.
       git clone https://github.com/your-username/fullstack-assessment.git
    2. Run command 
        cd assignment
        docker-compose up -d // to run the images on deattach mode.
    4. Backend service will run on 8000 port.
    5. Frontend service will run on 3000 port. 

## Docker commands
### Stop and remove container
    docker stop [container_name]
    docker stop $(docker ps -a -q) //to stop all container
    docker rm [container_name]
    docker rm $(docker ps -a -q) //to stop all container

### To check logs
    docker logs -f [container_name] --tail 100
