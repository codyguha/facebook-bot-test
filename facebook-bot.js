var Botkit = require('botkit/lib/Botkit.js');

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

controller.hears(['hello', 'hi'], 'message_received', function(bot, message) {
    bot.reply(message, 'Hello user !');
});

controller.hears(['how are you?'], 'message_received', function(bot, message) {
    bot.reply(message, "I'm great thanks for asking!");
});

controller.hears(['what can I do here?'], 'message_received', function(bot, message) {
    bot.reply(message, "You can complete surveys with me to help me complete my research!");
});

controller.hears(['Chicken survey'], 'message_received', function(bot, message) {
   askRelationship(bot, message)
});

controller.hears(['menu'], 'message_received', function(bot, message) {
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'button',
            'text': 'Please choose a survey',
            'buttons':[
                {
                'type':'postback',
                'title':`Chicken survey`,
                'payload':`yes(chicken)`
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

});

controller.hears(['help'], 'message_received', function(bot, message) {
    bot.reply(message, "type 'menu' to see a list of surveys to complete. or just say 'hi'.");
});

controller.on([],'facebook_postback', function(bot, message) {
    console.log("HIT!")
    console.log(message.postback)

    // if (message.payload == 'yes(chicken)') {
    //     bot.reply(message, `Excellent! Lets get started.`);
    //     // getProfile(message.user, function(err, profile) {
    //     //     survey_result.user = `${profile.first_name} ${profile.last_name}`
    //     //     survey_result.gender = `${profile.gender}`
    //     //     survey_result.locale = `${profile.locale}`
    //     //     survey_result.timezone = `${profile.timezone}`
    //     // });
    //     askRelationship(bot, message)
    // } else if (message.payload == 'I love it' || message.payload == 'I hate it' || message.payload == 'Guilty pleasure') {
    //     // if (survey_result.relationship == null) {
    //     //     survey_result.relationship = message.payload
    //         askDetail(bot, message)
    //     // } else {
    //     //     bot.reply(message, answered_true_msg);     
    //     // }
    // } else if (message.payload == 'I make it myself' || message.payload == 'KFC is my go to' || message.payload == 'Any way is good' || message.payload == 'Fried food is gross' || message.payload == `I don't eat animals` || message.payload == `It's a secret` || message.payload == `reward` ||message.payload == `cures hangover`) {
    //     // if (survey_result.detail == null) {
    //     //     survey_result.detail = message.payload
    //         askMood(bot, message)
    //     // } else {
    //     //     bot.reply(message, answered_true_msg);     
    //     // }
    // } else if (message.payload == ':)' || message.payload == ':(' || message.payload == '-_-') {
    //         // if (survey_result.mood == null) {
    //         //     survey_result.mood = message.payload
    //             askPreference(bot, message)
    //         // } else {
    //         //     bot.reply(message, answered_true_msg);     
    //         // }
        
    // } else if (message.payload == 'Chicken Parmesan' || message.payload == 'Double Down' || message.payload == 'Fried Drumsticks' || message.payload == 'Chicken Nuggets' || message.payload == 'Veggies') {
        
    //         // if (survey_result.preference == null) {
    //         //     survey_result.preference = message.payload
    //             askHungry(bot, message)
    //         // } else {
    //         //     bot.reply(message, answered_true_msg);     
    //         // }

    // } else if (message.payload == 'yes' || message.payload == 'no' || message.payload == 'no(survey)') {
        
    //         // if (survey_result.hungry == null) {
    //         //     survey_result.hungry = message.payload
    //             sayThanks(bot, message)
    //         // } else if (survey_result == {}){
    //         // bot.reply(message, answered_true_msg); 
    //         // }
    // }
});

// QUESTIONS
askSurvey = function(bot, message) {
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'button',
            'text': 'Do you have a moment to answer some questions about fried chicken ?',
            'buttons':[
                {
                'type':'postback',
                'title':`Yes`,
                'payload':`yes(start)`
                },
                {
                'type':'postback',
                'title':`No`,
                'payload':`no(survey)`
                }
            ]
        }
    };

    bot.reply(message, {
        attachment: attachment,
    });
}

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
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'button',
            'text': 'What is your current mood ?',
            'buttons':[
                {
                'type':'postback',
                'title':`:)`,
                'payload':`:)`
                },
                {
                'type':'postback',
                'title':`:(`,
                'payload':`:(`
                },
                {
                'type':'postback',
                'title':`-_-`,
                'payload':`-_-`
                }
            ]
        }
    };

    bot.reply(message, {
        attachment: attachment,
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
                                'title': 'Choose',
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
                                'title': 'Choose',
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
                                'title': 'Choose',
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
                                'title': 'Choose',
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
                                'title': 'Choose',
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