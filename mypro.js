import {
  app,
  getFirestore,
  auth,
  signOut,
  getDocs,
  collection,
  db,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  getAuth,
} from "./firebase.js";
var getUsers = JSON.parse(localStorage.getItem("user"));
console.log(getUsers);
window.addEventListener("load", function () {
  if (getUsers != null) {
  } else {
    window.history.back();
  }
});
var imgPro = document.getElementById("imgPro");
var fname = document.getElementById("fname");
var password = document.getElementById("password");
var email = document.getElementById("email");
var tbody = document.querySelector('.tbody')

if (getUsers != null) {
  const docRef = doc(db, "users", getUsers);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    imgPro.src = docSnap.data().userImage;
    fname.innerHTML = docSnap.data().fullName;
    email.innerHTML = docSnap.data().email;
    password.innerHTML = docSnap.data().password;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  const querySnapshot = await getDocs(collection(db, "clickUser"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

    console.log(doc.data().mainUserId)
    if(doc.data().mainUserId === getUsers){
        
  var newrow = `                <th scope="row">1</th>
  <td class="fname">${doc.data().fullName}</td>
  <td class="lname">${doc.data().lastName}</td>
  <td class="email">${doc.data().email}</td>
  <td>yes</td>
</tr>`
    tbody.innerHTML += newrow
    }

});
} else {
  console.log("loged");
}
