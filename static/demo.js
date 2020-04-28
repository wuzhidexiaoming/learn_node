function checkType(target){
    return Object.prototype.toString.call(target).slice(8,-1)
}
function deepClone(target){
    if(checkType(target)!=='Object'){
        return new TypeError("类型错误")
    }
    for(let key in target){

    }
}
