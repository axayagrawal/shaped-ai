$(".page_usecases_tabs").each(function () {
  var $this = $(this);
  var $childTriggers = $this.find(".page_usecases_tabs_link");
  var $childTargets = $this.find(".page_usecases_tabs_pane");

  function makeItemActive(index) {
    $childTriggers.removeClass("is-active").eq(index).addClass("is-active");
    $childTargets.removeClass("is-active").eq(index).addClass("is-active");
  }

  $this.on("click", ".page_usecases_tabs_link", function () {
    var index = $childTriggers.index(this);
    makeItemActive(index);
  });

  $childTriggers.each(function (index) {
    ScrollTrigger.create({
      trigger: this,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: function (scrollTrigger) {
        if (scrollTrigger.isActive) {
          makeItemActive(index);
        }
      }
    });
  });
});
