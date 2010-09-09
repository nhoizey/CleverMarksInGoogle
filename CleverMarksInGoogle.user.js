// Copyright (c) Clever Age 2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// CleverMarksInGoogle
// Greasemonkey script to add Clever Age's Clever Marks search into Google
//
// Author
// Nicolas Hoizey <nhoizey@clever-age.com>
//
// History
// 0.9   2008-08-26   First release
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CleverMarksInGoogle", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CleverMarksInGoogle
// @namespace     http://www.clever-age.com/
// @description   adds Clever Marks search into Google
// @include       http://*.google.*/*
// @require	      http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

(function() {
	$(document).ready(function() {
	  // Some constants
		const CleverMarksInGoogleVersion = '0.9';
		const waitingImg = '<img src="data:image/gif;base64,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" width="16" height="16" alt="..." border="0" />';
	
		// Get the query value
	  var query = unescape($('input[@name=q]').attr('value'));

		// Create the results container
		$('div#res').before('<div id="CleverMarksInGoogle"></div>');

		// Add some style to it
	  $('head').append('\
	    <style>\
	    #mbEnd { display: none; }\
	    div#CleverMarksInGoogle { float: right; width: 300px; font-size: 0.9em; margin: 1em 0; padding: 0; border: 1px dotted #46a;background: white; }\
	    div#CleverMarksInGoogle h3 { margin: 0; padding: 0.3em; font-weight: bold; background: #e5ecf9; }\
	    div#CleverMarksInGoogle h4 { margin: 0; padding: 0.3em; font-weight: bold; }\
	    div#CleverMarksInGoogle p { margin: 1em; }\
	    div#CleverMarksInGoogle ul { list-style: none; margin: 1em; padding: 0; }\
	    div#CleverMarksInGoogle li { margin: 0; padding: 0.5em; border-bottom: 1px dotted #46a; }\
	    div#CleverMarksInGoogle li:after { content: "."; display: block; height: 0; clear: left; visibility: hidden; }\
	    div#CleverMarksInGoogle li img { float: left; margin: 0 0.5em 0 0; }\
	    div#CleverMarksInGoogle p.credit { float: right; font-size: 0.8em; }\
	    </style>'
	  );
	            
		var msg = '<h3>Related <a href="http://www.clever-age.com/veille/clever-marks/">Clever Marks</a></h3>';
	
		// Show the loading message
		var html = msg + '<p>' + waitingImg + ' Loading links with these tags: <strong>' + query + '</strong>...</p>';
	  $('div#CleverMarksInGoogle').html(html);
				
		// Translate the query string
	  while (query.match(/"([^"]+)\s([^"]+)"/g)) {
	    query = query.replace(/"([^"]+)\s([^"]+)"/g, "\"$1#CMiG#$2\"");
	  }
	  query = query.replace(/"/g, "");
	  query = query.replace(/ /g, ",");
	  query = query.replace(/#CMiG#/g, " ");
	
		// Construct the feed url
		// http://api.clever-age.com/rss/tag/symfony,framework
		var url = 'http://api.clever-age.com/rss/tag/' + query;

	  // Request the API for the links
	  GM_xmlhttpRequest({
	    method: 'GET',
	    url: url,
	    headers: {
	      'User-Agent': 'CleverMarksInGoogle v' + CleverMarksInGoogleVersion,
	      'Accept': 'application/xml'
	    },
	    onload: function(responseDetails) {
	      parseFeed(responseDetails);
	    },
	    onerror: function(responseDetails) {
	      // Show the error message
	      var html = msg + '<p>Could not load Clever Marks feed</p>';
	      $('div#CleverMarksInGoogle').html(html);
	    }
	  });
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
        html += '</li>';
		  });
		  if (currentItemCount > 0) {
	      html += '</ul>';
	      html += '<p class="credit">Enhanced by <a href="https://intranet.clever-age.net/portal/mark">CleverMarksInGoogle</a> v' + CleverMarksInGoogleVersion + '</p>';
	    } else {
        // Show error
        var html = msg + '<p>No related links!</p>';
	    }
      $('div#CleverMarksInGoogle').html(html);
		}
	});
})();