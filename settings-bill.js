// get a reference to the sms or call radio buttons
module.exports = function Setting() {


  var callamount = 0;
  var smsamount = 0;
  var totalamount = 0;

  let actionList = [];


  var callcost = 0.00;
  var smscost = 0.00;
  var warningLevel = 0.00;
  var criticalevel = 0.00;
  let stopcolor = '';

  function BillSettings(settingsItemType) {

    if (totalamount >= criticalevel) {
      return stopcolor;
    }
    // get the value entered in the billType textfie// update the correct total
    if (settingsItemType === "call") {
      callamount += callcost;
      totalamount += callcost;

    } else if (settingsItemType === "sms") {
      smsamount += smscost;
      totalamount += smscost;
    }


    actionList.push({
               type: settingsItemType,
               cost: totalamount,
               timestamp: new Date()
           });
       }

       function actions(){
           return actionList;
       }
      

       function actionsFor(type){
           const filteredActions = [];

           // loop through all the entries in the action list
           for (let index = 0; index < actionList.length; index++) {
               const action = actionList[index];
               // check this is the type we are doing the total for
               if (action.type === type) {
                   // add the action to the list
                   filteredActions.push(action);
               }
           }

           return filteredActions;

           // return actionList.filter((action) => action.type === type);
   }

  


  function callings() {
    return callamount.toFixed(2);
  }

  function smsings() {
    return smsamount.toFixed(2);
  }

  function totalcallsms() {
    return totalamount.toFixed(2);
  }


  function totaling() {
    return callamount + smsamount;
  }


  function callupdate(value) {
    if (value != "") {
      callcost = parseFloat(value);

    }
  }

  function getCostCall() {

    return callcost.toFixed(2);
  }

  function getupdate() {
    return callupdate.toFixed(2);
  }


  function smsupdate(value) {
    if (value != "") {
      return smscost = parseFloat(value);
    }
  }

  function getsmscost() {
    return smscost.toFixed(2);
  }

  function getcost() {
    return smsupdate.toFixed(2);
  }

  function warnings(value) {
    if (value != "") {
      return warningLevel = parseFloat(value);
    }
  }

  function showwarning() {
    return warningLevel.toFixed(2);
  }

  function warning() {
    return warningLevel.toFixed(2);
  }

  function critics(value) {
    if (value != "") {
      criticalevel = parseFloat(value);
    }
  }

  function showcritical() {
    return criticalevel.toFixed(2);
  }

  function critic() {
    return criticalevel.toFixed(2);
  }

  return {
    // get totals
    acton: actions,
    actfor: actionsFor,

    callTotal: callings,
    smsTotal: smsings,
    total: totaling,
    //bothtotals: totalcallsms,

    // get costs
    callCost: getCostCall,
    smsCost: getsmscost,
    warning: showwarning,
    critical: showcritical,
    costs : getcost,
    // set costs
    setCall: callupdate,
    setSms: smsupdate,
    setWarning: warnings,
    setCritical: critics,
    // calculate bill
    calculate: BillSettings
  }
}
