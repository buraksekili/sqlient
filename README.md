# sqlient
[![DeepScan grade](https://deepscan.io/api/teams/10736/projects/14158/branches/256187/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10736&pid=14158&bid=256187)

sqlient is an UI for MySQL database to execute queries on MySQL.

## Project
'sqlient' is built with Electron.js and React.js. React codes are not available to use in the Electron environment. 
Therefore, webpack watches changings in React files to compile it into .js file located in ./build/js/.
Electron uses the compiled React files. So, npm run watch is essential to use React in Electron.

## Setting up the local environment

```
npm run watch
npm start
cd server/
node server.js
```

![sqlient](https://user-images.githubusercontent.com/32663655/95561823-faa23680-0a23-11eb-97ae-161d789f2a24.PNG)


### Inspiration

Highly inspired by [mogollar](https://github.com/dashersw/mogollar)
