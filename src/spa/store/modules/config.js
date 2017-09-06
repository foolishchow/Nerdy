const {message} = window;
const state = {
    cateWidth: 130,
    noteWidth: 180,
    hiddenCate: false,
    cateId:'all',
    noteId:null,
    noteDetail:'',
    mode:'preview',
    showEdit:false,
    showPreview:true,
    noteList:[],
    refreshFlag:new Date().getTime(),
    dragged:null,
    dragEnter:null,
    os:''
};

const update = (data)=>{
    fetcher('config.update',data)
};
const mutations = {
    cateWidth(state, width) {
        state.cateWidth = width;
        update(state);
    },
    noteWidth(state, width) {
        state.noteWidth = width;
        update(state)
    },
    hiddenCate(state, val){
        state.hiddenCate = val;
        update(state)
    },
    cateId(state, val){
        state.cateId = val;
        update(state)
    },
    noteId(state,val){
        state.noteId = val;
        update(state);
    },
    noteDetail(state,val){
        state.noteDetail = val;
        // update(state)
    },
    mode(state,val){
        state.mode = val;
        if (val != 'preview') {
            state.showEdit = true;
        }else{
            state.showEdit = false;
        }
        if (val != 'edit') {
            state.showPreview = true;
        }else{
            state.showPreview = false;
        }
        update(state);
    },
    refreshFlag(state){
        state.refreshFlag = new Date().getTime();
    },
    noteList(state,val){
        state.noteList = val;
    },
    dragged(state,val){
        state.dragged = val;
    },
    dragEnter(state,val){
        state.dragEnter = val;
    }
};
const init = ()=>{
    fetcher('config.get',{}).then((data)=>{
        delete data.dragEnter;
        console.info(data)
        Object.assign(state,data)
    })
    // message.send('config',{
    //     method:'get',
    //     arg:{}
    // },function (event,arg) {
    //     delete arg.dragEnter;
    //     Object.assign(state,arg)
    // });
};

init();
// export {init};
module.exports =  {
    state,
    mutations
}