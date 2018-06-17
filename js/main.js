// Listen for form submit
document.getElementById('my-form').addEventListener('submit', saveBookmark);


// Save bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }
  
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    // Check if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        
        // init array
        var bookmarks = [];
        
        // add to array
        bookmarks.push(bookmark);
        
        // set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    } else {
        
        // get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        
        // add bookmar to array
        bookmarks.push(bookmark);
        
        // re-set back to local storgae
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    // clear form
    document.getElementById('my-form').reset();
    
     // re-fetch bookmarks
    fetchBookmarks();
    
    // Prevent form from submitting
    e.preventDefault();
}


// Delete bookmark
function deleteBookmark(url){
    
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // loop thru bookmarks
    for (var i = 0; i < bookmarks.length; i++){
        if( bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // re-set localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    // re-fetch bookmarks
    fetchBookmarks();
}



// Fetch bookmarks
function fetchBookmarks(){
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // get output id
    var bookmarksResults = document.getElementById('bookmarks-results');
    
    // build output
    bookmarksResults.innerHTML = "";
    
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="well">' + 
                                      '<h3>' + name + 
                                      ' <a class="btn btn-primary pull-right" target="_blank" href="'+ url +'">Visit</a> ' +
                                      ' <a onclick = "deleteBookmark(\'' + url + '\')" class="btn btn-danger pull-right" href="#">Delete</a> '
                                      '</h3>' + 
                                      '</div>';
    }
}


// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
  