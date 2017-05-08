<template>
    <!--<editor></editor>-->
    <div class="app">
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
    export default{
        data(){
            return {
                config: {
                    cateWidth: 130,
                    noteWidth: 180,
                    hiddenCate: false
                },
                inited: false,
                dragImg:'../assets/img/plan.png'
            };
        },
        created(){
            this.getConfig();
            //            this.$confirm('确定加载这个文件么!',function(result){
            //                console.info(result)
            //            })

        },
        methods: {
            updateConfig(obj, callback){
                this.config = obj;
                this.$config('update', obj, callback);
            },
            getConfig(){
                this.$config('get', {}, (obj)=> {
                    this.inited = true;
                    if (obj == null) {
                        obj = {
                            'cateWidth': 130,
                            'noteWidth': 180
                        };
                        this.updateConfig(obj, ()=> {})
                    } else {
                        this.config = obj;
                    }
                });
            },
            setTitleSize(val){
                this.config.titleSize = val;
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
        font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica, helvetica neue, Ubuntu, segoe ui, arial, sans-serif;;
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
            position:relative;
        }
    }
</style>