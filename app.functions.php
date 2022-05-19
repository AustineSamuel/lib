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


function findNumbers($string){
return preg_replace("~\D~","",$string);
}

function getTable($tableName,$conditions=1){
global $con;
if(connect()){
  $json=[];
  $select=$con->query("SELECT * FROM `$tableName` where $conditions");
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
if($userQuery){
if($userQuery->num_rows>0){
$res=$userQuery->fetch_assoc();
$res["passoword"]=null;
return $res;
}
else{
  return false;
}
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



function writeFileToFile($fileName,$data){
  if(file_exists($fileName)){
$f=fopen($fileName,"a");
fwrite($f,$data);
fclose($f);
return true;
  }
  else{
    exit($fileName. " not exist");
    return false;
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

function getNumbers($string){
return ((int) preg_replace("/[^0-9.]/", "", $string));
}


function getResNames(){
  global$con;
  $getFromDB=$con->query("SELECT name FROM `allRestaurantslist`");
  if($getFromDB){
return $getFromDB->fetch_array();
}
return [];
}


function getToken($userId,$userEmail){
  global $con;
  $sql=$con->query("SELECT token from `allUsers` where id=$userId and email='$userEmail'");
  if($sql){
    return $sql->fetch_assoc();
  }
  return null;
}


function setToken($userId,$userEmail,$token){
  global $con;
  $sql=$con->query("UPDATE `allUsers` SET token='$token' where id=$userId and email='$userEmail'");
  if($sql){
    return  true;
  }
  return false;
}


function addView($resId){
  global $con;
  //get prev value
$prevValue=$con->query("SELECT `views` from `allRestaurantsRecords` where resId='$resId'");
if($prevValue){
  $prevValue=$prevValue->fetch_array()[0];
}
else{
  print_r($prevValue);
}
$nowValue=$prevValue+1;
//logToFile("../developer/success.txt",$nowValue);
//save back the value..
$saveValue=$con->query("UPDATE `allRestaurantsRecords` set views=$nowValue where resId='$resId'");
if($saveValue){
return true;
}
else{
  return false;
}
//end function
}


function addOrder($resId){
  global $con;
  //get prev value
$prevValue=$con->query("SELECT `orders` from `allRestaurantsRecords` where resId='$resId'")->fetch_array()[0];

$nowValue=$prevValue+1;
//echo $nowValue;
//save back the value..
$saveValue=$con->query("UPDATE `allRestaurantsRecords` set orders=$nowValue where resId='$resId'");
if($saveValue){
return true;
}
else{
  return false;
}
//end function
}
function addDelivered($resId){
  global $con;
  //get prev value
$prevValue=$con->query("SELECT `delivered` from `allRestaurantsRecords` where resId='$resId'")->fetch_array()[0];

$nowValue=$prevValue+1;
//echo $nowValue;
//save back the value..
$saveValue=$con->query("UPDATE `allRestaurantsRecords` set delivered=$nowValue where resId='$resId'");
if($saveValue){
return true;
}
else{
  return false;
}
//end function
}

function setResToken($userId,$userEmail,$token){
  global $con;
  $sql=$con->query("UPDATE `allRestaurantsList` SET token='$token' where id=$userId and email='$userEmail'");
  if($sql){
    return  true;
  }
  return false;
}


function sendFcmNotification($token,$notification=[
  "body" => "order successfully delivered!",
  "title" => "AVA food succesuly delivered",
  "image"=>"https://austinesamuelcodes.000webhostapp.com/images/04ba1e0b5479378.jpeg",
  "icon" => "https://austinesamuelcodes.000webhostapp.com/images/web/darkIcon.jpg",
  "fcm_options"=>[
      "link"=>"https://austinesamuelcodes.000webhostapp.com/app.html"
  ]
  ]){

  $json_data=[
    "to" =>trim($token),
    "notification" => $notification,
    "data" =>$notification,
    ];
  
  
  
  
  $data = json_encode($json_data);
  //FCM API end-point
  $url = 'https://fcm.googleapis.com/fcm/send';
  //api_key in Firebase Console -> Project Settings -> CLOUD MESSAGING -> Server key
  $server_key = 'AAAACEUA_gM:APA91bFsbLg4rwSUeAbUjb86DKVoujLG0zlJ-teM1UvFPzRDBFrIZK8d24Z8c5SSNAGKTq2UGIsAX6Pux4eGQpZmaU6EvUBMgEubaIOCPrRaByVazbj07g-zxM2pqv2bsNoH3PiHmFJg';
  //header with content_type api key
  $headers = array(
      'Content-Type:application/json',
      'Authorization:key='.$server_key
  );
  //CURL request to route notification to FCM connection server (provided by Google)
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  $result = curl_exec($ch);
  if ($result === FALSE) {
      die('Oops! FCM Send Error: ' . curl_error($ch));
  }
  logToFIle("../developer/success.txt",$result);
  
  curl_close($ch);
  }
  
  
function getSqlItem($tableName,$item,$condision="1"){
global $con;
$save=$con->query("SELECT * FROM `$tableName` where $condision");
if($save){
return $save->fetch_assoc();
}
else{
  return false;
}

}

function restaurantNotifyUsers($address,$restaurant){
global $con;
$allUsers=getTable("allUsers","address like '%$address%'");

  foreach($allUsers as $customer){
$token=trim($customer["token"]);
$notification=[
  "body" => $restaurant["name"]."are on avaSoftware !",
  "title" => "You might know ".$restaurant["name"]." in ".$address." Are on avaFood click to see what they have upload so far !",
  "image"=>"https://austinesamuelcodes.000webhostapp.com/images/".$restaurant["image"],
  "icon" => "https://austinesamuelcodes.000webhostapp.com/images/web/darkIcon.jpg",
  "fcm_options"=>[
      "link"=>"https://austinesamuelcodes.000webhostapp.com/index.html"
  ]
  ];
   sendFcmNotification($token,$notification);

  }

//fcm message
}



function toCamelCase($name,$capitalize=false){
  $name=str_replace(' ','-',$name);
  $str=str_replace("-","",ucwords($name,""));
  if(!$capitalize){
$str=lcfirst($str);
  }
  return $str;
}


function toCamelCase2($str){
  $output="";
  $strArr=explode(" ",$str);
  foreach($strArr as $myStr){
    $output.=strToUpper(substr($myStr,0,1))."".substr($myStr,1,strlen($myStr));
  }
  return $output;
  }
function toCamelCaseOut($name){
  $newText="";
  for ($i=0; $i < strlen($name); $i++) { 
    if(preg_match('/[A-Z]/',$name[$i])){
      $newText.=(isset($name[$i-1]) ? " ":"").strtolower($name[$i]);
      continue;
    }
  }
  return $newText;
  }

  function writeFile($name,$content){
    $file=fopen($name,"w+");
    $exec=fwrite($file,$content);
    fclose($file);
    return $exec;
  }

 function  tableExist($tableName){
global $con;
$sqlArr=$con->query("SHOW TABLES LIKE '%$tableName%'")->fetch_array();

$sqlArr= $sqlArr == NULL ? []:$sqlArr;
if($sqlArr==NULL){
 // echo "null<br> ".var_dump($sqlArr);
  $sqlArr=[];
}
//echo $sqlArr==null;
$compare=(count($sqlArr) > 0 ?  true : false);
return $compare;
 }
