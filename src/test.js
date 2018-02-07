define(['jquery'],function ($) {
  return {
    plus: function (num1, num2) {
      if ( $.isNumber(num1) && $.isNumber(num2)) {
        return num1 + num2;
      } else {
        console.log('input error!');
      }
    },
    minus: function (num3, num4) {
      if ($.isNumber(num3) && $.isNumber(num4)) {
        return num3 - num4;
      } else {
        console.log('input error!');
      }
    },
    say: function () {
      console.log('hello, you are running the test.js');
    }
  };
});