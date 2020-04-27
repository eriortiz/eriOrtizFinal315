var PROVIDER = (function () {
  var _allData = {};

  var _getData = function (callback) {
    $.getJSON('data/data.json', function (data) {
      //this is when it is complete
      // console.log('success ', data);=
    })
      .fail(function (error) {
        // console.log('Oopsie Poopsie ', error.status + ' ' + error.statusText);
      })

      .done(function (data) {
        // console.log('done ', data.MainNav);
        _allData = data;
        callback();
      });
  };

  var _getMainNav = function () {
    return _allData.MainNav;
  };

  var _getPageContent = function (nameofPage) {
    var content = '';
    $.each(_allData.Pages, function (idx, page) {
      if (nameofPage === page.pageName) {
        content = page.content;
      }
    });
    return content;
  };

  return {
    getData: _getData,
    getMainNav: _getMainNav,
    getPageContent: _getPageContent,
  };
})();
