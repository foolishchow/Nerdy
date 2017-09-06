const {markdown, Vue} = window;
module.exports = {
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
                fetcher('db/note_detail/query',{parent_id: this.noteId}).then((data)=> {
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
            fetcher('db/note_detail/update', {
                text: this.msg,
                parent_id: this.noteId,
                title: this.title,
                description: this.description
            }).then( (data) => {
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
        msg(val,old){

        },
        hiddenCate(){
            this.$refs['monaco-editor'].layout();
        }

    }
}
