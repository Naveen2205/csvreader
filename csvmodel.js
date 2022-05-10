const Sequelize = require('sequelize');
var connect = null;
function connection(){
    connect = new Sequelize('csvdb', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3307
    })
    
    connect.authenticate().then(()=>{
        console.log("Connected with database")
    }).catch((error)=>{
        console.log("error = ", error);
    })

    return connect;
}

const csvModel = (connect, fileReader)=>{
    const csvtable = connect.define('csvtable', headers(fileReader));
    csvtable.sync().then(async ()=>{
        await pushData(csvtable, fileReader);
    }).catch(err=>{
        console.log("error = ", err);
    })
}


const headers = (fileReader)=>{
    let tableHeader = {};
    Object.keys(fileReader[0]).map(res=>{
        console.log("result = ", res);
        return tableHeader[res] = {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        }
    })
    console.log("tableHeader = ", tableHeader);
    return tableHeader;
}

const pushData = async (csvtable, data)=>{
    await csvtable.bulkCreate(data);
}

module.exports = {csvModel, connection};
