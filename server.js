const express = require('express')
, bodyParser = require('body-parser')
, cors = require('cors')
, massive = require('massive');
const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

massive('postgres://reyhhkjldkknsa:f67d73ddd21201f56f346596491319f6048db0a2e0b4b7fd815ca0a3066ea2b4@ec2-23-23-78-213.compute-1.amazonaws.com:5432/d48ro45adqeh4i?ssl=true')
.then( db => {
    app.set('db', db);
    db.init_tables.user_create_seed().then( response => {
      console.log('User table init');
      db.init_tables.vehicle_create_seed().then( response => {
        console.log('Vehicle table init');
      })
    })
  
  })

  app.get('/api/users', mainCtrl.getAllUsers)
  app.get('/api/vehicles', mainCtrl.getAllVehicles)
  app.post('/api/users', mainCtrl.createUser)
  app.post('/api/vehicles', mainCtrl.createVehicle)
  app.get('/api/user/:userId/vehiclecount', mainCtrl.getVehicleCount)
  app.get('/api/user/:userId/vehicle', mainCtrl.getUserVehicles)
  app.get('/api/vehicle', mainCtrl.getVehiclesByQuery)
  app.get('/api/newervehiclesbyyear', mainCtrl.getVehiclesByYear)
  app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.changeOwner)
  app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.removeOwner)
  app.delete('/api/vehicle/:vehicleId', mainCtrl.deleteVehicle)





  const port = 3000;
  app.listen(port, () => {
    console.log('Ship docked at port ', port);
  })
