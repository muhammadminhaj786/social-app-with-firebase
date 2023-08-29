import { app, auth, getAuth, signInWithEmailAndPassword, getDoc,doc,db,collection } from "./firebase.js"
console.log("eee")
let loginBtn = document.getElementById('Login')

window.addEventListener('load', function () {
    var getUsers = JSON.parse(localStorage.getItem("user"))
    console.log(getUsers)
    if (getUsers != null) {
        window.history.back()
    }
})

loginBtn.addEventListener('click', Login)
async function Login() {
    try {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        const userUid = userLogin.user.uid
        console.log(userUid)
        localStorage.setItem("user", JSON.stringify(userUid))
        alert('login')


        const docRef = doc(db, "users", userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            localStorage.setItem("users", JSON.stringify(docSnap.data()))
            
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        // const userObj = {
        //     fullName,
        //     LastName,
        //     email,
        //     password,
        //     userImage:downloadURL,
        //     userid: userUid
        // }
        // localStorage.setItem('users',JSON.stringify(userObj))
        window.location.replace('./index.html')
    } catch (error) {
        alert(error.message)
        console.log(error.message)
    }
}
