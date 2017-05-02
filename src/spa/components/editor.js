const {markdown,Vue} = window;
export  default {
    mounted(){
        this.create();
    },
    methods: {
        modeTo(val){
            this.commit('mode', val);
        },
        create(){
            this.initEditor();
            this.initPreview();
            if (this.noteId != null) {
                this.queryNote();
            }
        },
        queryNote(){
            this.$db('note_detail.query', {parent_id: this.noteId}, (data)=> {
                this.msg = data.text;
                this.editor.setValue(data.text);
                this.editor.refresh();
                this.initPreview();
            })
        },
        initPreview(){
            this.preview = markdown.parse({content: this.msg}).html;
        },
        initEditor(){
            if (this.editor == null) {
                const editor = CodeMirror.fromTextArea(this.$refs['textarea'], {
                    mode: 'gfm',
                    theme: 'base16-light',//this.settings.editor.theme,
                    lineNumbers: true,
                    matchBrackets: true,
                    lineWrapping: true,
                    scrollbarStyle: 'simple',
                    autofocus: true,
                    dragDrop: false,
                    tabSize: 4,//this.settings.editor.tabSize,
                    indentWithTabs: true,//this.settings.editor.indentWithTabs,
                    extraKeys: {
                        Enter: 'newlineAndIndentContinue',
                        Tab(cm){
                            cm.replaceSelection(' '.repeat(cm.getOption('tabSize')))
                            //                            if ( this.settings.indentWithTabs ){
                            //                                cm.replaceSelection('\t');
                            //                            }else{
                            //                            }
                        },
                        // 'Alt-F': 'findPersistent'
                    }
                });
                editor.on('change', (e)=> {
                    this.msg = e.getValue().replace(/\\n/gi, '\n');
                    this.initPreview();
                    this.updateNotes();
                });
                setTimeout(()=> {
                    editor.refresh()
                }, 1);
                this.editor = editor;
            }
        },
        updateNotes(){

            this.$db('note_detail.update', {
                text: this.msg,
                parent_id: this.noteId,
                title:this.title,
                description:this.description
            }, (data) => {
                console.info(data)
            });
        }
    },
    watch: {
        noteId(){
            // this.commit('mode', 'preview');
            this.queryNote();
        },
        showEdit(val){
            if(val) {
                Vue.nextTick(()=>{
                    this.editor.focus();
                    this.editor.refresh()
                });
            }
        },
        msg(val){
            console.info(`msg changed to => ${val}`)
        }

    }
}