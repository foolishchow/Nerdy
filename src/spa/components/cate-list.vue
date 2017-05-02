<template>
    <div class="cate-list" v-show="!hiddenCate"
         tabindex="0" ref="cate-list"
         :style="{width : _cateWidth}"
         @mousedown="handleMouseDown($event,'updateWidth')"
         @mousemove="handleMouseMove($event,'cate-list')">
        <app-title></app-title>
        <div class="cate-container _container" tabindex="30001"
             @keyup.enter="modify"
             @keyup.delete="deleteCate">
            <div class="nav-group">
                <h5 class="nav-group-title">Notes</h5>
                <span class="nav-group-item "
                      @click="selectCate({id:'all'})"
                      :class="cateId == 'all' ? 'active' : ''"
                >所有</span>
                <template v-for="cate in model.cates">
                        <span v-if=" cateId == cate.id && viewModel.edit"
                              class="nav-group-item active"
                        >
                            <input class="cate-edit"
                                   ref="cate-edit" v-model="cate.title"
                                   :style="{width:_inputWidth}"
                                   @keyup.stop.enter="saveModify($event,cate)"
                                   @keyup.stop/>
                        </span>
                        <span v-else
                              class="nav-group-item "
                              :class="cateId == cate.id ? 'active' : ''"
                              @click="selectCate(cate)"
                        >{{cate.title}}</span>
                </template>
            </div>
        </div>
        <div class="cate-add-wrap">
                <span class="cate-add" @click="addCate">
                    <span class="iconfont icon-tianjia"></span>添加类别
                </span>
        </div>
    </div>
</template>
<script type="text/babel">
    import resize from './resize'
    export default {
        mixins: [resize],
        data(){
            return {
                viewModel: {
                    edit: false,
                    needSelect: false
                },
                model: {
                    cates: []
                },
                resize:{
                    can:false,
                    in:false,
                    min:  130
                }
            };
        },
        created(){
            this.query();
        },
        computed: {
            _cateWidth(){
                return this.$store.state.config.cateWidth + 'px';
            },
            _inputWidth(){
                return (this.$store.state.config.cateWidth - 46) + 'px';
            },
            cateId() {
                return this.$store.state.config.cateId;
            },
            hiddenCate(){
                return this.$store.state.config.hiddenCate
            },
            commit(){
                return this.$store.commit;
            },
            selectedCate(){
                if (this.cateId == 'all') return {id:'all',title:'所有'};
                var i = 0;
                while (this.model.cates[i].id != this.cateId) {
                    i++;
                }
                return this.model.cates[i];
            }
        },
        updated(){
            if (this.$refs['cate-edit'] && this.$refs['cate-edit'][0]) {
                if (this.viewModel.needSelect) {
                    this.viewModel.needSelect = false;
                    this.$refs['cate-edit'][0].select();
                }
            }
        },
        methods: {
            updateWidth(width){
                this.commit('cateWidth',width)
            },
            query(){
                this.$db('cates.query',{},(data)=>{
                    this.model.cates = data;
                });
            },
            deleteCate(){
                if (this.cateId == 'all') return;
                var i = 0;
                while (this.model.cates[i].id != this.cateId) {
                    i++;
                }
                this.$db('cates.delete', this.cateId, ({success})=> {
                    if (success) {
                        this.query();
                        let id = i == 0 ? 'all' : this.model.cates[i - 1].id;
                        this.commit('cateId', id)
                    }
                });
            },

            modify(){
                if (this.cateId == 'all') return;
                this.viewModel.edit = true;
                this.viewModel.needSelect = true;
            },
            selectCate(cate){
                if (this.cateId == cate.id) return;
                if (this.viewModel.edit) {
                    this.saveModify().then((result)=> {
                        if (result) {
                            this.commit('cateId', cate.id)
                        }
                    })
                } else {
                    this.commit('cateId', cate.id);
                }
            },
            saveModify(){
                let cate = this.selectedCate;
                cate.title = cate.title.replace(/^\s|\s$/gi, '');;
                return new Promise((resolve)=> {
                    if (cate.title == '') {
                        this.$alert(`分组名不能为空`);
                        this.$refs['cate-edit'][0].select();
                        resolve(false);
                        return false;
                    }
                    let has = false;
                    this.model.cates.forEach(item=> {
                        if (item.title == cate.title && item.id != cate.id) has = true;
                    });
                    if (has) {
                        this.$alert(`已经有一个分组名为 >> ${cate.title} <<`);
                        this.$refs['cate-edit'][0].select();
                        resolve(false);
                        return false;
                    } else {
                        this.$db('cates.update', cate, (data) => {
                            this.viewModel.edit = false;
                            this.$refs['cate-list'].focus();
                            resolve(true)
                        });
                    }
                });
            },
            addCate(){
                const indexOf = (string, list)=> {
                    let has = false;
                    list.forEach(item=> {
                        if (item.title == title) has = true;
                    });
                    return has;
                };
                let title = '新建分组',
                        i = 0;
                while (indexOf(title, this.model.cates)) {
                    i++;
                    title = '新建分组 ' + i;
                }
                this.$db('cates.add', {title: title}, id=> {
                    this.commit('cateId', id);
                    this.viewModel.edit = true;
                    this.viewModel.needSelect = true;
                    this.query();
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss">
    .cate-list {
        position: relative;
        width: 180px;
        height: 100%;
        background-color: rgb(244, 240, 240);
        float: left;

        .cate-container {
            position: absolute;
            top: 34px;
            bottom: 25px;
            width: 100%;
            border-right: 1px solid rgb(223, 223, 223);
            overflow-y: scroll;
            .cate-edit {
                border: none;
                line-height: 17px;
                font-size: 13px;
                margin-left: -2px;
            }

            &:focus {
                .nav-group-item.active {
                    background: rgb(23, 112, 220);
                    color: #fff;
                }
            }
        }
        .cate-add-wrap {
            height: 25px;
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 12px;
            line-height: 25px;
            color: #444;
            cursor: default;
            border-right: 1px solid rgb(223, 223, 223);
            .iconfont {
                font-size: 12px;
                padding-right: 5px;
            }
        }

        .nav-group {
            font-size: 14px;
            * {
                cursor: default;
            }
            .nav-group-title {
                margin: 0;
                padding: 10px 10px 2px;
                font-size: 12px;
                font-weight: 500;
                color: rgb(93, 93, 93);
            }
            .nav-group-item {
                padding: 3px 10px 3px 25px;
                display: block;
                color: #333;
                text-decoration: none;
                font-weight: 400;
                &.active {
                    background-color: #dcdfe1;
                }
            }
        }
    }
</style>