var Botkit = require('botkit/lib/Botkit.js');
var mongodb = require('mongodb');
const request = require('request');

const SURVEY = [
                {
                    text: "(1/15) Canadian society should work towards...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q01_r01.jpg",
                    r_01: "Greater acceptance of people who are LGBTQ (lesbian, gay, bi-sexual, transgender, queer)",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q01_r02.jpeg",
                    r_02: "More recognition of the importance of traditional families where a man is married to a woman",
                    pl_code_01: "q01_r01",
                    pl_code_02: "q01_r02"
                },{
                    text: "(2/15) Canada's immigration and refugee policies should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q02_r01.jpg",
                    r_01: "Give priority to people in crisis abroad",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q02_r02.jpg",
                    r_02: "Give priority to Canada's own economic and workforce needs",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(3/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(4/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(5/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(6/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(7/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(8/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(9/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(10/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(11/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(12/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(13/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(14/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                },{
                    text: "(15/15) In Canada, we should...",
                    img_01: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r01.jpg",
                    r_01: "Keep God and religion completely out of public life",
                    img_02: "https://raw.githubusercontent.com/codyguha/survey-images/master/cndvaluesimgs/q03_r02.jpeg",
                    r_02: "Publicly celebrate the role of faith in our collective lives",
                    pl_code_01: "q02_r01",
                    pl_code_02: "q02_r02"
                }

            ]

var survey_step = 0

var controller = Botkit.facebookbot({
    debug: true,
    access_token: process.env.page_token,
    verify_token: process.env.verify_token,
});

var bot = controller.spawn({
});

controller.setupWebserver(process.env.PORT || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('ONLINE!');
    });
});

saveToMongoDb = function (id, value, key) {
    mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
        if (err) throw err;
        var results = db.collection('results');
        if (key === "relationship"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "chicken_survey.relationship": value
                    }
            });
        } else if (key === "detail"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "chicken_survey.detail": value
                    }
            });    
        } else if (key === "mood"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "chicken_survey.mood": value
                    }
            });    
        } else if (key === "preference"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "chicken_survey.preference": value
                    }
            });    
        } else if (key === "hungry"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "chicken_survey.hungry": value
                    }
            });    
        } else {
            var canadian_values_survey = {};
            canadian_values_survey[key] = value
            results.update({_id: `${id}`}, {   $set: "canadian_values_survey." + canadian_values_survey   });    
        }
    })
}

saveUserToMongoDb = function (id, first_name, last_name, gender, locale, timezone) {
    mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
        if (err) throw err;
        var results = db.collection('results');
        results.insert({
            _id: id,
            user:{
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                locale: locale,
                timezone: timezone
            },
        })
    })
}

/// GET USER INFO !!!
getProfile = function (id, cb) {

    if (!cb) cb = Function.prototype

    request({
      method: 'GET',
      uri: `https://graph.facebook.com/v2.6/${id}`,
      qs: {
        fields: 'first_name,last_name,profile_pic,gender,locale,timezone',
        access_token: process.env.page_token
      },
      json: true
    }, function(err, res, body) {
      if (err) return cb(err)
      if (body.error) return cb(body.error)

      cb(null, body)
    })
}

controller.hears(['hi', 'Hi'], 'message_received', function(bot, message) {
    getProfile(message.user, function(err, profile) {
        var attachment = {
            'type':'template',
            'payload':{
                'template_type':'button',
                'text': `Hello ${profile.first_name}, Please choose a survey to begin.`,
                'buttons':[
                    {
                    'type':'postback',
                    'title':`Chicken survey`,
                    'payload':`yes(chcken)`
                    },
                    {
                    'type':'postback',
                    'title':`Canadian Values Index`,
                    'payload':`yes(cndval)`
                    },
                    {
                    'type':'postback',
                    'title':`No thanks`,
                    'payload':`no(survey)`
                    },
                ]
            }
        };
        bot.reply(message, {
            attachment: attachment,
        });
        
        saveUserToMongoDb(`${message.user}`,`${profile.first_name}`, `${profile.last_name}`, `${profile.gender}`, `${profile.locale}`, `${profile.timezone}`)
    
    });
});

controller.hears(['what can I do here?'], 'message_received', function(bot, message) {
    bot.reply(message, "You can complete surveys with me to help me complete my research!");
});

controller.hears(['help'], 'message_received', function(bot, message) {
    bot.reply(message, "type 'hi' to see a list of surveys to complete.");
});

controller.on('message_received', function(bot, message) {
    console.log(message)
});

// controller.on('facebook_optin', function(bot, message) {
//     bot.reply(message, "YOU CLICKED PLUGIN !!!");
// });

controller.on('facebook_postback', function(bot, message) {
    getProfile(message.user, function(err, profile) {
        if (message.payload === 'yes(chcken)') {
            bot.reply(message, `Chicken you say ? Lets get started.`);
            askRelationship(bot, message)
        } else if (message.payload === 'I love it' || message.payload === 'I hate it' || message.payload === 'Guilty pleasure') {
            saveToMongoDb(message.user, message.payload, "relationship")
            askDetail(bot, message)
        } else if (message.payload === 'I make it myself' || message.payload === 'KFC is my go to' || message.payload === 'Any way is good' || message.payload === 'Fried food is gross' || message.payload === `I don't eat animals` || message.payload === `It's a secret` || message.payload === `reward` ||message.payload === `cures hangover`) {
            saveToMongoDb(message.user, message.payload, "detail")
            askMood(bot, message)
        } else if (message.payload === 'Chicken Parmesan' || message.payload === 'Double Down' || message.payload === 'Fried Drumsticks' || message.payload === 'Chicken Nuggets' || message.payload === 'Veggies') {
            saveToMongoDb(message.user, message.payload, "preference")
            askHungry(bot, message)
        } else if (message.payload === 'yes' || message.payload === 'no' || message.payload === 'no(survey)') {
            saveToMongoDb(message.user, message.payload, "hungry")
            sayThanks(bot, message)
        } else if (message.payload === 'yes(cndval)') {
            canadianValuesSurvey(bot, message);
        } else if (message.payload === `get started canadian`) {
            startSurvey(bot, message)
            // cndValQ01(bot, message);
        } else if (message.payload === `q01_r01` || message.payload === `q01_r02`) {
            if (message.payload === `q01_r01`){
                saveToMongoDb(message.user, 1, "q01")
            } else {
                saveToMongoDb(message.user, 2, "q01")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q02_r01` || message.payload === `q02_r02`) {
            if (message.payload === `q02_r01`){
                saveToMongoDb(message.user, 1, "q02")
            } else {
                saveToMongoDb(message.user, 2, "q02")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q03_r01` || message.payload === `q03_r02`) {
            if (message.payload === `q03_r01`){
                saveToMongoDb(message.user, 1, "q03")
            } else {
                saveToMongoDb(message.user, 2, "q03")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q04_r01` || message.payload === `q04_r02`) {
            if (message.payload === `q04_r01`){
                saveToMongoDb(message.user, 1, "q04")
            } else {
                saveToMongoDb(message.user, 2, "q04")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q05_r01` || message.payload === `q05_r02`) {
            if (message.payload === `q05_r01`){
                saveToMongoDb(message.user, 1, "q05")
            } else {
                saveToMongoDb(message.user, 2, "q05")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q06_r01` || message.payload === `q06_r02`) {
            if (message.payload === `q06_r01`){
                saveToMongoDb(message.user, 1, "q06")
            } else {
                saveToMongoDb(message.user, 2, "q06")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q07_r01` || message.payload === `q07_r02`) {
            if (message.payload === `q07_r01`){
                saveToMongoDb(message.user, 1, "q07")
            } else {
                saveToMongoDb(message.user, 2, "q07")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q08_r01` || message.payload === `q08_r02`) {
            if (message.payload === `q08_r01`){
                saveToMongoDb(message.user, 1, "q08")
            } else {
                saveToMongoDb(message.user, 2, "q08")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q09_r01` || message.payload === `q09_r02`) {
            if (message.payload === `q09_r01`){
                saveToMongoDb(message.user, 1, "q09")
            } else {
                saveToMongoDb(message.user, 2, "q09")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q10_r01` || message.payload === `q10_r02`) {
            if (message.payload === `q10_r01`){
                saveToMongoDb(message.user, 1, "q10")
            } else {
                saveToMongoDb(message.user, 2, "q10")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q11_r01` || message.payload === `q11_r02`) {
            if (message.payload === `q11_r01`){
                saveToMongoDb(message.user, 1, "q11")
            } else {
                saveToMongoDb(message.user, 2, "q11")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q12_r01` || message.payload === `q12_r02`) {
            if (message.payload === `q12_r01`){
                saveToMongoDb(message.user, 1, "q12")
            } else {
                saveToMongoDb(message.user, 2, "q12")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q13_r01` || message.payload === `q13_r02`) {
            if (message.payload === `q13_r01`){
                saveToMongoDb(message.user, 1, "q13")
            } else {
                saveToMongoDb(message.user, 2, "q13")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q14_r01` || message.payload === `q14_r02`) {
            if (message.payload === `q14_r01`){
                saveToMongoDb(message.user, 1, "q14")
            } else {
                saveToMongoDb(message.user, 2, "q14")
            }
            nextQuestion(bot, message);
        } else if (message.payload === `q15_r01` || message.payload === `q15_r02`) {
            if (message.payload === `q15_r01`){
                saveToMongoDb(message.user, 1, "q15")
            } else {
                saveToMongoDb(message.user, 2, "q15")
            }
            cndValEnd(bot, message);
        }
    });
});

canadianValuesSurvey = function(bot, message) {
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'button',
            'text': `The Angus Reid Institute's national poll conducted in partnership with the CBC identifies five Canadian mindsets when it comes to values.  Your answers will determine with which of the five mindsets you are most aligned.`,
            'buttons':[
                {
                'type':'postback',
                'title':`Get Started`,
                'payload':`get started canadian`
                },
                {
                'type':'postback',
                'title':`No Thanks`,
                'payload':`no`
                }
            ]
        }
    };

    bot.reply(message, {
        attachment: attachment,
    });
}

//QUESTIONS

askRelationship = function(bot, message) {
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'button',
            'text':  'What would you say your relationship is with fried chicken ?',
            'buttons':[
                {
                'type':'postback',
                'title':'I love it',
                'payload':'I love it'
                },
                {
                'type':'postback',
                'title':'I hate it',
                'payload':'I hate it'
                },
                {
                'type':'postback',
                'title':'Guilty pleasure',
                'payload':'Guilty pleasure'
                }
            ]
        }
    };

    bot.reply(message, {
        attachment: attachment,
    });
}

askDetail = function(bot, message) {
    if (message.payload === 'I love it') {
        var attachment = {
            'type':'template',
            'payload':{
                'template_type':'button',
                'text': 'What is your favourite way to eat fried chicken ?',
                'buttons':[
                    {
                    'type':'postback',
                    'title':'I make it myself',
                    'payload':'I make it myself'
                    },
                    {
                    'type':'postback',
                    'title':'KFC is my go to',
                    'payload':'KFC is my go to'
                    },
                    {
                    'type':'postback',
                    'title':'Any way is good',
                    'payload':'Any way is good'
                    }
                ]
            }
        };

        bot.reply(message, {
            attachment: attachment,
        });
        
    } else if (message.payload === 'I hate it') {
        var attachment = {
            'type':'template',
            'payload':{
                'template_type':'button',
                'text': 'Not a fan ? tell me more.',
                'buttons':[
                    {
                    'type':'postback',
                    'title':'Fried food is gross',
                    'payload':'Fried food is gross'
                    },
                    {
                    'type':'postback',
                    'title':`I don't eat animals`,
                    'payload':`I don't eat animals`
                    },
                    {
                    'type':'postback',
                    'title':`It's a secret`,
                    'payload':`It's a secret`
                    }
                ]
            }
        };

        bot.reply(message, {
            attachment: attachment,
        });

    } else if (message.payload == 'Guilty pleasure') {
        var attachment = {
            'type':'template',
            'payload':{
                'template_type':'button',
                'text':  'Guilty pleasure you say, tell me more.',
                'buttons':[
                    {
                    'type':'postback',
                    'title':'When Hungover',
                    'payload':'cures hangover'
                    },
                    {
                    'type':'postback',
                    'title':'Reward for myself',
                    'payload':'reward'
                    },
                    {
                    'type':'postback',
                    'title':`It's a secret`,
                    'payload':`It's a secret`
                    }
                ]
            }
        };

        bot.reply(message, {
            attachment: attachment,
        });

    } else  {
        bot.reply(message, 'oops')
    }

}

askMood = function(bot, message) {
     bot.startConversation(message, function(err, convo) {
        convo.ask('What is your current mood ? (please respond with emoticon)', function(response, convo) {
            convo.next();
        });
        convo.on('end', function(convo) {
            if (convo.status == 'completed') {
                bot.reply(message, "thanks got it !");
                saveToMongoDb(message.user, message.text, "mood")
                setTimeout(function(){
                    askPreference(bot, message);
                }, 1000);          
            }
        });
     });
}

askPreference = function(bot, message) {
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': 'Chicken Parmesan',
                        'image_url': 'http://fiber-international.com/wp-content/uploads/2015/04/800x600-chicken.jpg',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Chicken Parmesan',
                                'payload': 'Chicken Parmesan'
                            }
                        ]
                    },
                    {
                        'title': 'Double Down',
                        'image_url': 'http://assets.bwbx.io/images/ieMg5BCeWkWU/v1/-1x-1.jpg',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Double Down',
                                'payload': 'Double Down'
                            }
                        ]
                    },
                    {
                        'title': 'Fried Drumsticks',
                        'image_url': 'https://i.ytimg.com/vi/G8hbFO-r2nQ/maxresdefault.jpg',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Fried Drumsticks',
                                'payload': 'Fried Drumsticks'
                            }
                        ]
                    },
                    {
                        'title': 'Chicken Nuggets',
                        'image_url': 'http://www.urbanmommies.com/wp-content/uploads/McDonalds-Chicken-Nuggets.jpg',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Chicken Nuggets',
                                'payload': 'Chicken Nuggets'
                            }
                        ]
                    },
                    {
                        'title': 'Veggies',
                        'image_url': 'http://www.stevensonfitness.com/wp-content/uploads/2014/10/veggies.jpg',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Veggies',
                                'payload': 'Veggies'
                            }
                        ]
                    }
                ]
            }
    };

    bot.reply(message, {
        attachment: attachment,
    });

    bot.reply(message, 'Which of these meals your you like to be eating right now ?');
}

askHungry = function(bot, message) {
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'button',
            'text': 'Have I made you hungry ?',
            'buttons':[
                {
                'type':'postback',
                'title':`yes`,
                'payload':`yes`
                },
                {
                'type':'postback',
                'title':`no`,
                'payload':`no`
                }
            ]
        }
    };

    bot.reply(message, {
        attachment: attachment,
    });

}
// OTHER RESPONSES
sayThanks = function(bot, message) {
  bot.reply(message, 'OK! thanks for your time');
}

// CANADIAN VALUES
startSurvey = function(bot, message) {
    survey_step = 0
    var first_question = SURVEY[survey_step];
    survey_step++
    cndValQuestion(bot, message, first_question)
}

nextQuestion = function(bot, message) {
    if (survey_step <= 14 ) {
        cndValQuestion(bot, message, SURVEY[survey_step])
        survey_step++
    } else {
        cndValEnd(bot, message)
    }
}

cndValQuestion = function(bot, message, question) {
    bot.reply(message, question.text);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': question.img_01,
                        'subtitle': question.r_01,
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': question.pl_code_01
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': question.img_02,
                        'subtitle': question.r_02,
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': question.pl_code_01
                            }
                        ]
                    }
                ]
            }
    };
    bot.reply(message, {
        attachment: attachment,
    });
}

cndValEnd = function (bot, message) {
    mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
        if (err) throw err;
    var results = db.collection('results');
    results.find({
          _id: message.user
        }).toArray(function(err, found) {
          var userresults = found[0].canadian_values_survey;
          console.log(userresults)
            var segCS = Math.exp(
            1.324777341 * userresults.q01 +
            -0.439317293 * userresults.q02 +
            -1.141955791 * userresults.q03 +
            0.946527238 * userresults.q04 +
            1.065909437 * userresults.q05 +
            1.856962384 * userresults.q06 +
            0.313054006 * userresults.q07 +
            0.335923336 * userresults.q08 +
            -0.822735827 * userresults.q09 +
            1.418703947 * userresults.q10 +
            -0.705176968 * userresults.q11 +
            -1.339674474 * userresults.q12 +
            0.990574065 * userresults.q13 +
            3.17706193 * userresults.q14 +
            -3.538568365 * userresults.q15 +
            -3.687443765);

          var segPR = Math.exp(
            0.360924702 * userresults.q01 +
            -4.778865322 * userresults.q02 +
            -0.096688666 * userresults.q03 +
            1.556509672 * userresults.q04 +
            2.000184421 * userresults.q05 +
            0.052231303 * userresults.q06 +
            -1.892051762 * userresults.q07 +
            0.873597825 * userresults.q08 +
            -1.024131769 * userresults.q09 +
            1.058972973 * userresults.q10 +
            1.387828058 * userresults.q11 +
            -1.645821049 * userresults.q12 +
            4.147904236 * userresults.q13 +
            2.471886731 * userresults.q14 +
            -1.551020565 * userresults.q15 +
            -3.344123223);

          var segFBT = Math.exp(
            1.937264942 * userresults.q01 +
            -2.782925459 * userresults.q02 +
            2.014814213 * userresults.q03 +
            1.738605214 * userresults.q04 +
            0.59702853 * userresults.q05 +
            0.847449727 * userresults.q06 +
            -0.706492853 * userresults.q07 +
            1.961100828 * userresults.q08 +
            -1.677824254 * userresults.q09 +
            1.768624728 * userresults.q10 +
            3.445928658 * userresults.q11 +
            -0.138628647 * userresults.q12 +
            0.746561782 * userresults.q13 +
            1.871286665 * userresults.q14 +
            -2.419686983 * userresults.q15 +
            -11.1287024);

          var segFEE = Math.exp(
            1.029244103 * userresults.q01 +
            -1.496981598 * userresults.q02 +
            -1.196622034 * userresults.q03 +
            2.94630191 * userresults.q04 +
            -0.551662564 * userresults.q05 +
            1.775545107 * userresults.q06 +
            1.01564184 * userresults.q07 +
            1.850206979 * userresults.q08 +
            -2.918294699 * userresults.q09 +
            2.858187827 * userresults.q10 +
            -0.233789783 * userresults.q11 +
            0.454961524 * userresults.q12 +
            2.491671372 * userresults.q13 +
            0.997044403 * userresults.q14 +
            -1.273910456 * userresults.q15 +
            -10.76338147);
        switch (Math.max(segCS, segPR, segFBT, segFEE, 1)) {
            case segCS:
                cndValEndCS(bot, message)
              break;
            case segPR:
                cndValEndPR(bot, message)
              break;
            case segFBT:
                cndValEndFBT(bot, message)
              break;
            case segFEE:
                cndValEndFEE(bot, message)
              break;
            case 1:
                cndValEndPSP(bot, message)
              break;
            default:
              break;
          }
      });
    });
}

cndValEndCS = function (bot, message) {
    bot.reply(message, `read more at http://angusreid.org/cautious-skeptics`);
    bot.reply(message, `That's it ! You are a Cautious Skeptic!`);
}
cndValEndPR = function (bot, message) {
    bot.reply(message, `read more at http://angusreid.org/permissive-reformers/`);
    bot.reply(message, `That's it ! You are a Permissive Reformer!`);
}
cndValEndFBT = function (bot, message) {
    bot.reply(message, `read more at http://angusreid.org/faith-based-traditionalists`);
    bot.reply(message, `That's it ! You are a Faith Based Traditionalist!`);
}
cndValEndFEE = function (bot, message) {
    bot.reply(message, `read more at http://angusreid.org/free-enterprise-enthusiasts`);
    bot.reply(message, `That's it ! You are a Free Enterprise Enthusiast!`);
}
cndValEndPSP = function (bot, message) {
    bot.reply(message, `read more at http://angusreid.org/public-sector-proponents`);
    bot.reply(message, `That's it ! You are a Public Sector Proponent!`);
}