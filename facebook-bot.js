var Botkit = require('botkit/lib/Botkit.js');
var mongodb = require('mongodb');
const request = require('request');

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

controller.hears(['yop'], 'message_received', function(bot, message) {
    bot.reply(message, `(1/15) Canadian society should work towards...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'title': `(1/15) Canadian society should work towards...`,
                'elements': [
                    {
                        'title': `Greater acceptance of people who are LGBTQ`,
                        'image_url': 'http://fiber-international.com/wp-content/uploads/2015/04/800x600-chicken.jpg',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'choose',
                                'payload': 'option-1'
                            }
                        ]
                    },
                    {
                        'title': `More recognition of the importance of traditional families where a man is married to a woman`,
                        'image_url': 'http://www.stevensonfitness.com/wp-content/uploads/2014/10/veggies.jpg',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'choose',
                                'payload': 'option-2'
                            }
                        ]
                    }
                ]
            }
    };

    bot.reply(message, {
        attachment: attachment,
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
        if (message.payload == 'yes(chcken)') {
            bot.reply(message, `Chicken you say ? Lets get started.`);
            askRelationship(bot, message)
        } else if (message.payload == 'I love it' || message.payload == 'I hate it' || message.payload == 'Guilty pleasure') {
            saveToMongoDb(message.user, message.payload, "relationship")
            askDetail(bot, message)
        } else if (message.payload == 'I make it myself' || message.payload == 'KFC is my go to' || message.payload == 'Any way is good' || message.payload == 'Fried food is gross' || message.payload == `I don't eat animals` || message.payload == `It's a secret` || message.payload == `reward` ||message.payload == `cures hangover`) {
            saveToMongoDb(message.user, message.payload, "detail")
            askMood(bot, message)
        } else if (message.payload == 'Chicken Parmesan' || message.payload == 'Double Down' || message.payload == 'Fried Drumsticks' || message.payload == 'Chicken Nuggets' || message.payload == 'Veggies') {
            saveToMongoDb(message.user, message.payload, "preference")
            askHungry(bot, message)
        } else if (message.payload == 'yes' || message.payload == 'no' || message.payload == 'no(survey)') {
            saveToMongoDb(message.user, message.payload, "hungry")
            sayThanks(bot, message)
        } else if (message.payload == 'yes(cndval)') {
            canadianValuesSurvey();
        } else if (message.payload == `get started canadian`) {
            question1();
        }
    });
});

canadianValuesSurvey = function(bot, message) {
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'button',
            'text': `The Angus Reid Institute's national poll conducted in partnership with the CBC identifies five Canadian mindsets when it comes to values.  Please choose one answer for each of the following questions on a broad range of topics in Canadian life.  Your answers will determine with which of the five mindsets you are most aligned.`,
            'buttons':[
                {
                'type':'postback',
                'title':`Get Started`,
                'payload':`get started canadian`
                },
                {
                'type':'postback',
                'title':`no thanks`,
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
    if (message.payload == 'I love it') {
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
        
    } else if (message.payload == 'I hate it') {
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