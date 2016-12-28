var isHomePage = function () {
  return !window.location.hash || (window.location.hash === "#home");
};

(function () { // photos
  var photoIndex  = 0
  var photos      = $("#photo-spinner img")
  var centerBlock = $("#center-block")

  var spin = function () {
    centerBlock.addClass("hidden")
    photos.addClass("hidden")
    photos.eq(photoIndex).toggleClass("hidden")
    photoIndex += 1

    if (photoIndex >= photos.length) {
      photoIndex = 0
    }
  }

  $("#corner").click(spin)
}());

(function () { // rainbow
  var colors = ["red", "orange", "gold", "green", "blue", "indigo", "violet"]
  $(".rainbow").each(function () {
    el = $(this)
    var text   = ""
    var chars  = el.text().split("")
    for (i = 0; i < chars.length; i++) {
      var color = colors[i % colors.length]
      text += '<span style="color:' + color + ';">' + chars[i] + '</span>'
    }
    el.html(text)
  })
}());

(function () { // page-switching
  var switchResumeLink = function () {
    var newText
    var newHref

    if (isHomePage()) {
      newText = "Résumé"
      newHref = "#resume"
    } else {
      newText = "Home"
      newHref = "#home"
    }

    $('.resume-link').text(newText)
    $('.resume-link').attr("href", newHref)
  }

  switchResumeLink()

  routie(":page", function (page) {
    var mainContent = $(".main-content")
    mainContent.fadeOut(300, function(){
      $(".hidden-content").append(mainContent.children().detach())
      mainContent.append($("#" + page).detach())
      switchResumeLink()
    })
    mainContent.fadeIn('slow')
  })
}());
