module.exports = {

    getAllUsers: ( req, res ) => {
        req.app.get('db').getAllUsers().then( users => {
            res.status(200).send(users)
        }).catch( () => res.status(500).send() );
    },

    getAllVehicles: (req, res ) => {
        req.app.get('db').getAllVehicles().then( vehicles => {
            res.status(200).send(vehicles)
        }).catch( () => res.status(500).send() );
    },

    createUser: ( req, res ) => {
        const db = req.app.get('db');
        const { name, email } = req.body;

        db.createUser([name, email])
        .then( (user) => res.status(200).send( user ) )
        .catch( () => res.status(500).send() );

    },

    createVehicle: ( req, res ) => {
        const db = req.app.get('db');
        const { make, model, year, owner_id } = req.body;

        db.createVehicle([make, model, year, owner_id])
        .then( (vehicle) => res.status(200).send(vehicle) )
        .catch( () => res.status(500).send() );

    },
    
    getVehicleCount: ( req, res, next ) => {
        const db = req.app.get('db');
        const { params } = req;
    
        db.getVehicleCount( params.userId )
          .then( vehicles => res.status(200).send( vehicles ) )
          .catch( () => res.status(500).send() );
    },

    getUserVehicles: ( req, res, next ) => {
        const db = req.app.get('db');
        const { params } = req;
    
        db.getUserVehicles( params.userId )
          .then( vehicles => res.status(200).send( vehicles ) )
          .catch( () => res.status(500).send() );  
    },

    getVehiclesByQuery: ( req, res, next ) => {
        const db = req.app.get('db');
        const { query } = req;
        if(query.userEmail){
            return db.getVehicleEmail([query.userEmail])
            .then(vehicles => res.status(200).send( vehicles ))
            .catch( () => res.status(500).send() );
        } else if(query.userFirstStart){
            return db.getVehiclesByLetter([query.userFirstStart + '%'])
            .then(vehicles => res.status(200).send( vehicles ))
            .catch( () => res.status(500).send() )
        }
    },

    getVehiclesByYear: ( req, res, next ) => {
        const db = req.app.get('db')
        db.getVehicleByYear()
        .then(vehicles => res.status(200).send( vehicles ))
        .catch( () => res.status(500).send() )
    },

    changeOwner: ( req, res, next ) => {
        const db = req.app.get('db')
        const { params } = req
        db.changeOwner([params.vehicleId, params.userId])
        .then( vehicles => res.status(200).send( vehicles ))
        .catch( () => res.status(500).send() )
    },

    removeOwner: ( req, res, next ) => {
        const db = req.app.get('db')
        const { params } = req
        db.deleteOwnership([params.vehicleId, params.userId])
        .then(vehicles => res.status(200).send( vehicles ))
        .catch( () => res.status(500).send() )
    },

    deleteVehicle: ( req, res, next ) => {
        const db = req.app.get('db')
        const { params } = req
        db.deleteVehicle([params.vehicleId])
        .then(vehicle => res.status(200).send( vehicle ))
        .catch( () => res.status(500).send() )
    }

}
