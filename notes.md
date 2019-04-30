Client talks to API which will communicate with the database (server)

client -> API (knex + adapter) -> DB (Server)

adapter is sqlite3

ORM = Object Relational Mapper

ORMs include a query builder

Query Builders translate form a programming language to SQL

Steps:

1. [x] Create a database
2. [x] Add a 'roles' table
3. [x] install knex and the adapter for sqlite3
4. [x] configure knex to talk to our DB
5. [x] list all roles
6. list a role by id
7. add a role
8. remove a role
9. update a role