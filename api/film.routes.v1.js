//
// ./api/film.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var db = require('../config/db');

//
// Geef een lijst van alle todos. Dat kunnen er veel zijn.
//
routes.get('/films', function(req, res) {
    res.contentType('application/json');

    db.query('SELECT * FROM film', function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Retourneer één specifieke film.
//
routes.get('/films/:filmid', function(req, res) {

    var filmId = req.params.filmid;

    res.contentType('application/json');

    db.query('SELECT * FROM film WHERE film_id=?', [filmId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

routes.get('/rentals/:userid', function(req, res) {

    var userId = req.params.userid;

    res.contentType('application/json');

    db.query('SELECT '  +
        'film.film_id, ' +
        'film.title, ' +
        'inventory.inventory_id, ' +
        'rental.rental_id, ' +
        'rental.rental_date, ' +
        'rental.return_date, ' +
        'customer.first_name, ' +
        'customer.customer_id, ' +
        'customer.last_name, ' +
        'customer.active ' +
        'FROM film ' +
        'LEFT JOIN inventory USING(film_id) ' +
        'LEFT JOIN rental USING(inventory_id) ' +
        'LEFT JOIN customer USING(customer_id) ' +
        'WHERE customer_id=?;', [userId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Voeg een todo toe. De nieuwe info wordt gestuurd via de body van de request message.
//
routes.post('/rentals/:userid/:inventoryid', function(req, res) {

    // var userid = req.body.userid;
    // var inventoryid =req.body.inventoryid;

    var rentals = req.body;
    var query = {
        sql: 'INSERT INTO `rental`(`rental_id`, `rental_date`, `inventory_id`, `customer_id`, `return_date`, `staff_id`, `last_update`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values: [rentals.rental_id, rentals.rental_date, req.body.inventoryid, req.body.userid, rentals.return_date, rentals.staff_id, rentals.last_update],
        timeout: 2000 // 2secs
    };

    console.dir(rentals);
    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        }
    });
});

//
// Wijzig een bestaande todo. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de todos mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/todos/23
//
routes.put('/todos/:id', function(req, res) {

    var todos = req.body;
    var ID = req.params.id;
    var query = {
        sql: 'UPDATE `todos` SET Title=? , Beschrijving=? WHERE ID=?',
        values: [todos.Title, todos.Beschrijving, ID],
        timeout: 2000 // 2secs
    };

    console.dir(todos);
    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Verwijder een bestaande todo.
// Er zijn twee manieren om de id van de todos mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/todos/23
//
routes.delete('/todos/:id', function(req, res) {

    var ID = req.params.id;
    var query = {
        sql: 'DELETE FROM `todos` WHERE ID=?',
        values: [ID],
        timeout: 2000 // 2secs
    };

    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

module.exports = routes;