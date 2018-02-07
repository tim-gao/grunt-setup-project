define(['jquery'],function ($) {

    return {
      newClock: function(){
        var $clock = $('#clock');
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();

        var hour = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        var date = now.getDay();
        var dateMap = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        $clock.html(year + '年' + month + '月' + day + '日, ' + hour + ':' + minutes + ':' + seconds + ',' + dateMap[date]);
      }
    };
});;define(['jquery'],function ($) {
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