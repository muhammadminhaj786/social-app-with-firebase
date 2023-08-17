let account = document.getElementById('account')
account.addEventListener('click',goToLogin)
function goToLogin(){
    window.location.replace('./login.html')
    console.log('nas')
}