<template>
    <div class="note-list" tabindex="1" ref="note-list"
         :style="{width : _noteWidth}"
         @mousedown="handleMouseDown($event,'updateWidth')"
         @mousemove="handleMouseMove($event,'note-list')">
        <app-title :style="{paddingLeft: !hiddenCate ?'0px':'75px'}">
            <span class="iconfont icon-yincangdaohang"
                  @click="toggleCate"></span>
            <span class="iconfont icon-iconfontshanchu6"
                  ></span>
            <span class="iconfont icon-bianji1"
                  @click="addNote"></span>
        </app-title>
        <div class="note-container _container">
            <div class="note-root">
                <div class="note" v-for="note in model.notes"
                    :class="note.id == noteId ? ' active' :''"
                    @click="changeNoteId(note)">
                    <h5>{{note.title}}</h5>
                    <p>{{note.last_update_date | date}} {{note.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import resize from './resize'
    export default {
        mixins: [resize],
        data(){
            return {
                viewModel: {},
                model: {
                    notes:[]
                },
                resize: {
                    can: false,
                    in: false,
                    min: 210
                }
            };
        },
        created(){
            this.query();
        },
        methods: {
            changeNoteId(note){
                this.commit('noteId',note.id);
            },
            toggleCate(){
                this.commit('hiddenCate', !this.hiddenCate)
            },
            updateWidth(width){
                this.commit('noteWidth', width)
            },
            query(){
                let condition = {
                    clause:'cateId = ?',
                    params:[this.cateId]
                };
                if(this.cateId == 'all') {
                    condition = {
                        clause:'1 = 1',
                        params:[]
                    };
                }
                this.$db('notes.query',condition,(data)=>{
                    this.model.notes = data;
                });
            },
            addNote(){
                this.$db('notes.add',{title:'新建文档',cateId:this.cateId},id=>{
                    this.commit('noteId',id);
                    this.query();
                });
            },
            evalDate(){

            }
        },
        computed: {
            hiddenCate(){
                return this.$store.state.config.hiddenCate
            },
            _noteWidth(){
                return this.$store.state.config.noteWidth + 'px';
            },
            cateId(){
                return this.$store.state.config.cateId;
            },
            noteId(){
                return this.$store.state.config.noteId;
            },
            commit(){
                return this.$store.commit;
            }
        },
        watch:{
            cateId(val){
                this.query();
                console.info(`cateId changed to => ${val}`)
            }
        }
    }
</script>
<style rel="stylesheet/scss">
    .note-list {
        font-size: 13px;
        width: 200px;
        height: 100%;
        float: left;
        background: rgb(250, 250, 248);
        position: relative;

        .note-container {
            position: absolute;
            top: 34px;
            bottom: 0;
            width: 100%;
            border-right: 1px solid rgb(223, 223, 223);
            overflow-y: scroll;
        }

        &:focus {
            .note.active {
                background-color: darken(rgb(254, 240, 180), 6%);
            }
        }
        .note {
            height: 55px;
            padding: 8px 10px;
            border-bottom: 1px solid rgb(223, 223, 223);
            position: relative;
            * {
                cursor: default;
            }
            &:after {
                content: " ";
                display: inline-block;
                width: 10px;
                position: absolute;
                bottom: -1px;
                left: 0;
                height: 0;
                border-bottom: 1px solid rgb(250, 250, 248);
            }

            &.active {
                background-color: rgb(254, 240, 180);
            }
            & > h5 {
                margin: 0 0 3px 0;
                padding: 0;
                font-size: 14px;
                font-weight: 400;
            }
            & > p {
                color: #444;
                margin: 0;
                padding: 0;
                font-weight: 300;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>