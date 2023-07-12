code=[];
bfcode="";
mempos=15000;
valsout=[];
function clr(){
    code=[];
    bfcode="";
    mempos=15000;
    document.getElementById("bfcode").innerHTML="";
}
function parse(){
    ic="";
    ic=document.getElementById("incode").value;
    ic=ic.split(";");
    console.log("Parsed!");
    for(i=0;i<ic.length;i++){
        ic[i]=ic[i].toUpperCase();
        if(ic[i].startsWith("INP")){
            code.push(ic[i]);
            parseInputs(parseDigits(ic[i]));
        }else if(ic[i].startsWith("OUT")){
            code.push(ic[i]);
            parseOutputs(parseDigits(ic[i]));
        }else if(ic[i].startsWith("ADD")){
            code.push(ic[i]);
            parseAdds(parseDigits(ic[i]));
        }else if(ic[i].startsWith("SUB")){
            code.push(ic[i]);
            parseSubs(parseDigits(ic[i]));
        }else if(ic[i].startsWith("MULT")){
            code.push(ic[i]);
            parseMults(parseDigits(ic[i]));
        }      
        }   
    document.getElementById("bfcode").innerHTML=bfcode;
}
function parseDigits(x){
    regx=RegExp("[-]?[0-9]+","g");
    let ind=0;
    while ((vals = regx.exec(x)) !== null){
        valsout[ind]=vals;
        ind++;
    }
    console.log("Regex eval: "+vals);
    for(j=0;j<valsout.length;j++){
        valsout[j]=Number(valsout[j])+15000;
    }
    return valsout;
}
function copy(x){
    oldmem=mempos;
    mempos=x;
    if(x==oldmem){
        return "";
    }else if (x<oldmem){
        return "<".repeat(oldmem-x);
    }else{
        return ">".repeat(x-oldmem);
    }
}
function parseInputs(x){
    bfcode = bfcode.concat(copy(x[0]),",");
}
function parseOutputs(x){
    bfcode = bfcode.concat(copy(x[0]),".");
}
function parseAdds(x){
    bfcode=bfcode.concat(copy(x[1]),"[-",copy(x[0]),"+",copy(x[1]),"]");
}
function parseSubs(x){
    bfcode=bfcode.concat(copy(x[1]),"[-",copy(x[0]),"-",copy(x[1]),"]");
}
function parseMults(x){
    bfcode=bfcode.concat(copy(x[0]),"[",copy(x[1]),"[-",copy(x[2]),"+",copy(x[3]),"+",copy(x[1]),"]",copy(x[2]),"[-",copy(x[1]),"+",copy(x[2]),"]",copy(x[0]),"-]");
}