const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Setting = require('./settings-bill');
const moment = require('moment');

const app = express();
const setting = Setting();

let PORT = process.env.PORT || 3004;
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    "timestamp": function(){
      return moment(this.timestamp).fromNow();
    }
  }
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.get('/', function(req, res) {

  var totals = {
    callTotal: setting.callTotal(),
    smsTotal: setting.smsTotal(),
    total: setting.total()
   
  }

  var settings = {
    callCost: setting.callCost(),
    smsCost: setting.smsCost(),
    warningLevel: setting.warning(),
    criticalLevel: setting.critical()

  }

  let colour;

    if (setting.total() >= setting.warning()) {
       colour ='warning';
    } 
    if (setting.total() >= setting.critical()) {

       colour = 'danger';
    }

  

  console.log(setting.warning());
  //console.log('settings', settings);
  res.render("home", {
    totals,
    settings,
    colour
  })
});

app.post('/settings', function(req, res) {
  // console.log('body', req.body);

  let smsCost = req.body.smsCost

  setting.setCall(req.body.callCost);
  setting.setSms(req.body.smsCost);
  setting.setWarning(req.body.warningLevel);
  setting.setCritical(req.body.criticalLevel);




  res.redirect('/');

});

app.post('/action', function(req, res) {
  // console.log(req.body.actionType);
  setting.calculate(req.body.actionType);
  res.redirect('/');

});

app.get('/actions', function(req, res) {
  res.render('actions', {
    actions: setting.acton()
  });
});

app.get('/actions/:actionType', function(req, res) {
  const actionType = req.params.actionType;
  res.render('actions', {
    actions: setting.actfor(actionType)
  });
});

app.listen(PORT, function(err) {
  console.log("APP starting on port",PORT);
});
