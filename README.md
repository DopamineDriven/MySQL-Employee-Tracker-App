# MySQL-Employee-Tracker-App
CMS (Content Management System) app using MySQL, Inquirer, Node.js, and CLI

# User Overview
This app is oriented towards business owners. It allows an owner/manager/executive to view and manage departments, roles, and employees within their company. This consolidates and simplifies the process of updating employee directories

# Technical Overview

User input data is stored in a SQL database. The mysql npm dependency is required to connect the schema and seeded sql files with the remainder of the program. Inquirer is required to allow the user to interact with node-CLI. The console.table npm simply enhanes preexisting node console.table UI/UX. There is a db.js file in which a constructor creates a new mysql connection with the provided configuration.    

# YouTube video outlining functionality

https://youtu.be/OaTQCoYhC9o

## npm dependencies
console.table - https://www.npmjs.com/package/console.table
inquirer - https://www.npmjs.com/package/inquirer
mysql - https://www.npmjs.com/package/mysql

## CLI

This program allows the user to:
- View 
    - All employees
    - All employees by department
    - Details for all employees
    - All Departments
    - All roles
- Add
    - Employee
    - Role
    - Department
- Update
    - Employee Role
- Remove
    - Employee


## Note

This repository was made new after the original repo suffered an unrectifiable memory leak near completion of the app.  