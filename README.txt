Nodejs DMZ

is a demilitarized zone for connect internal or external zone.

Prerequisites:
- nodejs 10.16


=====================================
Development Environment
=====================================

Run application:
- On any terminal move to the "nodejs-dmz" folder and execute these commands:

npm run start:dev


=====================================
Some Curl command examples
=====================================

curl -i -H "Content-Type: application/json" -X POST -d "{'account':'u1234', 'password':'1234'}" http://localhost:3001/account/verify
curl -i -H "Content-Type: application/json" -X GET http://localhost:1234/account/1234