# Tech Blog 
  ------
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Table of Contents
  ------

  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Questions & Contributions](#questions-contribute)

## Description 
----- 
CMS blog, WordPress / Medium style  full stack application. 
![Deployed on Heroku](https://radiant-headland-18315.herokuapp.com/)

Users who sign up and login to the site can subsequently view all published blog posts, add comments, and publish their own content. 

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Installation 
---- 
After cloning the repo to your machine, open your terminal and cd into the project directory. Next, run: 
```
mysql -u root -p; 
USE blog_db;
SOURCE db/schema.sql; 
exit;
```

After authenticating with mySQL and selecting the project database, in the same terminal, run:

```
npm i
npm run seeds
npm start 
```

## Usage 
-----
After installing all dependencies, 
be sure to create a ".dotenv" file to hide credentials as you wish. 

Open your browser and navigate to localhost:3001, where you will be prompted to login or signup. 

The rest is easy!
![image](https://user-images.githubusercontent.com/90655370/142331372-64f6d41b-fbc4-496e-9b66-fa060e830d1e.png)
![image](https://user-images.githubusercontent.com/90655370/142330772-6e870442-49e0-4880-b053-382b99f01b51.png)


## Questions & Contact 
------ 
Reach out 
ianclark@gmail.com

