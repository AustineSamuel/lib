<?php

function connect(){
  global $con; 
if($con){
   return true;
}
else{
  return false;
}
}

function getItem($id,$table){
  if(connect()){
    global $con;
$get=$con->query("SELECT * FROM `$table` where id=$id");
if($get){
  if($get->num_rows>0){
    return $get->fetch_assoc();
    }
  }
}
}


function getTable($tableName){
global $con;
if(connect()){
  $json=[];
  $select=$con->query("SELECT * FROM `$tableName`");
  if($select){
  if($select->num_rows>0){
    while ($row=$select->fetch_assoc()) {
     array_push($json,$row);
    }
  } 
}
else{
logToFile("../developer/Error.txt","\n\n\n".__FUNCTION__."fail to get table line".__LINE__."\n file ".__FILE__."sql said".$con->error);
}
  return $json;

}
}

function rndName($len){
  $Rname=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  $mainName="";
  for ($i=0; $i < $len; $i++) { 
    $mainName.=$Rname[rand(0,count($Rname)-1)];
  }
return $mainName."";
}

function get_last_id($tableName){
 global $con;
$select=$con->query("SELECT MAX(id) FROM `$tableName`");
if($select){
  return $select->fetch_array()[0];
}
}

function uploadImage($name=array(),$surportedExtn=["image/jpeg","image/jpg","image/png","image/jpg","image/gif"]){
  if($name["error"]==0){
  $tmp=$name["tmp_name"];
  $type=trim(mime_content_type($tmp));
  $fileName=$name["name"];
$extn=strtolower(substr($fileName,strrpos($fileName,"."),strlen($fileName)));
if(in_array($type,$surportedExtn)){
  $imageName=substr(trim(md5(rndName(30))),0,15);
 $save=!file_exists("../images/".$imageName."".$extn) ? move_uploaded_file($tmp,"../images/".$imageName."".$extn):false;
 if($save){
   return $imageName."".$extn;
 }
 else{
   return false;
 }
 }
 else{
  return "notSuported";
}
}
}

function getUser($email){
global $con;
$userQuery=$con->query("SELECT * FROM allUsers where email='$email'");
if($userQuery->num_rows>0){
$user=$userQuery->fetch_assoc();
$user["password"]=null;
return $user;
}
else{
  return false;
}
}

function getRestarant($email){
  global $con;
$userQuery=$con->query("SELECT * FROM allRestaurantsList  where email='$email'");
if($userQuery->num_rows>0){
$res=$userQuery->fetch_assoc();
$res["passoword"]=null;
return $res;
}
else{
  return false;
}
}

function validateEmail($email){
  $email=filter_var($_POST["email"],FILTER_SANITIZE_EMAIL);
  $email=filter_var($email,FILTER_VALIDATE_EMAIL);
return $email;  
}
function logToFile($fileName,$data){
  if(file_exists($fileName)){
$f=fopen($fileName,"a");
fwrite($f,$data);
fclose($f);
  }
  else{
    exit($fileName. " not exist");
  }
}

//function }

function deleteFile($name){
  if(file_exists($name)){
    unlink($name);
    return "deleted";
  }
  else{
    return "not exist";
  }
}

function execute($query){
  
}
