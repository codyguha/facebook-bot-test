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
        } else if (key === "q01"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q01": value
                    }
            });    
        } else if (key === "q02"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q02": value
                    }
            });    
        } else if (key === "q03"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q03": value
                    }
            });    
        } else if (key === "q04"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q04": value
                    }
            });    
        } else if (key === "q05"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q05": value
                    }
            });    
        } else if (key === "q06"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q06": value
                    }
            });    
        } else if (key === "q07"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q07": value
                    }
            });    
        } else if (key === "q08"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q08": value
                    }
            });    
        } else if (key === "q09"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q09": value
                    }
            });    
        } else if (key === "q10"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q10": value
                    }
            });    
        } else if (key === "q11"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q11": value
                    }
            });    
        } else if (key === "q12"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q12": value
                    }
            });    
        } else if (key === "q13"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q13": value
                    }
            });    
        } else if (key === "q14"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q14": value
                    }
            });    
        } else if (key === "q15"){
            results.update({
                _id: `${id}`}, 
                    {   $set: {
                            "canadian_values_survey.q15": value
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
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q01_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q01_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q01_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q01_r02'
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
            canadianValuesSurvey(bot, message);
        } else if (message.payload == `get started canadian`) {
            cndValQ01(bot, message);
        } else if (message.payload == `q01_r01` || message.payload == `q01_r02`) {
            if (message.payload == `q01_r01`){
                saveToMongoDb(message.user, 1, "q01")
            } else {
                saveToMongoDb(message.user, 2, "q01")
            }
            cndValQ02(bot, message);
        } else if (message.payload == `q02_r01` || message.payload == `q02_r02`) {
            if (message.payload == `q02_r01`){
                saveToMongoDb(message.user, 1, "q02")
            } else {
                saveToMongoDb(message.user, 2, "q02")
            }
            cndValQ03(bot, message);
        } else if (message.payload == `q03_r01` || message.payload == `q03_r02`) {
            if (message.payload == `q03_r01`){
                saveToMongoDb(message.user, 1, "q03")
            } else {
                saveToMongoDb(message.user, 2, "q03")
            }
            cndValQ04(bot, message);
        } else if (message.payload == `q04_r01` || message.payload == `q04_r02`) {
            if (message.payload == `q04_r01`){
                saveToMongoDb(message.user, 1, "q04")
            } else {
                saveToMongoDb(message.user, 2, "q04")
            }
            cndValQ05(bot, message);
        } else if (message.payload == `q05_r01` || message.payload == `q05_r02`) {
            if (message.payload == `q05_r01`){
                saveToMongoDb(message.user, 1, "q05")
            } else {
                saveToMongoDb(message.user, 2, "q05")
            }
            cndValQ06(bot, message);
        } else if (message.payload == `q06_r01` || message.payload == `q06_r02`) {
            if (message.payload == `q06_r01`){
                saveToMongoDb(message.user, 1, "q06")
            } else {
                saveToMongoDb(message.user, 2, "q06")
            }
            cndValQ07(bot, message);
        } else if (message.payload == `q07_r01` || message.payload == `q07_r02`) {
            if (message.payload == `q07_r01`){
                saveToMongoDb(message.user, 1, "q07")
            } else {
                saveToMongoDb(message.user, 2, "q07")
            }
            cndValQ08(bot, message);
        } else if (message.payload == `q08_r01` || message.payload == `q08_r02`) {
            if (message.payload == `q08_r01`){
                saveToMongoDb(message.user, 1, "q08")
            } else {
                saveToMongoDb(message.user, 2, "q08")
            }
            cndValQ09(bot, message);
        } else if (message.payload == `q09_r01` || message.payload == `q09_r02`) {
            if (message.payload == `q09_r01`){
                saveToMongoDb(message.user, 1, "q09")
            } else {
                saveToMongoDb(message.user, 2, "q09")
            }
            cndValQ010(bot, message);
        } else if (message.payload == `q10_r01` || message.payload == `q10_r02`) {
            if (message.payload == `q10_r01`){
                saveToMongoDb(message.user, 1, "q10")
            } else {
                saveToMongoDb(message.user, 2, "q10")
            }
            cndValQ011(bot, message);
        } else if (message.payload == `q11_r01` || message.payload == `q11_r02`) {
            if (message.payload == `q11_r01`){
                saveToMongoDb(message.user, 1, "q11")
            } else {
                saveToMongoDb(message.user, 2, "q11")
            }
            cndValQ012(bot, message);
        } else if (message.payload == `q12_r01` || message.payload == `q12_r02`) {
            if (message.payload == `q12_r01`){
                saveToMongoDb(message.user, 1, "q12")
            } else {
                saveToMongoDb(message.user, 2, "q12")
            }
            cndValQ013(bot, message);
        } else if (message.payload == `q13_r01` || message.payload == `q13_r02`) {
            if (message.payload == `q13_r01`){
                saveToMongoDb(message.user, 1, "q13")
            } else {
                saveToMongoDb(message.user, 2, "q13")
            }
            cndValQ014(bot, message);
        } else if (message.payload == `q14_r01` || message.payload == `q14_r02`) {
            if (message.payload == `q14_r01`){
                saveToMongoDb(message.user, 1, "q14")
            } else {
                saveToMongoDb(message.user, 2, "q14")
            }
            cndValQ015(bot, message);
        } else if (message.payload == `q15_r01` || message.payload == `q15_r02`) {
            if (message.payload == `q15_r01`){
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

// CANADIAN VALUES
cndValQ01 = function(bot, message) {
    bot.reply(message, `(1/15) Canadian society should work towards...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q01_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q01_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q01_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q01_r02'
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

cndValQ02 = function(bot, message) {
    bot.reply(message, `(2/15) Canada's immigration and refugee policies should...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q02_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q02_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q02_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q02_r02'
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

cndValQ03 = function(bot, message) {
    bot.reply(message, `(3/15) In Canada, we should...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q03_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q03_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q03_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q03_r02'
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

cndValQ04 = function(bot, message) {
    bot.reply(message, `(4/15) In the Canadian workplace:`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q04_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q04_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q04_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q04_r02'
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

cndValQ05 = function(bot, message) {
    bot.reply(message, `(5/15) Regarding health care, we should...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q05_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q05_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q05_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q05_r02'
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
cndValQ06 = function(bot, message) {
    bot.reply(message, `(6/15) Canada should...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q06_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q06_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q06_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q06_r02'
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
cndValQ07 = function(bot, message) {
    bot.reply(message, `(7/15) There should be...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q07_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q07_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q07_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q07_r02'
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
cndValQ08 = function(bot, message) {
    bot.reply(message, `(8/15) Overall, Canada's policies should...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q08_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q08_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q08_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q08_r02'
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
cndValQ09 = function(bot, message) {
    bot.reply(message, `(9/15) Overall, it would be better to...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q09_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q09_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q09_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q09_r02'
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
cndValQ010 = function(bot, message) {
    bot.reply(message, `(10/15) On childcare, would you say...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q10_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q10_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q10_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q10_r02'
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
cndValQ011 = function(bot, message) {
    bot.reply(message, `(11/15) When it comes to doctor-assisted dying...`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q11_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q11_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q11_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q11_r02'
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
cndValQ012 = function(bot, message) {
    bot.reply(message, `(12/15) Do you think of Canada's oil industry in Alberta and other parts of the country as:`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q12_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q12_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q12_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q12_r02'
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
cndValQ013 = function(bot, message) {
    bot.reply(message, `(13/15) Please indicate which one you think is more important for a child to have:`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q13_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q13_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q13_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q13_r02'
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
cndValQ014 = function(bot, message) {
    bot.reply(message, `(14/15) In terms of individual success, would you say:`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q14_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q14_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q14_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q14_r02'
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
cndValQ015 = function(bot, message) {
    bot.reply(message, `(15/15) In your view:`);
    var attachment = {
        'type':'template',
        'payload': {
                'template_type': 'generic',
                'elements': [
                    {
                        'title': `Option 1`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q15_r01.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q15_r01'
                            }
                        ]
                    },
                    {
                        'title': `Option 2`,
                        'image_url': 'https://raw.githubusercontent.com/codyguha/survey-images/master/cndval-imgs/q15_r02.png',
                        'buttons': [
                            {
                                'type': 'postback',
                                'title': 'Select',
                                'payload': 'q15_r02'
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
    bot.reply(message, `You are a Cautious Skeptic!`);
}
cndValEndPR = function (bot, message) {
    bot.reply(message, `You are a Permissive Reformer!`);
}
cndValEndFBT = function (bot, message) {
    bot.reply(message, `You are a Faith Based Traditionalist!`);
}
cndValEndFEE = function (bot, message) {
    bot.reply(message, `You are a Free Enterprise Enthusiast!`);
}
cndValEndPSP = function (bot, message) {
    bot.reply(message, `You are a Public Sector Proponent!`);
}
