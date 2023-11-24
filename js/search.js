function searchPage() {
    var searchQuery = document.getElementById('searchInput').value.toLowerCase();
    var pageContent = document.body.innerText.toLowerCase();
    var searchRegex = new RegExp(searchQuery, 'gi');
    var match;
    var matchedResults = [];

    while ((match = searchRegex.exec(pageContent)) !== null) {
        var startIndex = Math.max(0, match.index - 50);
        var endIndex = Math.min(pageContent.length, match.index + searchQuery.length + 200);
        var matchedFragment = pageContent.substring(startIndex, endIndex);
        matchedResults.push(matchedFragment);
    }
    var searchResultsModalBody = document.getElementById('searchResultsModalBody');
    searchResultsModalBody.innerHTML = '';

    matchedResults.forEach(function (result) {
        var resultItem = document.createElement('p');
        resultItem.innerHTML = result;
        searchResultsModalBody.appendChild(resultItem);
    });

    var searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
    searchModal.show();
}
