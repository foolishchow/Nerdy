module.exports = function() {
    Date.prototype.Format = function(fmt) {
        fmt = fmt ? fmt : "yyyy-MM-dd HH:mm:ss"; //HH:mm:ss
        var o = {
            "M+": this.getMonth() + 1,
            /*月份*/
            "d+": this.getDate(),
            /*日*/
            "H+": this.getHours(),
            /*小时*/
            "h+": this.getHours() % 12,
            /*小时*/
            "m+": this.getMinutes(),
            /*分*/
            "s+": this.getSeconds(),
            /*秒*/
            "q+": Math.floor((this.getMonth() + 3) / 3),
            /*季度*/
            "S": this.getMilliseconds() /*毫秒*/
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(Y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    Date.prototype.secondBefore = function(num) {
        var time = (this.getTime() / 1000 - num - 1) * 1000;
        this.setTime(time)
        return this;
    };
    Date.prototype.secondAfter = function(num) {
        var time = (this.getTime() / 1000 + parseInt(num)) * 1000;
        this.setTime(time);
        return this;
    };
    Date.prototype.mimuteBefore = function(num) {
        var time = this.getTime() - num * 1000 * 60;
        this.setTime(time)
        return this;
    };
    Date.prototype.mimuteAfter = function(num) {
        var time = this.getTime() + parseInt(num) * 60 * 1000;
        this.setTime(time);
        return this;
    };
    Date.prototype.hourBefore = function(num) {
        var time = this.getTime() - num * 1000 * 60 * 60;
        this.setTime(time)
        return this;
    };
    Date.prototype.hourAfter = function(num) {
        var time = this.getTime() + parseInt(num) * 60 * 60 * 1000;
        this.setTime(time);
        return this;
    };
    Date.prototype.dayBefore = function(num) {
        var time = this.getTime() - num * 1000 * 60 * 60 * 24;
        this.setTime(time)
        return this;
    };
    Date.prototype.datAfter = function(num) {
        var time = this.getTime() + parseInt(num) * 60 * 60 * 1000 * 24;
        this.setTime(time);
        return this;
    };

}
