<template>
    <div class="left-wrap clearfix" ref="cate-wrap">
        <cate-list></cate-list>
        <note-list></note-list>
    </div>
</template>
<script type="text/babel">
    import cateList from './cate-list.vue'
    import noteList from './note-list.vue';
    export default {
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