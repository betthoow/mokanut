'use strict'

/**
 * Module dependencies.
 */

var express = require('express'),
    request = require('request'),
    cors = require('cors');

var app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use(cors());

/* my code */ 
 var TOKEN = '';

 var FeedUpSelling = { 
    "FeedList": [
        {
            "GroupId": 33737,
            "IgnoreHTML": true,
            "Id": 67582,
            "Login": "DomA_Approver",
            "Name": "GolfDemo_CurrentOrder",
            "Password": "33;85;-93;-25;113;-25;22;101;86;60;-110;-51;-42;-45;-59;43;-57;-109;-18;-65;107;-10;70;-28;-72;112;-22;-111;-128;-37;126;-40;-40;42;27;46;-10;-17;-56;-79;74;81;-64;-33;-53;99;-23;80;-46;-64;115;77;66;69;62;-6;-98;-113;62;-34;75;21;-19;-93;83;115;-128;22;56;115;4;-32;111;117;4;-39;-117;113;-87;-63;-72;62;38;67;-95;-80;-75;-84;96;39;20;-112;85;12;-12;98;-10;-90;73;3;80;-46;-81;119;-35;113;43;10;-33;-55;92;13;13;62;21;-37;90;-100;-24;38;-100;-42;-55;88;-65;8;-124;117;-114;4;-59;-107;-93;-115;74;40;-128;-108;39;97;-87;66;3;-22;14;117;34;98;27;-93;-100;92;-63;-37;-78;110;117;-44;-70;86;26;-100;-92;-62;122;76;107;100;-100;-121;114;2;32;-20;-34;-80;-9;-121;-120;76;6;92;-21;2;-122;71;-108;99;-91;-19;-38;100;35;31;106;3;101;26;50;-45;46;76;23;-54;100;-35;70;3;19;109;-90;31;-84;-91;28;21;",
            "ReferentName": "A",
            "RefreshPeriod": 1000000,
            "StartLine": 1,
            "EndLine": 999,
            "Type": "ServerFeed",
            "URL": "",
            "FeedTextList": [
                {
                    "ColumnIndex": 0,
                    "LineIndex": 0,
                    "Text": "0",
                    "FeedId": 67582
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 0,
                    "Text": "0",
                    "FeedId": 67582
                },
                {
                    "ColumnIndex": 2,
                    "LineIndex": 0,
                    "Text": "0",
                    "FeedId": 67582
                },
                {
                    "ColumnIndex": 3,
                    "LineIndex": 0,
                    "Text": "0",
                    "FeedId": 67582
                }
            ],
            "FeedFieldList": [
                {
                    "Id": 731197,
                    "FeedId": 67582,
                    "Name": "A",
                    "Type": "Number"
                },
                {
                    "Id": 731198,
                    "FeedId": 67582,
                    "Name": "B",
                    "Type": "Number"
                },
                {
                    "Id": 731199,
                    "FeedId": 67582,
                    "Name": "C",
                    "Type": "Number"
                },
                {
                    "Id": 731200,
                    "FeedId": 67582,
                    "Name": "D",
                    "Type": "Number"
                },
                {
                    "Id": 731201,
                    "FeedId": 67582,
                    "Name": "E",
                    "Type": "Text"
                },
                {
                    "Id": 731202,
                    "FeedId": 67582,
                    "Name": "F",
                    "Type": "Text"
                },
                {
                    "Id": 731203,
                    "FeedId": 67582,
                    "Name": "G",
                    "Type": "Text"
                },
                {
                    "Id": 731204,
                    "FeedId": 67582,
                    "Name": "H",
                    "Type": "Text"
                },
                {
                    "Id": 731205,
                    "FeedId": 67582,
                    "Name": "I",
                    "Type": "Text"
                },
                {
                    "Id": 731206,
                    "FeedId": 67582,
                    "Name": "J",
                    "Type": "Text"
                },
                {
                    "Id": 731207,
                    "FeedId": 67582,
                    "Name": "K",
                    "Type": "Text"
                },
                {
                    "Id": 731208,
                    "FeedId": 67582,
                    "Name": "L",
                    "Type": "Text"
                },
                {
                    "Id": 731209,
                    "FeedId": 67582,
                    "Name": "M",
                    "Type": "Text"
                },
                {
                    "Id": 731210,
                    "FeedId": 67582,
                    "Name": "N",
                    "Type": "Text"
                },
                {
                    "Id": 731211,
                    "FeedId": 67582,
                    "Name": "O",
                    "Type": "Text"
                },
                {
                    "Id": 731212,
                    "FeedId": 67582,
                    "Name": "P",
                    "Type": "Text"
                }
            ]
        }
      ]
    }
      

app.use('/qlapi', function(req, res, next){
    console.log("Getting token")
    request.post(
        'https://europe.navori.com/NavoriService/Api/GetToken',
        { json: { 'Login': 'topgolf_api' , 'Password': 'Navori75@' } },
        function (error, response, body) {
              //console.log(body);
              //res.send(body)
              TOKEN = body.Token

          // all good, store req.key for route access
          req.key = body.Token;
          next();
        }
    );
});

/** Setting Current ORDER feed  */
app.use('/qlapi/currentorder', function(req, res){
    console.log("Setting Feed")
    /** Set Feed call */

    //console.log(req.query );
    
    if ( "burgers" in req.query && req.query.burgers >= 0 ){
        
        FeedUpSelling.FeedList[0].FeedTextList[0].Text = req.query.burgers;
    }
    
    if ( "sides" in req.query && req.query.sides >= 0 ){
        //console.log( req.query.sides)
        FeedUpSelling.FeedList[0].FeedTextList[1].Text = req.query.sides;
    }
    if ( "drinks" in req.query && req.query.drinks>=0 ){
        //console.log( req.query.drinks)
        FeedUpSelling.FeedList[0].FeedTextList[2].Text = req.query.drinks;
    }
    if ( "beers" in req.query && req.query.beers >=0){
        //console.log( req.query.beers)
        FeedUpSelling.FeedList[0].FeedTextList[3].Text = req.query.beers;
    }

    sendFeedAPI(FeedUpSelling, res, req);
});

var FeedQualityShoot = {
    "FeedList" : [
        {
            "GroupId": 33737,
            "IgnoreHTML": true,
            "Id": 67583,
            "Login": "DomA_Approver",
            "Name": "GolfDemo_Hits",
            "Password": "57;76;-22;-128;-102;-122;-44;59;72;94;-3;-68;25;-25;-42;14;-67;-20;-8;29;21;-116;-8;-116;80;23;-124;-55;-61;-33;101;52;-86;-23;89;35;-118;-91;22;-13;102;-24;94;-119;-104;-114;35;102;70;114;121;-62;108;59;125;-43;",
            "ReferentName": "A",
            "RefreshPeriod": 1000,
            "StartLine": 1,
            "EndLine": 1,
            "Type": "ServerFeed",
            "URL": "",
            "FeedTextList": [
                {
                    "ColumnIndex": 0,
                    "LineIndex": 0,
                    "Text": "Michael",
                    "FeedId": 67583
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 0,
                    "Text": "9",
                    "FeedId": 67583
                },
                {
                    "ColumnIndex": 2,
                    "LineIndex": 0,
                    "Text": "0",
                    "FeedId": 67583
                }
            ],
            "FeedFieldList": [
                {
                    "Id": 731213,
                    "FeedId": 67583,
                    "Name": "A",
                    "Type": "Text"
                },
                {
                    "Id": 731214,
                    "FeedId": 67583,
                    "Name": "B",
                    "Type": "Text"
                },
                {
                    "Id": 731215,
                    "FeedId": 67583,
                    "Name": "C",
                    "Type": "Text"
                },
                {
                    "Id": 731216,
                    "FeedId": 67583,
                    "Name": "D",
                    "Type": "Text"
                },
                {
                    "Id": 731217,
                    "FeedId": 67583,
                    "Name": "E",
                    "Type": "Text"
                },
                {
                    "Id": 731218,
                    "FeedId": 67583,
                    "Name": "F",
                    "Type": "Text"
                },
                {
                    "Id": 731219,
                    "FeedId": 67583,
                    "Name": "G",
                    "Type": "Text"
                },
                {
                    "Id": 731220,
                    "FeedId": 67583,
                    "Name": "H",
                    "Type": "Text"
                },
                {
                    "Id": 731221,
                    "FeedId": 67583,
                    "Name": "I",
                    "Type": "Text"
                },
                {
                    "Id": 731222,
                    "FeedId": 67583,
                    "Name": "J",
                    "Type": "Text"
                },
                {
                    "Id": 731223,
                    "FeedId": 67583,
                    "Name": "K",
                    "Type": "Text"
                },
                {
                    "Id": 731224,
                    "FeedId": 67583,
                    "Name": "L",
                    "Type": "Text"
                },
                {
                    "Id": 731225,
                    "FeedId": 67583,
                    "Name": "M",
                    "Type": "Text"
                },
                {
                    "Id": 731226,
                    "FeedId": 67583,
                    "Name": "N",
                    "Type": "Text"
                },
                {
                    "Id": 731227,
                    "FeedId": 67583,
                    "Name": "O",
                    "Type": "Text"
                },
                {
                    "Id": 731228,
                    "FeedId": 67583,
                    "Name": "P",
                    "Type": "Text"
                }
            ]
        }
    ]
}

app.use('/qlapi/qualityshoot', function(req, res){
    console.log("Quality shoot")
    /** Set Feed call */

    if ( "shootqa" in req.query ){
        console.log(req.query.shootqa)
        FeedQualityShoot.FeedList[0].FeedTextList[2].Text = req.query.shootqa;
    }



    sendFeedAPI(FeedQualityShoot, res, req);
});

var FeedReservation = {
    "FeedList" : [
        {
            "GroupId": 33737,
            "IgnoreHTML": true,
            "Id": 67581,
            "Login": "",
            "Name": "GolfDemo_ReservedBay",
            "Password": "57;76;-22;-128;-102;-122;-44;59;72;94;-3;-68;25;-25;-42;14;-67;-20;-8;29;21;-116;-8;-116;80;23;-124;-55;-61;-33;101;52;-86;-23;89;35;-118;-91;22;-13;102;-24;94;-119;-104;-114;35;102;70;114;121;-62;108;59;125;-43;",
            "ReferentName": "A",
            "RefreshPeriod": 1800000,
            "StartLine": 1,
            "EndLine": 999,
            "Type": "ServerFeed",
            "URL": "",
            "FeedTextList": [
                {
                    "ColumnIndex": 0,
                    "LineIndex": 0,
                    "Text": "1",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 0,
                    "LineIndex": 1,
                    "Text": "2",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 0,
                    "LineIndex": 2,
                    "Text": "3",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 0,
                    "LineIndex": 3,
                    "Text": "4",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 0,
                    "LineIndex": 4,
                    "Text": "5",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 0,
                    "LineIndex": 5,
                    "Text": "6",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 0,
                    "Text": "Occupied",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 1,
                    "Text": "Occupied",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 2,
                    "Text": "Occupied",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 5,
                    "Text": "Occupied",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 3,
                    "Text": "Occupied",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 1,
                    "LineIndex": 4,
                    "Text": "Occupied",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 2,
                    "LineIndex": 1,
                    "Text": "Jeff",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 2,
                    "LineIndex": 2,
                    "Text": "Michael",
                    "FeedId": 67581
                },
                {
                    "ColumnIndex": 2,
                    "LineIndex": 5,
                    "Text": "Roberto",
                    "FeedId": 67581
                }
            ],
            "FeedFieldList": [
                {
                    "Id": 731181,
                    "FeedId": 67581,
                    "Name": "A",
                    "Type": "Text"
                },
                {
                    "Id": 731182,
                    "FeedId": 67581,
                    "Name": "B",
                    "Type": "Text"
                },
                {
                    "Id": 731183,
                    "FeedId": 67581,
                    "Name": "C",
                    "Type": "Text"
                },
                {
                    "Id": 731184,
                    "FeedId": 67581,
                    "Name": "D",
                    "Type": "Text"
                },
                {
                    "Id": 731185,
                    "FeedId": 67581,
                    "Name": "E",
                    "Type": "Text"
                },
                {
                    "Id": 731186,
                    "FeedId": 67581,
                    "Name": "F",
                    "Type": "Text"
                },
                {
                    "Id": 731187,
                    "FeedId": 67581,
                    "Name": "G",
                    "Type": "Text"
                },
                {
                    "Id": 731188,
                    "FeedId": 67581,
                    "Name": "H",
                    "Type": "Text"
                },
                {
                    "Id": 731189,
                    "FeedId": 67581,
                    "Name": "I",
                    "Type": "Text"
                },
                {
                    "Id": 731190,
                    "FeedId": 67581,
                    "Name": "J",
                    "Type": "Text"
                },
                {
                    "Id": 731191,
                    "FeedId": 67581,
                    "Name": "K",
                    "Type": "Text"
                },
                {
                    "Id": 731192,
                    "FeedId": 67581,
                    "Name": "L",
                    "Type": "Text"
                },
                {
                    "Id": 731193,
                    "FeedId": 67581,
                    "Name": "M",
                    "Type": "Text"
                },
                {
                    "Id": 731194,
                    "FeedId": 67581,
                    "Name": "N",
                    "Type": "Text"
                },
                {
                    "Id": 731195,
                    "FeedId": 67581,
                    "Name": "O",
                    "Type": "Text"
                },
                {
                    "Id": 731196,
                    "FeedId": 67581,
                    "Name": "P",
                    "Type": "Text"
                }
            ]
        }
    ]
}

var BayStatus = "Available", BayNumber = 1;

/** Reservation bay datafeed - API callback */
app.use('/qlapi/reservationbay', function(req, res){
    console.log("Reservation Bay Feed")
    /** Set Feed call */

    if ( "baynumber" in req.query ){
        console.log( req.query.baynumber )
        BayNumber = parseInt( req.query.baynumber );
    }
    console.log(FeedReservation.FeedList[0] );

    if ( "baystatus" in req.query ){
        console.log(req.query.baystatus )
        FeedReservation.FeedList[0].FeedTextList[BayNumber+5].Text = req.query.baystatus;
    }
    

    sendFeedAPI(FeedReservation, res, req);
});

 function sendFeedAPI( feedset , res, req ){
    const options = {
        url: 'https://europe.navori.com/NavoriService/Api/SetFeeds',
        headers: {
            'Token': req.key
        },
        body : JSON.stringify(feedset)
    };
    //console.log( feedset.FeedList[0] ); 
    function callback(error, response, body) {
        //console.log( body )
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            console.log("SetFeeds API Returns")
            //console.log(options);

            res.send(info)
        }
    }
    request(options, callback);
 }

/* end mycode */




// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Sorry, can't find that" })
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}