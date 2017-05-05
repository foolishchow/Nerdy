<template>
    <div>
        <app-title>
            <i class="iconfont icon-liangping"
               @click="modeTo('both')"
               v-show="mode != 'both'"></i>
            <i class="iconfont icon-preview"
               @click="modeTo('preview')"
               v-show="mode != 'preview'"></i>
            <i class="iconfont icon-bianji"
               @click="modeTo('edit')"
               v-show="mode != 'edit'"></i>
        </app-title>
        <div class="e-wrap">
            <div class="editor-wrap" v-show="noteId != null && showEdit">
                <textarea class="editor-input" ref="textarea">{{msg}}</textarea>
            </div>
            <div class="preview-wrap" v-show="noteId != null && showPreview">
                <div class="markdown-body" v-html="preview"></div>
            </div>
            <div class="empty-wrap" v-show="noteId == null"></div>
        </div>
    </div>

</template>
<script type="text/babel">
    import mixins from './editor.js'
    export default{
        mixins: [mixins],
        name: 'editor',
        data(){
            return {
                editor: null,
                msg: '',
                preview: ''
            }
        },
        computed: {
            noteId(){
                return this.$store.state.config.noteId;
            },
            commit(){
                return this.$store.commit;
            },
            showEdit(){
                return this.$store.state.config.showEdit;
            },
            showPreview(){
                return this.$store.state.config.showPreview;
            },
            mode(){
                return this.$store.state.config.mode;
            },
            refreshFlag(){
                return this.$store.state.config.refreshFlag;
            },
            title(){
                let result = '';
                var arr = this.msg.split(/\n/);
                for (var i = 0; i < arr.length; i++) {
                    let item = arr[i];
                    if (item.replace(/^\s|\s$/gi, '') != '') {
                        result = item.replace(/^\s|\s$/gi, '').replace(/^#/gi, '').replace(/^\s|\s$/gi, '');
                        break;
                    }
                }
                return result;
            },
            description(){
                return '';
            }
        }

    }
</script>
<style lang="css" rel="stylesheet/scss">
    /*codemirror theme */
    .e-wrap {
        background: #fff;
        position: absolute;
        top: 34px;
        bottom: 0px;
        width: 100%;

        padding: 0;
        margin: 0;
        display: flex;
        .preview-wrap {
            flex: 1;
            .markdown-body {
                padding: 10px;
            }
        }
        .editor-wrap {
            flex: 1;
        }
        .empty-wrap{
            flex: 1;
            background: lighten(#999,60%);
        }
    }

    .editor-wrap {

        .CodeMirror {
            height: 100%;
            .CodeMirror-linenumbers{
                border-right: 1px solid #ddd;
            }
        }
        &.focus-mode {
            * {
                color: #ccc !important;
            }
        }
        .cm-s-base16-light {
            .CodeMirror-activeline-background {
                background-color: transparent;
            }
            .CodeMirror-activeline {
                * {
                    color: #333 !important;
                }
            }
        }
        .CodeMirror-dialog input {
            font-family: inherit !important;
        }
    }

    .editor-wrap, .preview-wrap {
        min-width: 100px;
        height: 100%;
        overflow: auto;
    }

    .markdown-body{
        font-size: 85%;
        * {
            -webkit-user-select: auto;
        }
    }
</style>

