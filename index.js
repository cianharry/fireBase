// Initialize Firebase
var config = {
    apiKey: "AIzaSyBu8ZQs3D4oPkF2j1CsYNFgmiuPuzHaav0",
    authDomain: "testapp-c8d61.firebaseapp.com",
    databaseURL: "https://testapp-c8d61.firebaseio.com",
    projectId: "testapp-c8d61",
    storageBucket: "testapp-c8d61.appspot.com",
    messagingSenderId: "151196478931"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("userDiv").style.display = "block";
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("userNav").style.display = "inline-block";

      var user = firebase.auth().currentUser;

      if(user != null){

        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome user: "+email_id;
        console.log(email_id);
      }
      //Goes to Home page once the user is logged in
      //window.location = "Home.html";

    } else {
      // No user is signed in.
      document.getElementById("userDiv").style.display = "none";
      document.getElementById("loginDiv").style.display = "block";
      document.getElementById("userNav").style.display = "none";
      console.log("not logged in");
    }
  });

function Login(){

    var userEmail = document.getElementById("userEmail").value;
    var userPass = document.getElementById("userPass").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('The password entered is incorrect');
          } else {
            alert(errorMessage);
          }
      });
}

function logOut(){

    //logs out the user and redirects the user to the login page
    firebase.auth().signOut();
    window.location = "index.html";

}

function registerUser() {
    var userEmail = document.getElementById('userEmail').value;
    var userPass = document.getElementById('userPass').value;
    if (userEmail.length < 4) {
      alert('Please enter a valid email address.');
      return;
    }
    if (userPass.length < 4) {
      alert('Please enter a password of a minimum of 4 letters.');
      return;
    }

    // Firebase Sign in with email and pass.
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

function googleSign(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(email+" encountered the following erro: "+errorMessage)
    });
}
