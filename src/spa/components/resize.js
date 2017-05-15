export default {
    computed:{
        isWin(){
            return this.$store.state.config.os == 'win';
        }
    },
    methods: {
        handleMouseMove(event,ref){
            let target = event.target;
            while (target && target !== this.$refs[ref]) {
                target = target.parentNode;
            }
            let rect = target.getBoundingClientRect();
            const bodyStyle = document.body.style;
            if(this.resize.in ) return;
            if (rect.width > 12 && rect.right - event.pageX < 12 && rect.right - event.pageX >1) {
                bodyStyle.cursor = 'col-resize';
                this.resize.can = true;
                this.resize.trigger = this.$refs[ref];
            } else if (!this.viewModel.inResize) {
                bodyStyle.cursor = '';
                this.resize.can = false;
                this.resize.trigger = null;
            }
        },
        handleMouseDown(event,cb){
            if (this.resize.can && !this.resize.in) {
                this.resize.in = true;
                const rect = this.resize.trigger.getBoundingClientRect();
                this.dragState = {
                    startMouseLeft: event.clientX,
                    startWidth: rect.right - rect.left
                };
                this.resize.trigger.querySelector('._container').style.overflowY = 'hidden';

                const handleMouseUp = (event)=>{
                    if (this.resize.in) {
                        var width = this.resize.trigger.style.width;
                        document.body.style.cursor = '';
                        if(this.isWin) this.resize.trigger.querySelector('._container').style.overflowY = 'scroll';
                        this.resize.in = false;
                        this[cb](parseInt(width.replace(/px$/gi,'')));
                    }
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                };
                const handleMouseMove = (event)=>{
                    const deltaLeft = event.clientX - this.dragState.startMouseLeft;
                    var width = this.dragState.startWidth + deltaLeft;
                    let stop = false;
                    let minWidth = this.resize.min;
                    if(width < minWidth-1){
                        width = minWidth;
                        stop = true;
                    }
                    if(this.isWin)this.resize.trigger.style.width = Math.min(width,295)+'px';

                    if(stop){
                        document.body.style.cursor = 'e-resize'
                    }else{
                        document.body.style.cursor = 'col-resize'
                    }
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
        }
    }
}