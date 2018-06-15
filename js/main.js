// Listen for form submit
document.getElementById('my-form').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
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
    
    // Prevent form from submitting
    e.preventDefault();
}