//listen for form submit
document.getElementById('myform').addEventListener('submit',saveBookmark);

function saveBookmark(e) {
	//console.log('It works');
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	// console.log(siteName);
	
	if(!validateForm(siteName,siteUrl)){
		return false;
	}
	
	var bookmark = {
		name: siteName,
		url: siteUrl,
	}
	//console.log(bookmark);

	/*
	//local storage
	localStorage.setItem('test','hello world');
	console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */
   // Test if bookmark is null
   if (localStorage.getItem('bookmarks') === null) {
   		// Int array
   		var bookmarks = [];

   		// Add to array
   		bookmarks.push(bookmark);

   		// set to localstorage
   		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   } else {
   		// Get bookmarks from localSotrage
   		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   		// Add bookmarks to array
   		bookmarks.push(bookmark);

   		// Re-set back to localStorage
   		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }

	//  Clear form
	document.getElementById('myform').reset();

	// R-fetch bookmarks
	fetchBookmarks();

	// prevent form from submitting
	e.preventDefault();
}
// Delete bookmark
function deleteBookmark(url) {
	// console.log(url);
	
	// Get bookmarks from localSotrage
   	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   	// Loop througt bookmarks
   	for (var i = 0; i < bookmarks.length; i++) {
   		if (bookmarks[i].url == url) {
   			// remove from array
   			bookmarks.splice(i,1);
   		}
   	}
   	// Re-set back to localStorage
   	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   	// R-fetch bookmarks
   	fetchBookmarks();
}

// Fetch bookmarks;
function fetchBookmarks() {
	// Get bookmarks from localSotrage
   	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   	// Get output id
   	var bookmarksResults = document.getElementById('bookmarksResults');

   	// Build output
   	bookmarksResults.innerHTML = '';
   	for (var i = 0; i < bookmarks.length; i++) {
   		var name = bookmarks[i].name;
   		var url = bookmarks[i].url;

   		bookmarksResults.innerHTML += '<div class="well">'+
   									  '<h3>'+name+
   									  ' <a class="btn btn-default" target="_blank" href="'+url+'"><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Visit</a> '+
   									  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</a>'+
   									  '</h3>'+
   									  '</div>';
   	}
}

// validate form
function validateForm(siteName, siteUrl) {
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}