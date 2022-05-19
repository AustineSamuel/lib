"use strike";


function copy(text){
  var el=$("<textarea id='toCopy'></textarea>").val(text);
   $("body").append(el);
   el=getQr("#toCopy");
   el.focus()
   el.select()
   try{
     let check=document.execCommand("copy");
     message((check ? "copied":"fail to copy "),2000,500);
   }
   catch(err){
     alert("fial to copy : "+err);
   }
   setTimeout(()=>{el.remove()},500);
 }
 

 
const message2=(text,dur=1000,fade=500)=>{//2022
  if($==null ||$==undefined)return
 $("body").append(`
 <div style=" width:100%; display:none;z-index:9999; height:100px; display:flex; align-items:center; justify-content: center;position:fixed;bottom:0;"id="messageShow">
    <span style="padding:10px 15px; max-width:70%; color:rgb(26, 20, 20);box-shadow:1px 1px 30px 0px rgb(174, 174, 174);background:rgba(238, 226, 226, 0.863);border-radius:10px; font-size:small;" id="messageText">
     ${text}</span>
  </div>
 `);
 $("body #messageShow").fadeIn(fade);
 setTimeout(() => {
   $("body #messageShow").fadeOut(fade);
     setTimeout(() => {
     $("body #messageShow").remove();
       },fade+300);
 }, dur);

}



 const message=(text,dur=1000,fade=500)=>{
   if($==null ||$==undefined)return
  $("body").append(`
  <div style=" width:100%; display:none;z-index:9999; height:100px; display:flex; align-items:center; justify-content: center;position:fixed;bottom:0;"id="messageShow">
   <span style="padding:10px 15px; max-width:70%; color:white;background:rgba(32, 32, 32, 0.863);border-radius:30px; font-size:small;" id="messageText">
    ${text}</span>
</div>
  `);
  $("body #messageShow").fadeIn(fade);
  setTimeout(() => {
    $("body #messageShow").fadeOut(fade);
      setTimeout(() => {
      $("body #messageShow").remove();
        },fade+300);
  }, dur);

}

window.hasCode=(str)=>{
  const reg=(/^[0_9A_Z]/ig)
  return reg.test(reg);
}
 const  getQr=(el)=>{
   if(document.querySelector(el)===null|| document.querySelector(el)==undefined){
   
     return null
   }
  return document.querySelector(el);
}
 const getId=(el)=>{
  if(document.getElementById(el)===null|| document.getElementById(el)==undefined){ 
  return null
 }

  return document.getElementById(el);
}
 const getExtn=(file,test=false)=>{
const  fileExtn=file.slice(file.lastIndexOf("."),file.length).toLowerCase();
if(test===false){
  return fileExtn;
}
else{
return test.includes(fileExtn);
}
}



 const clickImageViewer=(parentEL="body")=>{//jquery
let count=false;
if($==undefined||$==null)return

$("img").click(function(){
const src=$(this).attr("src").toString();
$(parentEL).prepend(`<div id="v112" style='
  width:100%; height:100%; position:fixed; 
  background:rgba(0,0,0,0.4);display:flex; 
  z-index:9999;
  align-items:center; justify-content:center;'><img src="${src}" style="width:90%; height:90%; border-radius:10px;">
  </div>
`);
$("#v112").click(function(){
  $(this).fadeOut(200);
setTimeout(() => {
  $("#v112").remove();
},500);
count=false;
  });
message("click screen to close Image")
});
}

 const download=(link)=>{
  let location=window.location.href.slice(0,window.location.href.lastIndexOf("/"));
  let path=location+"/"+link;
  let a=document.createElement("a");
  a.href=path;
  a.target="_blank";
  a.download=link;
  a.click();
  }
const warning2=(heading="Wrong Command", content="you click a wrong button",button1="Cancel",button2="Ok",callBack=null,back=null)=>{
  $("body").append(`<div id="warning"
  style="overflow:auto;width:100%;height:100%;display:flex; position:fixed; justify-content:center; align-items:center; background:rgba(255, 255, 255, 0.316);">
   <div style="height:auto; width:80%; padding:20px 20px; border-radius:10px;max-height:700px;background:rgb(252, 252, 252);margin:0 auto;box-shadow:1px 1px 10px 0px rgb(197, 197, 197),1px 1px 40px 0px rgb(197, 197, 197);" class="w3-animate-zoom">
    <header style="text-align:center; color:rgb(17, 18, 19); font-size:x-large;">${heading}</header>
    <div id="content" style="color:rgb(26, 25, 26); font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:small;">${content}</div>
  <div style="display:flex; justify-content:space-around;padding:9px;"><button id="b1" style="width:100px; padding:5px; background:rgb(250, 0, 250);">${button1}</button><button  id="b2" style="width:100px; padding:5px; background:rgb(21, 86, 252);color:white !important">${button2}</button></div>
  </div></div>`);
  
  $("#b1").click(function(){
   // $("#b1").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() => {
  document.querySelector("#warning").remove();
  back != null ? back() : "" ;
  },500);
  });
  
  $("#b2").click(function(){
  //   $("#b2").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() =>{ 
  document.querySelector("#warning").remove();
  if(callBack!=null){
  callBack();
  }
  },500);
  });
  

}


 const  warning=(heading="Wrong Command", content="you click a wrong button",button1="Cancel",button2="Ok",callBack=null,back=null)=>{
  $("body").append(` <div id="warning"
  style="overflow:auto;width:100%;height:100%;display:flex; position:fixed; justify-content:center; align-items:center; background:rgb(0,0,0,0.4);">
   <div style="height:auto; width:80%; padding:20px 20px; border-radius:10px;max-height:700px;background:rgb(20, 17, 31);margin:0 auto;box-shadow:1px 1px 10px 0px black;"class="w3-animate-zoom">
    <header style="text-align:center; color:rgb(255, 0,94); font-size:x-large;">${heading}</header>
    <div id="content" style="color:rgb(207, 202, 250); font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:small;">${content}</div>
  <div style="display:flex; justify-content:space-around;padding:9px;"><button id="b1" style="width:100px; padding:5px; background:rgb(255, 0, 85);">${button1}</button><button  id="b2" style="width:100px; padding:5px; background:rgb(71, 21, 252);color:white !important">${button2}</button></div>
  </div></div>`);
  
  $("#b1").click(function(){
   // $("#b1").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() => {
  document.querySelector("#warning").remove();
  back != null ? back() : "" ;
  },500);
  });
  
  $("#b2").click(function(){
  //   $("#b2").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() =>{ 
  document.querySelector("#warning").remove();
  if(callBack!=null){
  callBack();
  }
  },500);
  });
  

}

 const href=(link,target="_self")=>{
  if(link.lastIndexOf(".") > -1){
  let a=document.createElement("a");
  a.href=link;
  a.target=target;
  a.click();
   message("loading...",3000,300)
  }
  else{
    message("link fail")
  }
  }


  
 const Ahref=(link,target="_self")=>{
  let a=document.createElement("a");
  a.href=link;
  a.target=target;
  a.click();
   message("loading new content...",3000,300)
  }


   const imageReader=(input,imageSrc,callBack=null,bg=false,extn=[".jpg",".jpeg",".png"])=>{
    var file=input.val();
    file=file.slice(file.lastIndexOf("."),file.length).toLowerCase();
    if(extn.includes(file)){
    reader=new FileReader();
    reader.onload=(function(e){
   !bg ? imageSrc.attr("src",e.target.result) : imageSrc.css("background-image","url('"+e.target.result+"')");
 
   callBack != null ? callBack(e.target.result) : "" ;  
  });
    reader.readAsDataURL(input[0].files[0]);
    }//end if etn valid
    else{
      message("please use image with <b>.jpg .png .jpeg</b> extension",4000,300);
    }  
  }

   const replaceBrWithNL=(text)=>{
    let textArr=text.split("<br>");
      let newText="";
    textArr.forEach((e)=>{
      newText+=e+"\n";
    })
    return newText;
}

const getNumbers=(text)=>{
  return text.replace(/[\D]/g,"");
}
const getText=(text)=>{
  return text.replace(/[^\D]/g,"");
}

   const replaceNlWithBr=(text)=>{
    let textArr=text.split('\n');
      let newText="";
    textArr.forEach((e)=>{
      newText+=e+"<br/>";
    })
    return newText;
}


   const removeSpace=(text)=>{
    let textArr=text.split(" ");
    let newText="";
    textArr.forEach((e)=>{
   newText+=e;
    });
    return newText;
}


 const filterNumber=(text="",characters=["\n"," "])=>{
  let filtered="";
  let i;
  for(i=0;i<text.length;i++){
    let e=text[i];
    if(!characters.includes(e)){
      filtered+=""+e;
      }
    }
    return filtered;
  }
  
   const textToNameFormat=(text)=>{
     if(text===undefined || text===null)return
  const name=text.split(" ");
  var newName="";
  name.forEach((e)=>{
    newName+=" "+e.charAt(0).toUpperCase()+e.slice(1,e.length).toLowerCase();
  })
  return newName;
  }
const importScript=(path)=>{
  return useScript(path)
}
  const useScript=(scriptSrc=null)=>{
try{
  if(scriptSrc==null){
    throw "unable to add script file : scriptSrc must contain a valid script URI";
    }
    const script=document.createElement("script")
    script.src=scriptSrc
    document.body.appendChild(script);
    return true;
}
catch(err){
  console.error(err);
  if(err=="")return true;
  else return true;
}
  }


  const importCss=(path)=>{
    return useCss(path);
  }
  const useCss=(href=null)=>{
    href=href.toLowerCase();
    try{
      if(href==null||getExtn(href)!==".css"){
        throw "unable to add css file : href must contain a valid css URI";
        }
        const link=document.createElement("link")
        link.href=href
        link.rel="stylesheet";
        document.querySelector("head").appendChild(link);
        return true;
    }
    catch(err){
      console.error(err);
      if(err=="")return true;
      else return true;
    }
      }
    
     
  const filter=(text,chr="<br>")=>{
    text=text.split(chr);
    let filtered="";
    text.forEach((e)=>{
      filtered+=e;
    });
    return filtered;
  }

  const replaceAll=(text,text1,text2)=>{
    text=text.split(text1);
    let newText="";
    text.forEach((e)=>{
      newText+=e+text2;
    })
  }
  window.detectMob=() =>{
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}//end function


const storeObjectToLocalStorage=(obj)=>{
  const store=Object.assign(window.localStorage,obj) ? true : false
  return store
}


  const action=(elName,eventType,func)=>{
    getQr(elName).addEventListener(eventType,func);
  }

  const setEvent=(elName,eventType,func)=>{
    return action(elName,eventType,func)
  }

  const actionAll=(elName,eventType,func)=>{
  const el= document.querySelectorAll(elName);
  for(let i =0 ;i<el.length;i++){
    el[i].addEventListener(eventType,func);
  }
  }

  const setEventAll=(elName,eventType,func)=>{
    return actionAll(elName,eventType,func);
  }


  const setCss=(elName,property,value)=>{
  //getQr(elName).
  }
  
  function toCamelCase(str){
    let output="";
    str.split(" ").map((e)=>{
      output+=e.charAt(0).toUpperCase()+""+e.slice(1,e.length);
    })
    return output;
  } 
function toCamelCaseOut(str){
  let funcOutput="";
  const arrOfLowerCases=str.split(/[A-Z]/g).filter(e=>e!="");
  const arrOfUpperCases=str.match(/[A-Z]/g);
  arrOfLowerCases.map((e,i)=>{
    funcOutput+=(i!=0 ? " ":"")+arrOfUpperCases[i].toLowerCase()+""+e;
  });
  return funcOutput;
}

///this code will append font awesome to your code
const useIcons=()=>{
let link=document.createElement("link");
link.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
link.rel="stylesheet";
getQr("head").appendChild(link);
}
useIcons()///if you have fontAwesome link on your html already. you can comment this function


const useFontAwesome=()=>{
  return useIcons();
}


const takeInput=(placeholder="write here",callBack=null,content="")=>{//simple html mostlyuse for androids
  if(getQr("takeInputVal")!=null)return
  const div=document.createElement("div");
  div.style=`box-shadow:1px 1px 10px 0px grey; width:100%;background:white;position:fixed;
  bottom:0;`
  div.innerHTML=`<input value="${content}" id="takeInputVal" style="border-right:1px solid rgb(31, 37, 63); width:75%;padding:16px 5px;height:100%; background:rgb(242, 242, 247);" placeholder="${placeholder}">
  <button id="takeInputBtn" style="width:20%;height:100%;background:black;color:white; border-radius:4px;" >Done</button>
  `
  getQr("body").appendChild(div);
$("#takeInputVal").focus();
  action("#takeInputBtn","click",()=>{
callBack(getQr("#takeInputVal").value);
div.remove();
  })
}


class Validate{//Class for validating emails
  text(input){
    const rgx=/[^a-zA-Z0-9]/g;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  email(input){
     const rgx=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
    }
  phoneNumber(input){
    const rgx=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  code(input){
    const rgx=/[0-9]{6}/;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  number(input){
    const rgx=/[0-9]{1}/;
    if(rgx.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  password(input,length=6){
    //const rgx=/[1-9a-zA-Z]/;
    if(/[0-9]/.test(input) && /[a-z]/.test(input) &&  /[A-Z]/.test(input)){
      return true;
    }
    else{
      return false;
    }
  }
  passwordVarify(input1,input2){
    if(input1.toString()==input2.toString()&&input1!=""){
      return true;
    }
    else{
      return false;
    }
  }
  image(inputName,elemt=null){//use imageReader instead
    let extn=inputName.slice(inputName.lastIndexOf("."),inputName.length);
    extn=extn.toLowerCase();
    if(extn==".jpg"||extn==".jpeg"||extn==".png"||extn==".gif"){
     if(elemt!=null){
       let respond=null;
      const file=new FileReader();
       file.onload=(evnt)=>{
        respond=evnt.target.result;
        if(imageData !==undefined && checkOnload !==undefined){
        imageData=respond;
        checkOnload=true;
      }
      else{
        console.log(imageData);
        console.log(checkOnload);
alert("message from smartValidator.js : you  must declear imageData=null variable and checkOnload=false varible to use this validator");
      }
    }//end file reader
      file.readAsDataURL(elemt[0].files[0]);
      //return respond : is null here
      return true ///no option
    }
    else{
      return true;
    }
    }
    else{
      return false;
    }
  }
}


const replaceWord=(text,word,wordToReplace)=>{//replace word with another word
  text=text.split(word);
  let newText=""
  text.forEach((e,i)=>{
newText+=e+" "+wordToReplace;
  });
  return newText.slice(0,-(wordToReplace).length);
}

setTimeout(() => {//seting cssLibrary properties
if(typeof $!="undefined" && typeof $!="null"){
  $("#scrollY").css("max-height",screen.height);
  $("#scrollX").css("max-width",screen.width);
  }
  else{
    getQr("#scrollY").style.maxHieght=screen.height
    getQr("#scrollX").style.maxWidth=screen.width;
  }
},0);


///jquery realtime update

class JqueryUpdt{
  constructor(rule){
    this.rule=rule
  }

  setProxy(limit=null){
    const proxy=new Proxy($);//continue tomorrow
  }

  
}




function useSweetAlert2(){
  return $("head").append(`
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.1.9/sweetalert2.min.css" integrity="sha512-cyIcYOviYhF0bHIhzXWJQ/7xnaBuIIOecYoPZBgJHQKFPo+TOBA+BY1EnTpmM8yKDU4ZdI3UGccNGCEUdfbBqw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.1.9/sweetalert2.all.min.js" integrity="sha512-IZ95TbsPTDl3eT5GwqTJH/14xZ2feLEGJRbII6bRKtE/HC6x3N4cHye7yyikadgAsuiddCY2+6gMntpVHL1gHw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
`);
}

//"https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js

function useSweetAlert(){
  return useScript("https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js");
}


function playSound(src){
  const audio=new Audio();
  audio.src=src;
  audio.onload=()=>{
    console.log("loaded");
  }
  audio.play();
}

function speak(text){
  if("speechSynthesis" in window || speechSynthesis){ // Checking If speechSynthesis Is Supported.
    T2S = window.speechSynthesis || speechSynthesis; // Storing speechSynthesis API as variable - T2S
    var utter = new SpeechSynthesisUtterance(text); // To Make The Utterance
    T2S.speak(utter); // To Speak The Utterance
}
}

function scrollIframes(){
const iframe=document.querySelectorAll("iframe");
iframe.forEach((e)=>{
e.style.height=e.scrollHieght;
});
}
