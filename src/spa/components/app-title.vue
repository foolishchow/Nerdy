<template>
    <div class="app-title" :class="'align-'+align">
        <slot></slot>
    </div>
</template>
<script>
    module.exports = {
        props:{
            align:{
                type:String,
                default:'left'
            }
        },
        name:'app-title',
        data(){
            return {};
        }
    }
</script>
<style rel="stylesheet/scss">
    .app-title {
        font-size: 12px;
        color: #555;
        height: 34px;
        width: 100%;
        text-align: center;
        line-height: 34px;
        background-color: #e8e6e8;
        background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #e8e6e8), color-stop(100%, #d1cfd1));
        background-image: -webkit-linear-gradient(top, #e8e6e8 0, #d1cfd1 100%);
        background-image: linear-gradient(to bottom, #e8e6e8 0, #d1cfd1 100%);
        box-shadow: inset 0 1px 0 #f5f4f5;
        border-top: 1px solid #c2c0c2;
        -webkit-app-region: drag;
        width: 100%;

        &.align-left{
            text-align: left;
        }
        &.align-right{
            text-align: right;
        }
        .iconfont {
            margin-left: 2px;
            display: inline;
            padding: 3px 10px;
            border-radius: 4px;
            border: 1px solid #c1c1c1;
            background: rgb(245, 245, 245);
        }
    }
</style>