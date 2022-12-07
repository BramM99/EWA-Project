start project using docker
1. have docker installed
2. run $ docker load -i frontend.tar
3. run $ docker load -i backend.tar
4. verify that the containers are installed using the command $ docker images
5. run $ docker run -p 4200:80 frontend
6. run $ docker run -p 8080:8080 infosupport/backend

You can also access our site using that's running on heroku using this link
https://ewa-infosupport4-fe-app.herokuapp.com/#/login