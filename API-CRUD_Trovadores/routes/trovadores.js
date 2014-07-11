// trovadores.js
//======================================================================================
module.exports = function(app) {

  var Tshirt = require('../models/trovador.js');

  //GET - Return all trovadores in the DB
  findAllTrovadores = function(req, res) {
    console.log("GET - /trovadores");
    return Trovador.find(function(err, trovadores) {
      if(!err) {
        return res.send(trovadores);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //GET - Return a trovador with specified ID
  findById = function(req, res) {
    console.log("GET - /trovador/:id");
    return Tshirt.findById(req.params.id, function(err, trovador) {
      if(!trovador) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, trovador { trovador values }}
        return res.send({ status: 'OK', trovador:trovador });
        // Send {trovador values}
        // return res.send(trovador);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //POST - Insert a new trovador in the DB
  addTrovador = function(req, res) {
    console.log('POST - /trovador');
    console.log(req.body);

    var trovador = new Trovador({
      model:    req.body.model,
      images :  req.body.images, 
      style:    req.body.style,
      album:    req.body.album, 
      birthday: req.body.birthday 
    });

    tshirt.save(function(err) {
      if(!err) {
        console.log("Tshirt created");
        return res.send({ status: 'OK', trovador:trovador });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });

    res.send(trovador);
  };

  //PUT - Update a register already exists
  updateTrovador = function(req, res) {
    console.log("PUT - /trovador/:id");
    console.log(req.body);
    return Trovador.findById(req.params.id, function(err, trovador) {
      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.model != null) trovador.model = req.body.model;
      if (req.body.images != null) trovador.images = req.body.images; 
      if (req.body.style != null) trovador.style = req.body.style;
      if (req.body.album != null) trovador.album  = req.body.album;
      if (req.body.birthday != null) trovador.birthday = req.body.birthday;

      return trovador.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', trovador:trovador });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(trovador);
      });
    });
  }

  //DELETE - Delete a trovador with specified ID
  deleteTrovador = function(req, res) {
    console.log("DELETE - /trovador/:id");
    return Tshirt.findById(req.params.id, function(err, trovador) {
      if(!trovador) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return trovador.remove(function(err) {
        if(!err) {
          console.log('Removed trovador');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and functions
  app.get('/trovador', findAllTrovadores);
  app.get('/trovador/:id', findById);
  app.post('/trovador', addTrovador);
  app.put('/trovador/:id', updateTrovador);
  app.delete('/trovador/:id', deleteTrovador);

}