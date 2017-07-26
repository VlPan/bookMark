/**
 * Created by user on 26.07.2017.
 */


document.getElementById("myForm").addEventListener('submit', saveBookmark);

function saveBookmark(e){
    console.log("It's working!");
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteURL").value;

    if(!siteName || !siteUrl){
        alert("Нужно заполнить оба поля!!!")
        return -1;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Неверный формат ссылки!!!");
        return -1;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Local Storage Test

    // localStorage.setItem('test','Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    //
    // console.log(bookmark);

    // Если мы не создавали заметок до этого то обьявить массив заметок
    if(localStorage.getItem("bookmarks") === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        // Занести массив в локальную память
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
       var bookmarks =  JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        console.log(bookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    bookmarksResults.innerHTML = "";
    document.getElementById('myForm').reset();
    fetchBookmarks();
    e.preventDefault();
}

function deleteBookmark(url){
   var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.forEach(function(item,i){
        if(item.url === url){
           bookmarks.splice(i, 1);
        }
    })

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    bookmarksResults.innerHTML = "";
    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks =  JSON.parse(localStorage.getItem("bookmarks"));
    console.log(bookmarks);

    var bookmarksResults = document.getElementById('bookmarksResults');
    console.log(bookmarksResults);

    bookmarksResults.innerHTM = '';

    bookmarks.forEach(function(item){
        var name = item.name;
        var url = item.url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' + name +
                                        '<a class="btn btn-default" target="_blank" href="'+url+'">Перейти</a>'+
                                         '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Удалить</a>'+
                                        '</h3>' +
                                        '</div>';
    })


}