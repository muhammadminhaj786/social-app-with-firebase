import { app, createUserWithEmailAndPassword, auth, doc, setDoc, db } from "./firebase.js"
import {  getStorage ,deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,storage} from "./firebase.js";
console.log(app)


// import {app, auth, createUserWithEmailAndPassword} from "./firebase.js"
// // import {getAuth, createUserWithEmailAndPassword,getFirestore,addDoc,collection,db} from "./firebase.js"
// console.log(auth)

// const SignupBtn = document.getElementById("SignupBtn")


// SignupBtn.addEventListener('click',createUer)
async function createUer() {

    try {
        let fullName = document.getElementById('fname').value
        let LastName = document.getElementById('lname').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let cpassword = document.getElementById('cpassword').value
        // let userInt = document.getElementById('userInt').value
        let file = document.getElementById('file').files[0]
        console.log(file)


        // console.log(fullName)
        // if((fullName.length>=3)&&(fullName.length<20)){
        // if((LastName.length>=1)&&(LastName.length<20)){
        // if((password.length>=8)){
        if (password === cpassword) {
            console.log(fullName)
            if(file==undefined){
                alert('choose a iamge')
                return
            }
            /** @type {any} */
            const metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'ProductImages/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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

                        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
                        const userUid = userAuth.user.uid
                        console.log(userUid)
                        
                        const userObj = {
                            fullName,
                            LastName,
                            email,
                            password,
                            userImage:downloadURL,
                            userid: userUid,
                            // userInt:userInt
                        }
                        localStorage.setItem('user',JSON.stringify(userUid))
                        await setDoc(doc(db, "users", userUid), userObj);
                        alert('signed in', userAuth)
                        localStorage.setItem('users',JSON.stringify(userObj))
            
                        window.location.replace('./index.html')

                    });
                }
            );

        } else {
            alert('repeat password is not match')
        }
        // }else{
        //     alert('password have more than 8 characters')
        // }
        // }else{
        //     alert('last name atleast 1 character and not greater yhan 20 characters')
        // }

        // }
        // else{
        //     alert('full name atleast have more than 3 characters or not greater than 20 characters ')
        // }


    } catch (error) {
        console.log(error.message)
        alert(error.measage)
    }
}


window.createUer = createUer
