
let handleSubmit = document.getElementById('handle-submit'),
    handleEye = document.getElementById('eye'),
    userName = document.getElementById('username'),
    Password = document.getElementById('password'),
    loginIndex = 0
//   true && false = true
let url = 'http://localhost:3000/user'
fetch(url)
    .then(res => res.json())
    .then(data => getFun(data))

function getFun(users) {
    let result = document.getElementById('result')
    users.forEach(user => {
        result.innerHTML +=
            `
          <div class="col-12 col-sm-6 col-md-6 col-lg-4 mt-3">
            <div class="card">
              <div class="card-header">
                <h3>Information</h3>
              </div>
              <div class="card-body">
                <h3 class="text-primary">${user.username}</h3>
                <h3 class="text-danger">${user.password}</h3>
              </div>
              <div class="card-footer d-flex justify-content-between ">
                <button onclick="editFun(${user.id})" class="btn btn-outline-primary">Edit</button>
                <button onclick="deleteFun(${user.id})" class="btn btn-outline-danger">Delete</button>
              </div>
            </div>
        </div>
     `
    })
}


//  Delete request
function deleteFun(idx) {
    fetch(`${url}/${idx}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}


// PUT request
function editFun(idx) {
    fetch(`${url}/${idx}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('username').value = data.username;
            document.getElementById('password').value = data.password;
        })
    loginIndex = idx
}



// function Name(params) {
//     console.log(params);
// }

// Name(14)


//  POST metod
handleSubmit.onclick = function addTodo(e) {

    e.preventDefault()
    if (userName.value.length > 0 && Password.value.length > 5) {

        if (loginIndex > 0) {
            fetch(`${url}/${loginIndex}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userName.value,
                    password: Password.value
                })
            })
        }
        else {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userName.value,
                    password: Password.value
                })
            })
        }
        userName.value = ""
        Password.value = ""
    } else {
        alert("userName va parolni kiriting!")
    }
}











// eye open and close function 
handleEye.addEventListener('click', () => {
    let parol = 'password';
    if (Password.type === parol) {
        Password.type = 'text';
        handleEye.classList.toggle('fa-eye-slash');
        handleEye.classList.toggle('fa-eye');
    } else {
        Password.type = 'password';
        handleEye.classList.toggle('fa-eye-slash');
        handleEye.classList.toggle('fa-eye');

    }
})










// 100 gacha bo'lgan raqamlar ichidan 7 ga
// bo'linadigon sonlarni console.log() chiqarin
// for (let i = 0; i <= 100; i++) {
//     if (i % 7 === 0) {
//         console.log(i)
//     }
// }