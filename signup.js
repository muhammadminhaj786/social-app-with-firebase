import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const storage = getStorage();
//import auth, db
import { auth,db } from "./firebaseconfig.js";



//create a signUp page
var signupBtn = document.getElementById('signBtn')

signupBtn.addEventListener('click',SignUp)

async function SignUp(){
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var img = document.getElementById('img-file')

  try{

    // var userType = document.getElementById('userType')
    //apply conditio user do not fill empty filed
    if(!name || !email || !password){
      alert("required field are missing")
      return
    }

    // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'userImages/' + file.files[0].name);
  const uploadTask = uploadBytesResumable(storageRef, file.files[0], metadata);

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

        const userObj={
            userName:name,
            userEmail:email,
            userPassword:password,
            userImage:downloadURL
        }
        const docRef = await addDoc(collection(db, "users"), userObj);
        console.log(docRef)

      });
    }
  );





  var userAuth = await createUserWithEmailAndPassword(auth, email, password)
  console.log(userAuth.user.uid)
  window.location.assign('/')
  }catch(error){
    alert(error.message)
  }
  


}