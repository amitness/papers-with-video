'use strict';

// Fetch mapping from the JSON file
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {

    // Only run if the request is complete
    if (xhr.readyState !== 4) return;
    console.log(xhr.status);
    if (xhr.status === 200) {
        var paperMapping = JSON.parse(xhr.responseText)
        addVideoIcon(paperMapping);
    }
};
xhr.open("GET", chrome.extension.getURL('/data/mapping.json'), true);
xhr.send();


function addVideoIcon(mapping) {
    // Parse the arxiv id from the URL
    // arxiv.org/abs/2004.1017v1 -> 2004.1017v1
    var rawArxivID = window.location.pathname.split('/').reverse()[0];

    // Remove versioning info from URL if present
    // Example: 2004.1017v1 -> 2004.1017
    var arxivID = rawArxivID.split('v')[0];

    // Add a video icon to the title if the paper is present in our mapping.
    if (arxivID in mapping) {
        var videoLink = mapping[arxivID];
        var videoButton = '<a style="padding-left: 3px; color:black; text-decoration: none;" target="_blank" rel="noopener noreferrer" href="' + videoLink + '">📹</a>';
        var paperTitle = document.querySelector("h1.title");
        paperTitle.innerHTML = paperTitle.innerHTML + videoButton;
    }
}
