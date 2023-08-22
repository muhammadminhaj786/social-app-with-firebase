var locaUser = JSON.parse(localStorage.getItem("user"))
console.log(locaUser)
window.addEventListener('load',function(){
  if(!locaUser){
    window.history.back()
    
  }
})
import { app, getFirestore, auth, signOut, getDocs,getDownloadURL, collection, db,ref,storage,uploadBytesResumable, getDoc, addDoc, deleteDoc, updateDoc, doc, setDoc, getAuth, serverTimestamp } from "./firebase.js"
let postName = document.querySelector('.postName')

let parentCard = document.querySelector('.parentCard')

window.addEventListener('load', async function () {
    
    var localUser = JSON.parse(localStorage.getItem("users"))
    postName.innerHTML = localUser.fullName
    if(localUser!=null){
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            if (localUser.userid == data.uid) {
                var newCard = `            <div class="card mt-3" id="myCard">
                <div class="info">
                  <div class="divImg d-flex ">
                    <img src="${data.Image}" alt="" >
                    <div class="material mt-3 margin"> ${data.fullName}</div>
    
                  </div>
                  <div class="mt-3  margin"> ${data.timeStamp.toDate()}</div>
                </div>
                <div class="details margin">
                <p>${data.title}</p>
                  <p>
                    ${data.desc}
                  </p>
                </div>
                <div class="postPic">
                    <img src="${data.filePost}" alt="">
                </div>
      <div class="btns mt-3 margin ">
        <button id="editBtn" class="btn btn-info" onclick="edit('${doc.id}')" >Edit</button>
        <button id="dleteBtn" class="btn btn-danger" onclick="dle(this,'${doc.id}')">Delete</button>
    
      </div>
    </div>`
                parentCard.innerHTML += newCard
    
            }
    
        });
    }

if(localUser==null){
    const blogCard = document.querySelector('.blogCard')
    const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()

                var newCard = `           <div class="card mt-3" id="myCard">
      <div class="info">
        <div class="divImg d-flex m-3 my-border">
          <img src="${data.Image}" alt="" onclick="getProId('${data.uid}')" height="80px" width="100px">
          <div class="material mt-3"> <p class="m-3">${data.fullName}</p>
          <div class="mt-3 m-3 "> ${data.timeStamp.toDate()}</div>
          </div>
    
        </div>
        <p class="mt-3 m-3">${doc.data().title}</p>
        
      </div>
      <div class="details mt-2">
        <p class="m-3">
          ${data.desc}
        </p>
      </div>
     
    </div>`
    blogCard.innerHTML += newCard
    
            
    
        });
}
})

var getUsers = JSON.parse(localStorage.getItem("user"))
console.log(getUsers)
var blogForm = document.querySelector('.main-body')
var mainTwo = document.querySelector('.main-two')
console.log(blogForm)


// if (getUsers != null) {
//     mainTwo.classList.add('hidden')
//     var publishBtn = document.getElementById('publishBtn')
//     // publishBtn.addEventListener('click',addblog)

//     const docRef = doc(db, "users", getUsers);
//     const docSnap = await getDoc(docRef);
//     var title = document.getElementById('title')
//     var desc = document.getElementById('desc')


//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         var UserName = docSnap.data().fullName
//         var LastName = docSnap.data().LastName
//         var cName = UserName + " " + LastName
//         console.log(UserName)
//         var a = document.getElementById('getName')
//         a.classList.add('color')
//         a.innerHTML += cName

//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//     }
//     let logBtn = document.getElementById('logBtn')
//     logBtn.addEventListener('click', Logout)
//     async function Logout() {
//         await signOut(auth).then(() => {
//             localStorage.clear()
//             alert('logout')
//             window.location.reload()
//             // window.location.replace('./login.html')
//             console.log(logBtn)
//         }).catch((error) => {
//             alert(error.message)
//             console.log(error.message)
//         });

//     }


// } else {
//     blogForm.classList.add('hidden')
//     // mainTwo.classList.add('show')
//     logBtn.innerHTML = "LogIn"
//     logBtn.addEventListener('click', navLog)
//     function navLog() {
//         window.location.replace('./login.html')
//     }
// }



async function addblog() {
var filePost = document.getElementById('filePost').files[0]
/** @type {any} */
const metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'postImages/' + filePost.name);
  const uploadTask = uploadBytesResumable(storageRef, filePost, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);

        var allUsers = JSON.parse(localStorage.getItem('users'))
        console.log(allUsers)
        const blogObj = {
            title: title.value,
            desc: desc.value,
            Image: allUsers.userImage,
            timeStamp: serverTimestamp(),
            fullName: allUsers.fullName + " " + allUsers.LastName,
            filePost:downloadURL,
            uid: allUsers.userid
    
        }
        const docRef = await addDoc(collection(db, "blogs"), blogObj);
        console.log("Document written with ID: ", docRef.id);
        window.location.reload()


      });
    }
  );

    
 


}

async function edit(e) {
    const editTitle = prompt("Enter a new title")
    const editDesc = prompt("Enter a Description")
    console.log(editTitle)

    if (editTitle == "" || editDesc == "") {
        alert('Please input')
        return
    }


    const docRef = doc(db, "blogs", e);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const blogData = docSnap.data()
        blogData.title = editTitle
        blogData.desc = editDesc
        const newdata = doc(db, 'blogs', e)
        await updateDoc(newdata, blogData)
        console.log(blogData)
        window.location.reload()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
async function dle(e, id) {
    e.parentNode.parentNode.remove()
    await deleteDoc(doc(db, "blogs", id));

}


function getProId(e){
    console.log(e)
    localStorage.setItem('proId',JSON.stringify(e))
    window.location.replace('./userpro.html')
}

window.addblog = addblog
window.edit = edit
window.dle = dle
window.getProId =getProId
