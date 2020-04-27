function initNav() {
  $('a').click(function (e) {
    var btn = e.target.id;
    loadContent(btn);
  });
}

function loadContent(pageName) {
  // console.log('loadContent ' + pageName);

  var pageContent = PROVIDER.getPageContent(pageName);
  // console.log('loadContent' + pageContent);

  $('.content').html(pageContent);
}

function populateNav() {
  var nav = PROVIDER.getMainNav();
  console.log('Populating');
  $.each(nav, function (idx, link) {
    // $("nav").append('<a href="' + link.path + '">' + link.linkName + '</a>');
    $('.links').append(`<a id="${link.path}" href="#">${link.linkName}</a>`);
  });

  loadContent('home');
  initNav();
}

function dataisLoaded() {
  populateNav();
}

$(document).ready(function () {
  PROVIDER.getData(dataisLoaded);
});
