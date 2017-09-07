<template>
    <div :style="style"></div>
</template>

<script type="text/babel">
    const debounce = require('lodash.debounce');
    const monacoLoader = require( './MonacoLoader');
    const toMarkdown = require('./toMarkdown');
    module.exports =  {
        props: {
            value:{
                type: String,
                default: '// code \n'
            },
            width: {
                type: [String, Number],
                default: '100%'
            },
            height: {
                type: [String, Number],
                default: '100%'
            },
            code: {
                type: String,
                default: '// code \n'
            },
            srcPath: {
                type: String
            },
            language: {
                type: String,
                default: 'javascript'
            },
            theme: {
                type: String,
                default: 'vs'
            }, // vs, hc-black,vs-dark
            options: {
                type: Object,
                default: () => {
                }
            },
            highlighted: {
                type: Array,
                default: () => [{
                    number: 0,
                    class: ''
                }]
            },
            changeThrottle: {
                type: [Number,String],
                default: 0
            }
        },
        mounted() {
            this.fetchEditor();
        },
        destroyed() {
            this.destroyMonaco();
        },
        computed: {
            style() {
                const {width, height} = this;
                const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`;
                const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`;
                return {
                    width: fixedWidth,
                    height: fixedHeight,
                };
            },
            editorOptions() {
                return Object.assign({}, this.defaults, this.options, {
                    value: this.value,
                    language: this.language,
                    theme: this.theme
                });
            }
        },
        data() {
            return {
                defaults: {
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    automaticLayout: false,
                    glyphMargin: true,
                    fontSize:14,
                    scrollBeyondLastLine: false,
                    minimap: {
                        enabled: false
                    },
                    contextmenu:false
                }
            }
        },
        watch: {
            highlighted: {
                handler(lines) {
                    this.highlightLines(lines);
                },
                deep: true
            },
            language () {
                window.monaco.editor.setModelLanguage(this.editor.getModel(), this.language)
            },
            value(val,oldVal){
                if(val != oldVal && this.editor && val != this.editor.getValue()){
                    this.editor.setValue(val);
                }
            }
        },
        methods: {
            highlightLines(lines) {
                if (!this.editor) {
                    return;
                }
                lines.forEach((line) => {
                    const className = line.class;
                    const highlighted = this.$el.querySelector(`.${className}`);
                    if (highlighted) {
                        highlighted.classList.remove(className);
                    }
                    const number = parseInt(line.number);
                    if (!this.editor && number < 1 || isNaN(number)) {
                        return;
                    }
                    const selectedLine = this.$el.querySelector(`.view-lines [linenumber="${number}"]`);
                    if (selectedLine) {
                        selectedLine.classList.add(className);
                    }
                });
            },
            editorHasLoaded(editor, monaco) {
                this.editor = editor;
                this.monaco = monaco;
                this.editor.onDidChangeModelContent(event =>
                    this.codeChangeHandler(editor, event)
                );
                this.editor.onDidBlurEditorText(()=>globalEmmiter.emit('focusEditor',false));
                this.editor.onDidFocusEditorText(()=>globalEmmiter.emit('focusEditor',true));
                let self = this;
                this.editor.addAction({
                    id: 'editor.action.transformToMarkdown',
                    label: 'transformToMarkdown',
                    // keybindings: [ monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_T)],
                    run(ed) {
                        let value = ed.getValue();
                        let val = toMarkdown(value)
                        // self.$emit('input',val)
                        ed.setValue(val)
                        return null;
                    }
                });

                this.$emit('mounted', editor);
                globalEmmiter.editor = this.editor;
            },
            codeChangeHandler: function (editor) {
                if (this.codeChangeEmitter) {
                    this.codeChangeEmitter(editor);
                } else {
                    this.codeChangeEmitter = debounce(
                        function (editor) {
                            this.$emit('codeChange', editor);
                            this.$emit('input', editor.getValue());
                        },
                        this.changeThrottle
                    );
                    this.codeChangeEmitter(editor);
                }
            },
            fetchEditor() {
                monacoLoader.load(this.srcPath, this.createMonaco);
            },
            createMonaco() {
                this.editor = window.monaco.editor.create(this.$el, this.editorOptions);
                this.editorHasLoaded(this.editor, window.monaco);
                window.onresize = this.layout.bind(this);
            },
            destroyMonaco() {
                globalEmmiter.editor = null;
                if (typeof this.editor !== 'undefined') {
                    this.editor.dispose();
                }
            },
            layout(){
                setTimeout(()=>{
                    this.editor && this.editor.layout();
                },15)
            }
        }
    };
</script>
