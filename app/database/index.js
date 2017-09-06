require('../utils/date')();
const sqlite3 = require('sqlite3'),
    path = require('path'),
    {app} = require('electron');


const db = new sqlite3.Database(path.resolve(app.getPath('userData'), 'database.sqlite3'));
// console.info(path.resolve(app.getPath('userData'), 'database.sqlite3'))
// const new Promise = function (callback) {
//     return new Promise(function (resolve, reject) {
//         callback(resolve, reject)
//     })
// };
const createCates = `
CREATE TABLE "cates" (
     "id" INTEGER PRIMARY KEY AUTOINCREMENT,
     "title" VARCHAR(40,0),
     "create_date" VARCHAR(30,0),
     "last_update_date" VARCHAR(30,0)
);`;
const createNotes = `
CREATE TABLE "notes" (
     "id" INTEGER PRIMARY KEY AUTOINCREMENT,
     "cateId" INTEGER,
     "title" VARCHAR(40,0),
     "description"VARCHAR(130,0),
     "create_date" VARCHAR(30,0),
     "last_update_date" VARCHAR(30,0),
     "status" VARCHAR(2,0) default 0 
);`;
const createNoteDetail = `
CREATE TABLE "note_detail" (
	 "text" blob,
	 "id" INTEGER PRIMARY KEY AUTOINCREMENT,
	 "parent_id" INTEGER,
	 "create_date" VARCHAR(30,0),
     "last_update_date" VARCHAR(30,0)
);
`;
let inited = false;
const createTable = async function (sql) {
    return new Promise(function (resolve, reject) {
        db.run(sql,
            function (err) {
                if (err) {
                    if (err.errno == 1) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(true);
                }
            });
    });
};
const init = async function () {
    if (inited) return true;
    try {
        await createTable(createCates);
        await createTable(createNotes);
        await createTable(createNoteDetail);
        inited = true;
    } catch (e) {
        inited = false;
    }
    return inited;
};

const notes = {
    query: async function ({clause = '1 = 1', params = []}) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.all(//and status = '0'
                `select * from notes where ${clause} order by last_update_date desc`,
                params,
                function (err, row) {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(row)
                    }
                });
        });
    },
    add: async function (data) {
        let inited = await init();
        if (!inited) return null;
        let addNote = ()=>{
            return new Promise(function (resolve, reject) {
                db.run(
                    `INSERT INTO 
                    notes (id,title,cateId, description, create_date,last_update_date) 
                    VALUES (?,?, ?, ?, ?,?);`, [null, data.title, data.cateId, data.description || '', new Date().Format('YYYY-MM-dd HH:mm:ss'), new Date().Format('YYYY-MM-dd HH:mm:ss')],
                    function (error) {
                        if (error) {
                            console.log('FAIL on add ' + error);
                            reject(error);
                        } else {
                            db.all(`select last_insert_rowid() as id from notes limit 1;`, function (error, data) {
                                if (error) {
                                    console.log('FAIL on add ' + error);
                                    reject(error);
                                } else {
                                    resolve(data[0].id)
                                }
                            });
                        }
                    }
                );
            });
        };
        return new Promise(function (resolve, reject) {
            addNote().then(id=> {
                note_detail.add(id)
                           .then(()=> {
                               resolve(id);
                           })
                           .catch(()=> {
                               reject(null)
                           })
            })
        });
    },
    update: async function ({title,description,id}) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.run(
                `update notes set title = ? , description = ? , last_update_date = ? where id = ? `,
                [title,description,new Date().Format('YYYY-MM-dd HH:mm:ss'),id],
                function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(arguments);
                    }
                })
        });
    },
    updateCate: async function ({id,cate_id}) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.run(
                `update notes set cateId = ? where id = ? `,
                [cate_id,id],
                function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(arguments);
                    }
                })
        });
    },
    delete:async function({id}){
        let inited = await init();
        if (!inited) return null;
        let deleteSelf = ()=>{
            return new Promise((resolve,reject)=>{
                db.run('delete from notes where id = ? ;',
                    [id],
                    error=>{
                        if (error) {
                            reject(error);
                        } else {
                            resolve({success: true});
                        }
                    })
            });
        }
        return new Promise((resolve,reject)=>{
            deleteSelf().then(()=>{
                note_detail.delete({parent_id:id})
                    .then(()=>{
                        resolve({success: true})
                    })
                    .catch(()=>{
                        reject(null)
                    })
            })
        })
    }
};

const note_detail = {
    query: async function ({parent_id}) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.all(//and status = '0'
                `select * from note_detail where parent_id = ? limit 1;`,
                [parent_id],
                function (err, row) {
                    if (err) {
                        console.info(err)
                        resolve(null)
                    } else {
                        resolve(row[0])
                    }
                });
        });
    },
    update: async function ({text, parent_id,title,description}) {
        let inited = await init();
        if (!inited) return null;
        const update = ()=>{
            return new Promise(function (resolve, reject) {
                db.run(
                    `update note_detail set text = ? where parent_id = ? `, [text, parent_id],
                    function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({success: true});
                        }
                    })
            });
        };
        return new Promise((resolve,reject)=>{
            update().then(()=>{
                notes.update({title,description,id:parent_id}).then(data=>{
                    resolve(data)
                }).catch(()=>{
                    reject(null)
                })
            })
        });

    },
    add: async function (parent_id) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.serialize(function () {
                db.run(
                    `INSERT INTO 
                    note_detail (id,text, parent_id,create_date,last_update_date) 
                    VALUES (?,?,?, ?, ?);`, [null, '# 新建文档', parent_id, new Date().Format('YYYY-MM-dd HH:mm:ss'), new Date().Format('YYYY-MM-dd HH:mm:ss')],
                    function (error) {
                        if (error) {
                            console.log('FAIL on add ' + error);
                            reject(error);
                        } else {
                            resolve({success: true})
                        }
                    }
                );
            });

        });
    },
    delete: async function ({parent_id}) {
        let inited = await init();
        if (!inited) return null;
        return new Promise((resolve,reject)=>{
            db.run('delete from note_detail where parent_id = ? ;',
                [parent_id],
                error=>{
                    if (error) {
                        reject(error);
                    } else {
                        resolve({success: true});
                    }
                })
        });
    }
};

const cates = {
    query: async function ({clause = '1 = 1', params = []}) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.all(//and status = '0'
                `select * from cates where ${clause} `,
                params,
                function (err, row) {
                    if (err) {
                        console.info(err)
                        resolve(null)
                    } else {
                        resolve(row)
                    }
                });
        });
    },
    add: async function (data) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.serialize(function () {
                db.run(
                    `INSERT INTO 
                    cates (id,title, create_date,last_update_date) 
                    VALUES (?,?, ?, ?);`, [null, data.title, new Date().Format('YYYY-MM-dd HH:mm:ss'), new Date().Format('YYYY-MM-dd HH:mm:ss')],
                    function (error) {
                        if (error) {
                            console.log('FAIL on add ' + error);
                            reject(error);
                        } else {
                            db.all(`select last_insert_rowid() as id from cates limit 1;`, function (error, data) {
                                if (error) {
                                    console.log('FAIL on add ' + error);
                                    reject(error);
                                } else {
                                    resolve(data[0].id)
                                }
                            });
                        }
                    }
                );
            });

        });
    },
    update: async function (cate) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.run(
                `update cates set title = ? where id = ? `, [cate.title, cate.id],
                function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({success: true});
                    }
                })
        });
    },
    delete: async function (id) {
        let inited = await init();
        if (!inited) return null;
        return new Promise(function (resolve, reject) {
            db.run(
                `delete from  cates where id = ? `, [id],
                function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({success: true});
                    }
                })
        });
    }
};
module.exports = {
    notes,
    note_detail,
    cates
};
