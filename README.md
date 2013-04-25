Ipz
---
A very simple service that shows your public ip address.
You can test it on [heroku](http://ipz.herokuapp.com/).

Ipz can also return your ip and hostname (if applicable) in JSON format.

Response
--------
Using CURL:

    $ curl -X GET -H "Accept: application/json" http://ipz.herokuapp.com/

will respond with:

    {"ip": "your ip here"}

or:

    {
        "ip": "79.167.55.15",
        "hostname": "foo"
    }


Nginx
-----
Sample configuration using nginx. It assumes that the application listens on port 8080.

    server {
        listen 80;
        server_name ip.example.com;

        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass http://127.0.0.1:8080;
            proxy_redirect off;
        }
    }

Run using Systemd
-----------------
See ipz.service


License
-------
Too basic stuff.. do whatever you want =)


Authors
-------
Tasos Latsas
