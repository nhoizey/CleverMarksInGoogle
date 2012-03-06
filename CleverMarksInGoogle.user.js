// Copyright (c) Clever Age 2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// CleverMarksInGoogle
// userscript to add Clever Age's CleverMarks search into Google
//
// Author
// Nicolas Hoizey <nhoizey@clever-age.com>
//
// --------------------------------------------------------------------
// This is a UserScript.
//
// To install it on Firefox, you need the Greasemonkey addon:
//   http://greasemonkey.mozdev.org/
// Nothing is needed to install it on Chrome
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CleverMarksInGoogle
// @namespace     com.clever-age.clevermarks
// @description   adds CleverMarks search into Google
// @version       0.12
// @include       http://*.google.*/*
// @include       https://*.google.*/*
// @require	      https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

(function() {
	  // Some constants
		const waitingImg = '<img src="data:image/gif;base64,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" width="16" height="16" alt="..." border="0" />';
		
		// variables
		var queryStr = '',
		    msg = '<h3>Related <a href="http://www.clever-age.com/veille/clever-marks/">CleverMarks</a></h3>';
	
		// Create the results container
		$('body').prepend('<div id="CleverMarksInGoogle"></div>');

		// Add some style to it
	  $('head').append('\
	    <style>\
	    #CleverMarksInGoogle { position: absolute; right: 10px; top: 180px; width: 320px; font-size: 1em; margin: 1em 0; padding: 0; border: 1px solid #46a;background: white; }\
	    #CleverMarksInGoogle h3 { margin: 0; padding: 0.3em; font-weight: bold; background: #e5ecf9; }\
	    #CleverMarksInGoogle h4 { margin: 0; padding: 0.3em; font-weight: bold; }\
	    #CleverMarksInGoogle p { margin: 5px; }\
	    #CleverMarksInGoogle ul { list-style: none; margin: 1em; padding: 0; }\
	    #CleverMarksInGoogle li { margin: 0; padding: 5px; border-bottom: 1px dotted #46a; }\
	    #CleverMarksInGoogle li:after { content: "."; display: block; height: 0; clear: left; visibility: hidden; }\
	    #CleverMarksInGoogle li img { float: left; width: 80px; margin: 0 5px 0 0; }\
	    #CleverMarksInGoogle li p { padding: 0 0 0 85px; }\
	    </style>'
	  );

	  function handleSearch() {
      // Get the query value
      queryField = document.querySelector('form[role=search]').q.value;
      
      if (queryStr === undefined) {
        var html = msg + '<p>No search to perform.</p>';
        $('#CleverMarksInGoogle').html(html);
      } else {
        // Show the loading message
        var html = msg + '<p>' + waitingImg + ' Loading links with these tags: <strong>' + queryStr + '</strong>...</p>';
        $('#CleverMarksInGoogle').html(html);
        	
    		// Translate the query string
    	  while (queryStr.match(/"([^"]+)\s([^"]+)"/g)) {
    	    queryStr = queryStr.replace(/"([^"]+)\s([^"]+)"/g, "\"$1#CMiG#$2\"");
    	  }
    	  queryStr = queryStr.replace(/"/g, "");
    	  queryStr = queryStr.replace(/ /g, ",");
    	  queryStr = queryStr.replace(/#CMiG#/g, " ");
    	
    		// Construct the feed url
    		// http://api.clever-age.com/rss/tag/symfony,framework
    		var url = 'http://api.clever-age.com/rss/tag/' + queryStr;
  
    	  // Request the API for the links
    	  GM_xmlhttpRequest({
    	    method: 'GET',
    	    url: url,
    	    headers: {
    	      'User-Agent': 'CleverMarksInGoogle',
    	      'Accept': 'application/xml'
    	    },
    	    onload: function(responseDetails) {
    	      parseFeed(responseDetails);
    	    },
    	    onerror: function(responseDetails) {
    	      // Show the error message
    	      var html = msg + '<p>Could not load CleverMarks feed</p>';
    	      $('#CleverMarksInGoogle').html(html);
    	    }
    	  });
    	}
	  }
	
		function parseFeed(responseDetails) {
		  // Get the feed as a jQuery object
      var jFeed = $(responseDetails.responseText);

      // Get the feed title
      var feedTitle = $('title:first', jFeed).text();
    
      var html = msg + '<h4>' + feedTitle + '</h4><ul>';
      var currentItemCount = 0;
		  jFeed.find('entry').each(function() {
        // Create current item data
        if (currentItemCount++ % 2 == 0) {
          html += '<li style="background: #e5ecf9;">';
        } else {
          html += '<li>';
        }
        html += '<img src="' + $(this).find('link[rel=enclosure]').attr('href') + '" />';
        html += '<p><a href="' + $(this).find('link[rel=alternate]').attr('href') + '">' + $(this).find('title').text() + '</a></p>';
        html += '<p>' + $(this).find('summary').text() + '</p>';
        html += '</li>';
		  });
		  if (currentItemCount > 0) {
	      html += '</ul>';
	    } else {
        // Show error
        html = msg + '<p>No related links!</p>';
	    }
      $('#CleverMarksInGoogle').html(html);
		}
		
		$(document.querySelector('form[role=search]').q).on('change', handleSearch);
		handleSearch();
})();