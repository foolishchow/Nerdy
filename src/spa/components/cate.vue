<template>
    <div class="left-wrap clearfix" ref="cate-wrap">
        <cate-list></cate-list>
        <note-list></note-list>
    </div>
</template>
<script type="text/babel">
    const cateList = require('./cate-list.vue') 
    const noteList = require('./note-list.vue');
    module.exports = {
        components:{cateList,noteList},
        name: 'left-main',
        data(){
            return {};
        }
    }
</script>
<style rel="stylesheet/scss">
    .left-wrap {
        height: 100%;
        & * {
            box-sizing: border-box;
        }


    }
</style>