<template>
<div class="note-list"
     tabindex="1"
     ref="note-list">
  <app-title :style="{paddingLeft: (!hiddenCate||isWin) ?'0px':'75px'}">
    <span class="iconfont icon-yincangdaohang"
          @click="toggleCate"></span>
    <span class="iconfont icon-iconfontshanchu6"
          @click="deleteNote"></span>
    <span class="iconfont icon-bianji1"
          @click="addNote"></span>
  </app-title>
  <div class="note__wrap">
      <resize-panel v-model="width"
                    min="210">
        <div class="note-container _container"
             tabindex="30002"
             @keyup.delete="deleteNote"
             @dragover="NoteWrapDragenter()">
          <div class="note-root">
            <div class="note"
                 v-for="note in noteList"
                 :class="note.id == noteId ? ' active' :''"
                 @click="changeNoteId(note)"
                 :draggable="!resize.can"
                 @dragstart="NoteDragstart($event,note)"
                 @dragend="NoteDragend($event)">
              <h5>{{note.title}}</h5>
              <p>{{note.last_update_date | date}} {{note.description}}</p>
            </div>
          </div>
        </div>
      </resize-panel>
    </div>
</div>

</template>

<script type="text/babel">
module.exports = {
  name: 'note-list',
  data() {
    return {
      viewModel: {},
      width: 0,
      minWidth: 210,
      resize: {
        can: false,
        in: false,
        min: 210
      }
    }
  },
  created() {
    this.width = this._noteWidth
    this.query()
  },
  methods: {
    changeNoteId(note) {
      this.commit('noteId', note.id)
    },
    toggleCate() {
      this.commit('hiddenCate', !this.hiddenCate)
    },
    updateWidth(width) {
      this.commit('noteWidth', width)
    },
    query() {
      let condition = {
        clause: 'cateId = ?',
        params: [
          this.cateId
        ]
      }
      if (this.cateId === 'all') {
        condition = {
          clause: '1 = 1',
          params: []
        }
      }
      fetcher('db/notes/query', condition).then((data) => {
        this.commit('noteList', data)
        if (data.length === 0) {
          this.commit('noteId', null)
          return
        }
        let hasThisNote = false
        data.forEach(item => {
          if (item.id === this.noteId) {
            hasThisNote = true
          }
        })
        if (!hasThisNote) {
          this.commit('noteId', data[0].id)
        }
      })
    },
    addNote() {
      if (this.mode === 'preview') {
        this.commit('mode', 'edit')
      }
      fetcher('db/notes/add', {
        title: '新建文档',
        cateId: this.cateId
      })
        .then(id => {
          this.commit('noteId', id)
          this.query()
        })
    },
    deleteNote() {
      if (this.noteId === null) {
        return
      }
      fetcher('system.confirm', {
        message: '确定删除这个文档么?'
      }).then((result) => {
        if (result) {
          fetcher('db/notes/delete', {
            id: this.noteId
          }).then(() => {
            this.commit('refreshFlag', '')
          })
        }
      })
    },
    NoteDragstart(event, note) {
      this.commit('dragged', {
        type: 'note',
        data: note
      })
      event.dataTransfer.setDragImage(document.getElementById('drag'), 20, 20)
    },
    NoteDragend(event) {
      if (this.dragEnter === null) {
        event.dataTransfer.dropEffect = 'none'
      } else {
        fetcher('db/notes/updateCate', {
          id: this.dragged.data.id,
          cate_id: this.dragEnter
        }).then((result) => {
          this.commit('dragged', null)
          this.commit('dragEnter', null)
          this.commit('refreshFlag')
        })
      }
    },
    NoteWrapDragenter() {
      this.commit('dragEnter', null)
    }
  },
  computed: {
    dragged() {
      return this.$store.state.config.dragged
    },
    dragEnter() {
      return this.$store.state.config.dragEnter
    },
    hiddenCate() {
      return this.$store.state.config.hiddenCate
    },
    _noteWidth() {
      return this.$store.state.config.noteWidth
    },
    cateId() {
      return this.$store.state.config.cateId
    },
    noteId() {
      return this.$store.state.config.noteId
    },
    commit() {
      return this.$store.commit
    },
    refreshFlag() {
      return this.$store.state.config.refreshFlag
    },
    noteList() {
      return this.$store.state.config.noteList
    },
    mode() {
      return this.$store.state.config.mode
    }
  },
  watch: {
    width(val) {
      this.commit('noteWidth', val > 210 ? val : 211)
    },
    cateId(val) {
      this.query()
    },
    refreshFlag() {
      this.query()
    }
  }
}

</script>

<style rel="stylesheet/scss">
.note-list {
  font-size: 13px;
  height: 100%;
  background: rgb(250, 250, 248);
  position: relative;
  display: flex;
  flex-direction: column;
  .note__wrap{
    flex: 1;
  }
  .note-container {
    height: 100%;
    width: 100%;
    /*border-right: 1px solid rgb(223, 223, 223);*/
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
    &>h5 {
      margin: 0 0 7px 0;
      padding: 0;
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    &>p {
      color: #333;
      margin: 0;
      padding: 0;
      font-weight: 300;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
