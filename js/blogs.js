var db;

window.onload = function () {
    $(document).ready(function () {
        const storedUser = localStorage.getItem("loggedInUser");
        if (!storedUser) {
            window.location.href = "../index.html";
            return;
        }
        const welcomeMessage = $("#welcomeMessage");
        welcomeMessage.html(`<span class="nav-link"><i class="fas fa-user text-white fa-lg"></i> ${storedUser}</span>`);
        welcomeMessage.show();
    });


    var request = window.indexedDB.open('blogDatabase', 1);

    request.onerror = function (event) {
        console.log('Error opening IndexedDB:', event);
    };

    request.onsuccess = function (event) {
        db = event.target.result;

        var transaction = db.transaction(['blogs'], 'readwrite');
        var objectStore = transaction.objectStore('blogs');
        var getAllBlogs = objectStore.getAll();

        getAllBlogs.onsuccess = function () {
            var blogData = { blogs: getAllBlogs.result };
            displayAllBlogs(blogData);
        };
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        if (!db.objectStoreNames.contains('blogs')) {
            db.createObjectStore('blogs', { keyPath: 'id', autoIncrement: true });
        }
    };
};


function saveBlog() {
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var imageInput = document.getElementById('image');
    var image = imageInput.files[0];
    var username = localStorage.getItem("loggedInUser");
    console.log(username);


    var reader = new FileReader();
    reader.onload = function (e) {
        var imageData = e.target.result;

        var transaction = db.transaction(['blogs'], 'readwrite');
        var objectStore = transaction.objectStore('blogs');

        var newBlog = {
            title: title,
            content: content,
            image: imageData,
            user: username
        };
        var getAllBlogs = objectStore.getAll();

        getAllBlogs.onsuccess = function () {
            var existingBlogs = getAllBlogs.result || [];

            existingBlogs.unshift(newBlog);
            //existingBlogs.push(newBlog);
            var clearRequest = objectStore.clear();
            clearRequest.onsuccess = function () {
                for (var i = 0; i < existingBlogs.length; i++) {
                    objectStore.add(existingBlogs[i]);
                }

                console.log('Blog added to IndexedDB');
                displayAllBlogsFromIndexedDB();
                alert('Blog publicado');
                window.location.reload();
            };

            clearRequest.onerror = function (event) {
                console.log('Error clearing IndexedDB:', event);
            };
        };
    };

    reader.readAsDataURL(image);

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image').value = '';
}


function displayAllBlogsFromIndexedDB() {
    var transaction = db.transaction(['blogs'], 'readwrite');
    var objectStore = transaction.objectStore('blogs');
    var getAllBlogs = objectStore.getAll();

    getAllBlogs.onsuccess = function () {
        var blogData = { blogs: getAllBlogs.result.reverse() };
        displayAllBlogs(blogData);
    };
}

function displayAllBlogs(blogData) {
    var blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = '';

    if (blogData && blogData.blogs && blogData.blogs.length > 0) {
        blogData.blogs.forEach(function (blog) {
            var blogDiv = document.createElement('div');
            blogDiv.classList.add('blogEntry');

            var blogTitle = document.createElement('h3');
            blogTitle.classList.add('blogTitle');
            blogTitle.textContent = blog.title;

            var blogContent = document.createElement('p');
            blogContent.classList.add('blogContent');
            blogContent.textContent = blog.content;

            var blogImage = document.createElement('img');
            blogImage.classList.add('blogImage');
            blogImage.src = blog.image;

            var blogUser = document.createElement('p');
            blogUser.classList.add('blogUser');
            blogUser.textContent = 'Usuario: ' + blog.user;

            blogDiv.appendChild(blogUser);
            blogDiv.appendChild(blogTitle);
            blogDiv.appendChild(blogContent);
            blogDiv.appendChild(blogImage);

            blogContainer.insertBefore(blogDiv, blogContainer.firstChild);
        });
    }
}

function logout() {
    localStorage.removeItem("storedUser");
    window.location.replace("../index.html");
    history.replaceState(null, null, "../index.html");
}

