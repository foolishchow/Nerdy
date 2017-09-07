const toMarkdown = require('to-markdown');
module.exports = (value)=>{
    return toMarkdown(value, { 
        gfm: true ,
        converters:[{
            filter(node){
                return node.nodeName == 'FIGURE'
            },
            replacement(content,node){
                let language = node.className.replace(/^\s*highlight|\s*$/,'');
                let codes = node.querySelector('td.code');
                let code = '```'+language+'  \n';
                codes.querySelectorAll('.line').forEach(e=>code+=e.innerText+'\n');
                code+='\n```'
                return code;
            }
        },
        {
            filter:'div',
            replacement(content,node){
                return content;
            }
        }]
    })
}