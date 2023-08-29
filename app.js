var loader = document.getElementById('preloader')
window.addEventListener('load',function(){
    loader.style.display ='none'
})

import { app, getFirestore, auth, signOut, getDocs, collection, db, getDoc, addDoc, deleteDoc, updateDoc, doc, setDoc, getAuth, serverTimestamp } from "./firebase.js"

console.log(app)
var allPost = document.querySelector('.allPost')
window.addEventListener('load',async function(){
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        if(!getUser){
            var data = doc.data()
            var newCard = `                        <div class="card mt-4">
            <div class="divImg d-flex">
                <img src="${data.Image}"  alt="" class="margin ">
                <p class="margin">${data.fullName}</p>
            </div>
            <div class="timeSt mt-3">
                <p class="margin">${data.timeStamp.toDate()}</p>
            </div>
            <div class="details mt-3">
                <p class="margin">${data.title}</p>
                <p class="margin"> ${data.desc}</p>
            </div>
            <div class="uiImg mt-1 w-100">
                <img src="${data.filePost}"  height="550px" width="90%" alt="">
            </div>
            <div class="applyBtns mt-3 mb-3 container" ">
                <button class="btn btn-success w-100" onclick="navToLog()" >Apply</button>
            </div>
        </div>`
            allPost.innerHTML += newCard
        }else{
            var data = doc.data()
            console.log(data.postType)
            console.log(getUser)
            var newCard = `                        <div class="card mt-4">
            <div class="divImg d-flex">
                <img src="${data.Image}"  alt="" class="margin ">
                <p class="margin">${data.fullName}</p>
            </div>
            <div class="timeSt mt-3">
                <p class="margin">${data.timeStamp.toDate()}</p>
            </div>
            <div class="details mt-3">
                <p class="margin">${data.title}</p>
                <p class="margin"> ${data.desc}</p>
            </div>
            <div class="uiImg mt-1 w-100">
                <img src="${data.filePost}"  height="550px" width="90%" alt="">
            </div>
            <div class="applyBtns mt-3 mb-3 container" ">
                <button class="btn btn-success w-100 " onclick="Apply('${doc.id}')" >Apply</button>
            </div>
        </div>`
            allPost.innerHTML += newCard    
        }
      

        

    });
})

let acc_btn = document.querySelector('.acc-btn')
acc_btn.addEventListener('click',goToLogin)
function goToLogin(){
    window.location.replace('./login.html')
    console.log('nas')
}





// <---------------------------start------------------>
//for dropdown acc 
const navBar = document.getElementById('nav-bar')
let profile = document.querySelector('.profile')
// let accountBtn = document.querySelector('.accountBtn')
let accBtn = document.querySelector('.accountBtn')


var getUser = JSON.parse(localStorage.getItem('user'))

//check user login
if (!getUser){
    console.log("No user login")

    // profile.innerHTML = ""

}else{

    const userInfo = JSON.parse(localStorage.getItem('users')) 
    //new
    var myPro = `                <div class="myimg" id="myimgid" style="height: 80px; width: 130px;">
    <img src="${userInfo.userImage}" alt="" height="100%" width="60%" class="border-radius">
</div>

<div class="dropdown" id="dropdownid">
    <div class="nameandimg" >
        <img src="${userInfo.userImage}" alt="" height="80px" width="40%">
        <p id="logerName"> ${userInfo.fullName} </p>
    </div>

    <ul>
        <li>
            <i class="fa-solid fa-user"></i>
            <p id="my-account"> My Account </p>
        </li>

        <hr>

        <li>
            <i class="fa-solid fa-circle-question"></i>
            <p> Help </p>
        </li>

        

        <hr>

        <li>
            <i class="fa-solid fa-right-from-bracket"></i>
            <p id="logout">  Log Out </p>
        </li>
    </ul>
</div>
</div>`
profile.classList = 'visible'
accBtn.classList = 'hidden'
profile.innerHTML += myPro
var mypro=document.getElementById('my-account')

let logBtn = document.getElementById('logout')
logBtn.addEventListener('click',LogOut)
async function LogOut (){
    signOut(auth).then(() => {
        alert('Log out')
        localStorage.clear()
        window.location.reload()
      }).catch((error) => {
        // An error happened.
      });
}
//dropdown
let myimgid = document.getElementById('myimgid');
let dropdownid = document.getElementById('dropdownid');
    myimgid.addEventListener('click', () => {
        dropdownid.classList.toggle('blackdiv')
    });

}
//navigiate page my account
if(!getUser){
    console.log('no user sign')
}else{
    
mypro.addEventListener('click',function(){
    window.location.replace('./mypro.html')
})

}
// <--------------------------end----------->


// <-----------logout------->
console.log('mna')
var temp = 'not'
var tempId = 'myid'
async function Apply(id){

    if(temp==='applied' && tempId==id){
        alert('alerady apply')
    }else{
        var myUser = JSON.parse(localStorage.getItem('users'))
        console.log(id)
        const mainUserRef = doc(db, "blogs", id);
        const mainUserSnap = await getDoc(mainUserRef);
    
    if (mainUserSnap.exists()) {
      console.log("Document data:", mainUserSnap.data());
      var mainUserId=mainUserSnap.data().uid
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    
        console.log(myUser.fullName)
        const applyUserObj ={
            fullName:myUser.fullName,
            lastName:myUser.LastName,
            clickId:myUser.userid,
            email:myUser.email,
            mainUserId:mainUserId
        }
        const docRef = await addDoc(collection(db, "clickUser"), applyUserObj);
          console.log("Document written with ID: ", docRef.id);
    }
    temp = 'applied'
    tempId = id
}



function navToLog(){
    window.location.replace('./login.html')
}

window.Apply = Apply
window.navToLog = navToLog


