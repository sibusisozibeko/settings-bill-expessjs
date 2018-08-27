
let assert = require("assert");
let Setting = require("../settings-bill");

describe('The Setting function', function(){
  it('should return an amount of a call when the amount of a is entered', function(){
      var set = Setting();
      set.calculate("call");
      set.calculate("call");
      set.setCall(5.50);
      set.setCall(5.50);
      assert.equal(set.callCost(), 5.50);
    });

     it('should return an amount of an sms when the amount of a is entered', function(){
     var set = Setting();
     set.calculate('sms')
     set.calculate('sms')
     set.setSms(3.50)
     set.setSms(3.50)
     assert.equal(set.smsCost(), 3.50);
  });

it('should change a colour if warningLevel is more than zero ', function(){
var set = Setting();
set.calculate('warningLevel');
set.setWarning(50);
assert.equal(set.warning(), 50);
});

it('should change a colour if criticalevel is more than zero ', function(){
var set = Setting();
set.calculate('criticalevel');
set.setCritical(80);
assert.equal(set.critical(), 80);
});




});
