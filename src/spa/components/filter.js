const DATE =  require('./date')
DATE();
module.exports = (Vue)=>{
    Vue.filter('date', function (value) {
        let date = new Date(value),
            today = new Date();
        if(date.Format('yyyy-MM-dd') == today.Format('yyyy-MM-dd')){
            return date.Format('HH:mm')
        }else{
            return date.Format('yyyy/MM/dd');
        }
    });
}
