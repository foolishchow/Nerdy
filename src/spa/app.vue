<template>
    <!--<editor></editor>-->
    <div :class="'app '+os">
        <div class="wrap" v-if="inited">
            <left-main
                    :cate-width="config.cateWidth"
                    :note-width="config.noteWidth"
                    :cate-id="config.cateId"
                    :hidden-cate="config.hiddenCate"
            ></left-main>
            <div class="flex-editor">
                <editor></editor>
            </div>
        </div>
        <div style="position: absolute;width: 0;height: 0;z-index: -1">
            <img id="drag" :src="dragImg" style="width: 30px;height: auto">
        </div>
    </div>

</template>
<script type="text/babel">
    module.exports = {
        data(){
            return {
                config: {
                    cateWidth: 130,
                    noteWidth: 180,
                    hiddenCate: false
                },
                inited: false,
                dragImg: '../src/img/plan.png'
            };
        },
        created(){
            this.getConfig();
        },
        methods: {
            updateConfig(obj, callback=()=>{}){
                this.config = obj;
                fetcher('config.update', obj).then(callback);
            },
            getConfig(){
                fetcher('config.get').then((obj)=> {
                    this.inited = true;
                    if (obj == null) {
                        obj = {
                            'cateWidth': 130,
                            'noteWidth': 180
                        };
                        this.updateConfig(obj)
                    } else {
                        this.config = obj;
                    }
                });
            },
            setTitleSize(val){
                this.config.titleSize = val;
            }
        },
        computed:{
            os(){
                return this.$store.state.config.os;
            }
        }
    }
</script>
<style rel="stylesheet/scss">
    body * {
        /*cursor: default;*/
        -webkit-user-select: none;
        outline: none;
        -webkit-font-smoothing: antialiased;
    }

    body {
        /*cursor: col-resize;*/
    }

    /*Forms*/
    input,
    textarea {
        -webkit-user-select: text;
    }

    form,
    input,
    optgroup,
    select,
    textarea {
        -webkit-user-select: text;
        -webkit-app-region: no-drag;
    }

    body {
        background-color: #fff;
        position: relative;
        padding: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica, helvetica neue, Ubuntu, segoe ui, arial ,'Microsoft yahei', sans-serif;;
    }

    html {
        padding: 0;
        width: 100%;
        height: 100%;
        margin: 0;
    }

    .wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        & > div.flex-editor {
            flex: 1;
            position: relative;
        }
    }

    .CodeMirror-line {

        .cm-url-define{
            color:rgb(189,103,21);
        }
        .cm-header-1 {
            font-size: 24px;
        }
        .cm-header-2 {
            font-size: 21px;
        }
        .cm-header-3 {
            font-size: 18px;
        }
        .cm-header-4 {
            font-size: 16px;
        }
        .cm-header-5 {
            font-size: 14px;
        }
        .cm-header-6 {
            font-size: 12px;
        }
        .cm-header {
            color: rgb(109, 115, 194)
        }

        .cm-header-4,
        .cm-header-5,
        .cm-header-6 {
            color: rgb(46, 140, 207)
        }

        .cm-strong {
            color: rgb(218, 52, 52)
        }

        .cm-em,
        .cm-emphasize{
            color: rgb(201, 76, 34);
            font-style: italic;
        }

        span.cm-link,
        span.cm-url{
            color: rgb(78, 45, 152)
        }

        span.cm-image,
        span.cm-image.cm-url,
        span.cm-image-url{
            color:rgb(207,22,153)
        }
        .cm-link{
            text-decoration: none;
        }

        .cm-list{
            color:#6a9fb5;
        }
        .cm-quote{
            color:#aaa;
            text-decoration: blink;
        }
        span.cm-comment,
        .cm-code-block{
            color: rgb(18, 139, 21)
        }

        .CodeMirror-matchingbracket {
            color: rgb(78, 45, 152) !important;
        }


    }

    .win{
        ::-webkit-scrollbar {width: 6px;height:6px;}
        ::-webkit-scrollbar-track-piece{background-color: #eee;margin: -2px;}
        ::-webkit-scrollbar-thumb{background: #aaa;min-height: 150px;min-width: 150px;border-radius: 10px;}
        ::-webkit-scrollbar-thumb:vertical:hover{background: #555555}
        ::-webkit-scrollbar-thumb:horizontal:hover{background: #555555}
    }
    
</style>
