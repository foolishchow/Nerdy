const {markdown, Vue} = window;
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
            if (this.noteId != null) {
                this.$db('note_detail.query', {parent_id: this.noteId}, (data)=> {
                    this.msg = data.text;
                    this.editor.setValue(data.text);
                    this.editor.clearHistory()
                    this.editor.refresh();
                    this.initPreview();
                })
            } else {

            }
        },
        initPreview(){
            this.preview = markdown.parse({content: this.msg}).html;
        },
        initEditor(){
            if (this.editor == null) {
                const editor = CodeMirror.fromTextArea(this.$refs['textarea'], {
                    mode: 'markdown3',
                    theme: 'base16-light',//this.settings.editor.theme,
                    lineNumbers: true,
                    matchBrackets: true,
                    lineWrapping: false,
                    scrollbarStyle: 'native',
                    showCursorWhenSelecting: true,
                    autofocus: true,
                    dragDrop: false,
                    tabSize: 4,//this.settings.editor.tabSize,
                    indentWithTabs: true,//this.settings.editor.indentWithTabs,
                    extraKeys: {
                        Enter: 'newlineAndIndentContinue',
                        Tab(cm){
                            console.info(cm);
                            let sections = cm.getSelection();
                            if (/\n/.test(sections)) {
                                let lineNumber = cm.getCursor();
                                console.info(lineNumber);
                                let lines = sections.split(/\n/).length;//,'\n'+' '.repeat(cm.getOption('tabSize')));
                                console.info(cm.setLine);

                                for(var i = 0 ; i < lines.length ; i++ ){
                                }
                                // cm.replaceSelection(lines);
                            }else{
                                cm.replaceSelection(' '.repeat(cm.getOption('tabSize')))
                            }
                        },
                        'Shift-Tab': function (cm) {
                            let sections = cm.getSelection();
                            if (/\n/.test(sections)) {

                            }else{
                                let lineNumber = cm.getCursor();
                                // console.info(lineNumber)
                                let line = cm.getLine(lineNumber.line);
                                let tabsize = cm.getOption('tabSize');
                                let regexp = new RegExp(`^\s{${tabsize}`);
                                if(regexp.text(line)){

                                }else{

                                }
                                // cm.replaceSelection(' '.repeat(cm.getOption('tabSize')))
                            }
                            console.info(cm.getSelection());
                        }
                        // 'Alt-F': 'findPersistent'
                    }
                });
                editor.on('change', (e)=> {
                    let value = e.getValue();
                    if (value != this.msg) {
                        this.msg = value;
                        this.initPreview();
                        this.updateNotes();
                    }
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
                title: this.title,
                description: this.description
            }, (data) => {
                this.commit('refreshFlag', new Date().getTime())
            });
        }
    },
    watch: {
        noteId(){
            // this.commit('mode', 'preview');
            this.queryNote();
        },
        showEdit(val){
            if (val) {
                Vue.nextTick(()=> {
                    this.editor.focus();
                    this.editor.refresh()
                });
            }
        },
        msg(val){
            // console.info(`msg changed to => ${val}`)
        }

    }
}
