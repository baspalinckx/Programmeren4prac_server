
//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();

var register = require('../functions/register');
var login = require('../functions/login');
var auth = require('../auth/authentication');

//
// Hier gaat de gebruiker inloggen.
// Input: username en wachtwoord
// ToDo: 
//	 - zoek de username in de database, en vind het password dat opgeslagen is
// 	 - als user gevonden en password matcht, dan return valide token
//   - anders is de inlogpoging gefaald - geef foutmelding terug.
//

router.post('/register', function (req,res) {

    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password || !email.trim() || !password.trim()) {

        res.status(400).json({message: 'Invalid Request !'});
    } else {

        register.registerUser(email, password).then(function (result) {

            res.setHeader('Location', '/users/' + email);
            res.status(result.status).json({message: result.message});
        }).catch(function (err) {
            return res.status(err.status).json({message: err.message});
        });
    }
});



router.post('/login', function(req, res) {

    // Even kijken wat de inhoud is
    console.dir(req.body);

    var credentials = auth(req);

    if (!credentials) {

        res.status(400).json({message: 'Invalid Request !'});
    } else {

        login.loginUser(credentials.name, credentials.pass).then(function (result) {

            var token = auth.encodeToken(username);
            res.status(200).json({
                "token": token,
            });


        }).catch(function (err) {
            return res.status(err.status).json({message: err.message});
        });
    }
});


//     // Kijk of de gegevens matchen. Zo ja, dan token genereren en terugsturen.
//     if (username == _dummy_username && password == _dummy_password) {
//         var token = auth.encodeToken(username);
//         res.status(200).json({
//             "token": token,
//         });
//     } else {
//         console.log('Input: username = ' + username + ', password = ' + password);
//         res.status(401).json({ "error": "Invalid credentials, bye" })
//     }
//
// });

// Hiermee maken we onze router zichtbaar voor andere bestanden. 
module.exports = router;
