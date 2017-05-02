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
    showPreview:true
};

const update = (data)=>{
    message.send('config',{
        method:'update',
        arg:data
    },function (event,arg) {
    });
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
    }
};
const init = ()=>{
    message.send('config',{
        method:'get',
        arg:{}
    },function (event,arg) {
        Object.assign(state,arg)
    });
};

init();
export {init};
export default {
    state,
    mutations
}