const router = require('express').Router();

// Import Knex

const knex = require('knex');

// Configure Knex

const knexConfig = { // configuration object
  client: 'sqlite3', // << use this adapter to connect to the database
  connection: {// string or object
    filename: './data/Rolex.db3' // from the root folder
  },
  useNullAsDefault: true
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
  // get the roles from the database (select * from roles)
  db('roles') // << return a promise with all the rows
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => {
      console.log(err)
    })
});

// select * from roles where id = :id
router.get('/:id', (req, res) => {
  // retrieve a role by id
  db('roles')
    .where({ id: req.params.id })
    .first() // grabs the first object in the collection that is sent back
    .then(role => {
      if (role) {
        res.status(200).json(role)
      } else {
        res.status(404).json({ errorMessage: 'Role not found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

// insert into roles () values (req.body)
router.post('/', (req, res) => {
  // add a role to the database
  db('roles')
  .insert(req.body, 'id') // returning method will return the id of the last record entered
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      console.log(err)
    })
});

router.put('/:id', (req, res) => {
  // update roles
  db('roles')
    .where({ id: req.params.id }) // Filter records first!!!
    .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: `${count} records updated.`})
        } else {
          res.status(404).json({ message: 'Role does not exist' })
        }
      })
      .catch(err => {
        res.status(500).json({ error: err })
      })
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  db('roles')
  .where({ id: req.params.id }) // Filter records first!!!
  .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record deleted`})
      } else {
        res.status(404).json({ message: 'Role does not exist' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
});

module.exports = router;