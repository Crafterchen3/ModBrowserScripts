const curseforge = require("mc-curseforge-api");
const fs = require('fs');
const util = require("util");

var Outstr;
var authors;
var args =process.argv;
if(args[3] == "0"){
    args[3] = "";
}
args[3] = args[3].replace("0"," ");



curseforge.getMods({ gameVersion: args[2].toString(), searchFilter: args[3].toString(), index: args[4], pageSize: args[5]}).then((mods) => {
    Outstr = "";
    mods.forEach(writeToFile);
    console.log(mods[1].authors.forEach(getAuthors));
    console.log(mods);
    console.log(mods.length);
    console.log(authors);
    fs.writeFile("Output.txt",Outstr,(err) => { 
        if (err) console.log(err); 
    });
});


function writeToFile(item, index){
    var obj_str = util.inspect(item);
    item.authors.forEach(getAuthors);
    Outstr = Outstr + "<§> \n" + item.name +
                                 ";" + item.id +
                                 ";" + authors +
                                 ";" + item.summary;

}

function getAuthors(item, index){
    var noutstr;
    if( index < 0){
        noutstr = noutstr + ", " + item.name;
    }else{
        noutstr = item.name;
    }
    authors = noutstr;
}
