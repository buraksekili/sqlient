# sqlient
[![DeepScan grade](https://deepscan.io/api/teams/10736/projects/14158/branches/256187/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10736&pid=14158&bid=256187)

sqlient is an UI for MySQL database to execute queries on MySQL.

## Project
'sqlient' is built with Electron.js and React.js. React codes are not available to use in the Electron environment. 
Therefore, webpack watches changings in React files to compile it into .js file located in ./build/js/.
Electron uses the compiled React files. So, npm run watch is essential to use React in Electron.

## Setting up the local environment
#### Dependencies
Clone the repo and install dependencies;
```
git clone https://github.com/buraksekili/sqlient.git
cd sqlient/
npm install
cd server/
npm install
```
#### Run development
```
npm run watch
npm start
cd server/
node server.js
```

![sqlientnew](https://user-images.githubusercontent.com/32663655/95562132-6be1e980-0a24-11eb-9e61-ff84f462b168.PNG)

### Inspiration

Highly inspired by [mogollar](https://github.com/dashersw/mogollar)
