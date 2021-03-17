const curseforge = require("mc-curseforge-api");
const fs = require('fs');
const util = require("util");

var Outstr;
var args =process.argv;
var bool = false;
var bool2 = false;
var finish = false;
var reId;
var compatible = [];
var downloadids = [];
var i = 0;
// id
// path
// name
// version

main()

async function main(){
    await checkDependencies(args[2])
    console.log("lol")
}


async function checkDependencies(id){
    compatible = []
    await curseforge.getModFiles(id).then((files) => {
        files.forEach(getMatch)
        if (compatible[0]){
            if(compatible[0].mod_dependencies){
                i = i + 1
                compatible[0].mod_dependencies.forEach(getDependencies)
                finish = false;
            }
        }else{
            
        }    
    });
    console.log("done " + i);
    i = i - 1
}


async function getDependencies(item, index){
    bool2 = false;
    reId = item.addonId;
    downloadids.forEach(isThereId);
    if (!bool2){
        checkDependencies(item.addonId);
        downloadids.push(item.addonId);
        console.log(downloadids);
    }
}



//getModFiles(args[2],args[3],args[4])
function getModFiles(id, path, name){
    curseforge.getModFiles(id).then((files) => {
        console.log(files);
        files.forEach(getMatch);
        if (compatible[0]){
            if(compatible[0].mod_dependencies){
                compatible[0].mod_dependencies.forEach(getDependencies)
            }
            console.log("download")
            compatible[0].download(path + name);
        }
    });    
}

function getMatch(item,index){
    bool = false;
    item.minecraft_versions.forEach(isThere);
    if (bool){
        compatible.push(item);
    }
}



function isThere(item,index){
    if(!bool){
        bool = item == args[5];
    }
}

function isThereId(item,index){
    if(!bool2){
        bool2 = item == reId;
    }
}
