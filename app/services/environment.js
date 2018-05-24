
let appstatic = {};

export class environment {
    static getApp = function(){
        return require('electron').remote.app;
    };
}