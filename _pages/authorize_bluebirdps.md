---
layout: pages
title: "Authorize BluebirdPS Response"
permalink: /authorize_bluebirdps/
search: false
---

<h1>BluebirdPS Twitter API Authorization</h1>
<p id="searchParams"></p>
<p id="responseUrl"></p>
<script>
    let parameters = new URLSearchParams(window.location.search);
    parameters.forEach(function(value,key) {
        document.getElementById("searchParams").innerHTML +=  `${key}: <span id="name">${value}</span><br/>`;
    })
    document.getElementById("searchParams").innerHTML += `Response URL: <span id="name">${window.location}</span>`;
</script>
