// import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";
import * as applicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "ui/dialogs";
import { android, AndroidApplication } from "tns-core-modules/application/application";
let Firebase = require("nativescript-plugin-firebase-common").Firebase;
let firebase = Firebase.createNew({
    url: 'https://velix-mobile.firebaseio.com'
    // persist: false // turn off offline disk persistence
  });
let logs=[];
let requests=[];
let eventsWorking:Boolean=false;
let events=[];
@Injectable()
export class DatabaseService {
  constructor(
    private router:RouterExtensions
  ) {}

  // private requestsUpToDate=new BehaviorSubject<Boolean>(true);
  // cast = this.requestsUpToDate.asObservable();
  gotDataFlag:Boolean=false;
  userID:Number;
  
  instantiateListeners(userData){
    if(eventsWorking){
      return;
    }
    console.log("INSTANTIATING FIREBASE LISTENERS!");
    
    // console.log("userID: "+userID);
    let userRef=firebase.child("users/"+userData.userID);
    let reqRef=userRef.child("authRequests");
    let reqLogRef=userRef.child("authRequestLogs");
    
    /* let tmpRef=firebase.child("users");
    firebase.query(firebase,"users",{
      orderBy:{
        type: Firebase.QueryOrderByType.CHILD,
        value: "aa@aa.aa"
      },
      range: {
        type: Firebase.QueryRangeType.EQUAL_TO,
        value: "aa@aa.aa"
      }
    }).then(()=>{
      console.log("DONE QUERY");
    }); */
    eventsWorking=true;
    let event=reqRef.on("child_changed", (evt) => {
      // UPDATED REQUEST
      console.log("UPDATED REQUEST");
      console.dir(evt.val());
      for (let i = 0; i < requests.length; i++) {
        if(evt.key()==requests[i].targetUser){
          requests[i]={
            timestamp: evt.val().timestamp,
            status: evt.val().status,
            targetUser: evt.key()
          };
          break;
        }
      }
    });
    events.push(event);
    event=reqRef.on("child_added", (evt) => {
      // console.dir(event.val());
      // console.log("GOT A REQUEST");
      let tmp:any={
        timestamp: evt.val().timestamp,
        status: evt.val().status,
        targetUser: evt.key()
      }
      requests.push(tmp);
    });
    events.push(event);
    event=reqLogRef.on("child_added", (evt) => {
      /*
      first digit-> activity, second digit-> user (initial or final)
      10->REQUEST_INITIATED,
      20->RECIEVED_AUTHORIZATION,
      30->RECIEVED_REJECTION
      11->REQUEST_RECIEVED,
      21->GIVEN_AUTHORIZATION,
      31->GIVEN_REJECTION
      */
      let tmp:any={
        timestamp: evt.val().timestamp,
        type: evt.val().type,
        targetUser: evt.val().targetUser
      }
      switch(tmp.type){
        case 10: tmp.message="Request initiated for user with Velix.ID: ";
        break;
        case 11: tmp.message="Request initiated by user with Velix.ID: ";
        break;
        case 20: tmp.message="Recieved authorization from user with Velix.ID: ";
        break;
        case 21: tmp.message="Given authority to user with Velix.ID: ";
        break;
        case 30: tmp.message="Request declined by user with Velix.ID: ";
        break;
        case 31: tmp.message="Declined Request of user with Velix.ID: ";
        break; 
      }
      // console.dir(tmp);
      // console.log("GOT A LOG");
      logs.push(tmp);
    });
    events.push(event);
    console.log(events.length);
  }
  
  shutdownListeners(){
    return new Promise((resolve) => {
      firebase.off("child_changed",events[0]);
      firebase.off("child_added",events[1]);
      firebase.off("child_added",events[2]);
      events=[];
      resolve(true);
    });
  }
  
  submitToFirebase(userData){
    // console.log("HERE");
    // console.log("called");
    return new Promise((resolve) => {
      this.gotDataFlag=false;
      let userID=firebase.child("newUserID");
      let users=firebase.child("users");
      /* userID.set({
        'value': 500001
      }); */
      userID.on("value",(userid) => {
        if(this.gotDataFlag)
          return;
        this.gotDataFlag=true;
        // console.log(JSON.stringify(userid.val().value));
        this.userID=userid.val().value;
        this.checkDuplicateUser(userData.email).then((foundDuplicate) => {
          if(foundDuplicate){
            dialogs.action("ERROR","Ok",["Email already used!"]);
            resolve(false);
          }
          else{
            users.child(String(userid.val().value)).set({
              'timestamp': Date.now(),
              'name': userData.name,
              'email': userData.email,
              'password': userData.pass
            }).then( (result) => {
              if(result){
                userID.set({
                  value: Number(userid.val().value)+1
                }).then( (isDone) => {
                  // console.log("isDone: "+isDone);
                  const DATA_TO_STORE={
                    name: userData.name,
                    email: userData.email,
                    userID: this.userID
                  };
                  this.setAppData("user",DATA_TO_STORE).then((success)=>{
                    if(success&&isDone){
                      resolve(true);
                    }
                    else{
                      resolve(false);
                    }
                  })
                  /* applicationSettings.setString("user",JSON.stringify(DATA_TO_STORE));
                  if(isDone){
                    resolve(true);
                    // this.router.navigate(["/home"],{clearHistory: true});
                  }
                  else{
                    resolve(false);
                  } */
                });
              }
              else{
                resolve(false);
              }
            });
          }
        });
      });
    });
  }
  checkDuplicateUser(email){
    let invokedOnce:Boolean=false;
    let users=firebase.child("users");
    return new Promise((resolve) => {
      users.on("value",(users)=>{
        if(invokedOnce){
          // resolve(null);
          console.log("RETURNED");
          return;
        }
        else{
          invokedOnce=true;
          console.log("users");
          console.dir(users.val());
          let keys=Object.keys(users.val());
          let found:Boolean=false;
          for (let i = 0; i < keys.length; i++) {
            console.log("email: "+email);
            const emailUsed = users.val()[keys[i]]["email"];
            console.log("emailInDB: "+emailUsed);
            if(emailUsed==email){
              found=true;
              console.log("FOUND");
              break;
            }
          }
          resolve(found);
        }
      });
    })
  }
  validateFromFirebase(userData){
    // console.log(userData.id);
    return new Promise((resolve) => {
      if(userData.id.indexOf("@")+1){
        //ITS EMAIL!
        // isEmail=true;
      // }
      // if(isEmail){
        // console.log("ITS EMAIL");
        this.mapEmailToId(userData.id).then((result) => {
          if(result["success"]){
            userData.id=result["id"];
            this.login(userData).then((result)=>{
              resolve(result);
            })
          }
          else{
            dialogs.action("ERROR","Ok",["No user with that email address!"]);
            resolve(false);
          }
        });
      }
      else{
        this.login(userData).then((result)=>{
          resolve(result);
        })
      }
    });
  }
  mapEmailToId(email){
    return new Promise((resolve) => {
      this.gotDataFlag=false;
      let users=firebase.child("users");
      users.on("value",(usersData) => {
        if(this.gotDataFlag){
          return;
        }
        this.gotDataFlag=true;
        let keys=Object.keys(usersData.val());
        let found:Boolean=false;
        let id;
        // console.log("HERE");
        for (let i = 0; i < keys.length; i++) {
          let tmp=usersData.val()[keys[i]]["email"];
          // console.log("TMP: "+tmp);
          if(tmp==email){
            found=true;
            id=keys[i];
            // console.log("FOUND:"+id);
            break;
          }
        }
        if(found){
          resolve({
            success: true,
            id: id
          });
        }
        else{
          resolve({
            success: false
          });
        }
      });
    });
  }
  login(userData){
    return new Promise((resolve) => {
      this.gotDataFlag=false;
      let users=firebase.child("users");
      // console.log("METHODS AVAILABLE");
      // console.dir(users);
      let user=users.child(String(userData.id));
      this.gotDataFlag=false;
      user.on("value",(uData) => {
        if(this.gotDataFlag){
          return;
        }
        this.gotDataFlag=true;
        if(!uData.val()){
          dialogs.action("ERROR","Ok",["Incorrect details, try again!"]);
          resolve(false);
        }
        if(uData.val()){
          if(userData.id==uData.key()&&userData.pass==uData.val().password){
            const DATA_TO_STORE={
              name: uData.val().name,
              email: uData.val().email,
              userID: uData.key()
            };
            this.setAppData("user",DATA_TO_STORE).then((success)=>{
              if(success){
                resolve(true);
              }
              else{
                resolve(false);
              }
            });
            // let temp=applicationSettings.setString("user",DATA_TO_STORE);
            resolve(true);
            // this.router.navigate(["/home"],{clearHistory: true});
          }
          else{
            dialogs.action("ERROR","Ok",["Incorrect details, try again!"]);
            resolve(false);
          }
        }
      });
    });
  }
  logout(){
    return new Promise((resolve) => {
      this.removeUserData().then(()=>{
        eventsWorking=false;
        requests=[];
        logs=[];
        // android.foregroundActivity.Process.killProcess(android.foregroundActivity.Process.myPid());
        
        this.shutdownListeners().then(()=> {

          setTimeout(()=>{
            android.foregroundActivity.finish();
          },2000);
          resolve(true);
          // this.router.navigateByUrl("register",{clearHistory: true});
        });
      });
    })
    // console.log(logs);
    // console.log(requests);
    // console.log(eventsWorking);
  }
  requestAuthInitial(userID,requestedUserID){
    // console.log(userID,requestedUserID);
    return new Promise((resolve)=> {
      let result:any={
        success: false,
        message: "Something went wrong, Try again later!"
      };
      if(userID==requestedUserID){
        result.message="ID to be requested cannot be same as your user ID";
        resolve(result);
      }
      else{
        this.checkUserIdBeforeRequest(requestedUserID).then((validID) => {
          if(validID){
            this.gotDataFlag=false;
            let requestedUserRef=firebase.child("users/"+requestedUserID+"/authRequests");
            // let requestRef=firebase.child("users/"+requestedUserID+"/authRequests/"+userID);
            // let requestLogRef=firebase.child("users/"+userID+"/authRequestLogs/"+userID);
            // let requestLogRefForRequestedUser=firebase.child("users/"+requestedUserID+"/authRequestLogs/"+userID);
            requestedUserRef.on("value", (requestedUserAuthReqs) => {
              if(this.gotDataFlag){
                return;
              }
              this.gotDataFlag=true;
              // console.log("REQUESTED USER?")
              // console.dir(requestedUserAuthReqs.val()==null);
              if(requestedUserAuthReqs.val()){
                let request=null;
                // console.dir(requestedUserAuthReqs);
                let keys=Object.keys(requestedUserAuthReqs.val());
                // console.log(keys.length);
                keys.forEach( (key) => {
                  if(key==userID){
                    request=requestedUserAuthReqs.val()[key];
                  }
                });
                //request already exists!
                if(request){
                  // console.dir(request);
                  if(request.status==-1){
                    // console.log("Already exists!");
                    result.success=false;
                    result.message="Already requested to this user previously!";
                    resolve(result);
                  }
                  else
                  if(request.status==1){
                    // console.log("Already approved!");
                    result.success=false;
                    result.message="Already approved!";
                    resolve(result);
                  }
                  else{
                    // console.log("Declined previous time, requested again!");
                    this.createAuthRequest(userID,requestedUserID).then((success)=>{
                      if(success){    
                        result.success=true;
                        result.message="Request Submitted";
                        resolve(result);
                      }
                    });
                  }
                }
                else{
                  // console.log("Requesting 2!");
                  this.createAuthRequest(userID,requestedUserID).then((success)=>{
                    if(success){    
                      result.success=true;
                      result.message="Request Submitted";
                      resolve(result);
                    }
                  });
                }
              }
              else{
                // console.log("Requesting!");
                this.createAuthRequest(userID,requestedUserID).then((success)=>{
                  if(success){    
                    result.success=true;
                    result.message="Request Submitted";
                    resolve(result);
                  }
                });
              }
            });
          }
          else{
            result.success=false;
            result.message="Not a valid USER ID";
            resolve(result);
          }
        });
      }
    });
  }
  createAuthRequest(userID,requestedUserID,reqStatus=-1,logType=1){
    return new Promise((resolve) => {
      let requestRef=firebase.child("users/"+requestedUserID+"/authRequests/"+userID);
      requestRef.set({
        'timestamp': Date.now(),
        'status': Number(reqStatus) // -1-> PENDING, 0-> DECLINED, 1-> APPROVED
      }).then( (reqAdded) => {
        // this.gotDataFlag=true;
        // console.log("reqAdded");
          if(reqAdded){
            this.createUserLog(userID, {
              id: requestedUserID,
              type: Number(String(logType)+"0")
            }).then( (typeOne) => {
              if(typeOne){
                this.createUserLog(requestedUserID,{
                  id: userID,
                  type: Number(String(logType)+"1")
                }).then( (isDone) => {
                  if(isDone){
                    resolve(true);
                    // console.log("SUCCESS :)");
                  }
                  else{
                    resolve(false);
                  }
                });
              }
              else{
                resolve(false);
              }
            });
          }
          else{
            resolve(false);
          }
      });
    });
  }
  checkUserIdBeforeRequest(userID){
    return new Promise((resolve) => {
      this.gotDataFlag=false;
      let userRef=firebase.child("users/"+userID);
      userRef.on("value",(data)=>{
        if(this.gotDataFlag){
          resolve(false);
        }
        else{
          this.gotDataFlag=true;
          if(data.val()){
            resolve(true);
          }
          else{
            resolve(false)
          }
        }
      });
    });
  }
  createUserLog(userID,logData){
    let requestLogRef=firebase.child("users/"+userID+"/authRequestLogs");
    let pushRef=requestLogRef.push();
    return pushRef.set({
      'targetUser': Number(logData.id),
      'timestamp': Date.now(),
      'type': Number(logData.type)
      /*
      first digit-> activity, second digit-> user (initial or final)
      10->REQUEST_INITIATED,
      20->RECIEVED_AUTHORIZATION,
      30->RECIEVED_REJECTION
      11->REQUEST_RECIEVED,
      21->GIVEN_AUTHORIZATION,
      31->GIVEN_REJECTION
      */
    });
  }
  getLogs(){
    return new Promise((resolve) => {
      resolve({success: true,
        logs: logs});
    });
    // return logs;
  }
  getRequests(){
    return new Promise((resolve) => {
      resolve({success: true,
        requests: requests});
    });
    // return requests;
  }
  approveRequest(currentUser,targetUser){
    return new Promise((resolve) => {
      let requestRef=firebase.child("users/"+currentUser+"/authRequests/"+targetUser);
      requestRef.set({
        status: 1,
        timestamp: Date.now()
      }).then((isApproved)=>{
        if(isApproved){
          this.createUserLog(currentUser,{
            id: targetUser,
            type: 21
          }).then((logAdded) => {
            if(logAdded){
              this.createUserLog(targetUser,{
                id: currentUser,
                type: 20
              }).then((allDone) => {
                if(allDone){
                  resolve(true);
                }
              });
            }
          });
        }
        else{
          resolve(false);
        }
      });
    });
  }
  declineRequest(currentUser,targetUser){
    return new Promise((resolve) => {
      let requestRef=firebase.child("users/"+currentUser+"/authRequests/"+targetUser);
      requestRef.set({
        status: 0,
        timestamp: Date.now()
      }).then((isDeclined)=>{
        if(isDeclined){
          this.createUserLog(currentUser,{
            id: targetUser,
            type: 31
          }).then((logAdded) => {
            if(logAdded){
              this.createUserLog(targetUser,{
                id: currentUser,
                type: 30
              }).then((allDone) => {
                if(allDone){
                  resolve(true);
                }
              });
            }
          });
        }
        else{
          resolve(false);
        }
      });
    });
  }
  setAppData(key,data){
    return new Promise((resolve)=> {
      applicationSettings.setString(key,JSON.stringify(data));
      resolve(true);
    });
  }
  getUserData(){
    return new Promise((resolve)=> {
      let user=applicationSettings.getString("user","{}");
      user=JSON.parse(user);
      resolve(user);
    });
  }
  removeUserData(){
    return new Promise((resolve)=> {
      applicationSettings.remove("user");
      resolve(true);
    });
  }
}
