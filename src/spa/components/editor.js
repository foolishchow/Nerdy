const {markdown, Vue} = window;

export  default {
    mounted(){
        this.create();
    },
    methods: {
        modeTo(val){
            this.commit('mode', val);
            this.$refs['monaco-editor'].layout();
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
                    // this.$refs['monaco-editor'].setValue(data.text);
                    // this.editor.setValue(data.text);
                    // this.editor.clearHistory()
                    // this.editor.refresh();
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

            }
        },
        codeChange(editor){
            let value = editor.getValue();
            if (value != this.msg) {
                this.msg = value;
                this.initPreview();
                this.updateNotes();
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
                    // this.editor.focus();
                    // this.editor.refresh()
                });
            }
        },
        msg(val){
             this.updateNotes();
            this.initPreview();
        },
        hiddenCate(){
            this.$refs['monaco-editor'].layout();
        }

    }
}
