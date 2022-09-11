// scrolling to internal href
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const element = document.querySelector(this.getAttribute("href"));
    const offset = 15;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// expand hidden publications
const hidden_pubs_btn = document.querySelector(".hidden-pubs-btn");
const hide_pubs_btn = document.querySelector(".hide-pubs-btn");
const hidden_pubs = document.querySelector(".hidden-pubs");
hidden_pubs_btn.addEventListener("click", function (e) {
  hidden_pubs.style.display = "block";
  hidden_pubs_btn.style.display = "none";
});
hide_pubs_btn.addEventListener("click", function (e) {
  hidden_pubs.style.display = "none";
  hidden_pubs_btn.style.display = "block";
});

// show/hide navbar while scrolling
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("#navbar-hide");

  if (navbar) {
    var last_scroll_top = 0;

    // HIGHLIGHT LINK
    let lastId;
    let scrollItems = document.querySelectorAll(".section");
    const menuItems = document.querySelectorAll(".nav-link");

    // shy progress bar
    const progress = document.querySelector("#sticky_progress");

    window.addEventListener("scroll", function () {
      const mainHeroHeight = document.querySelector(".navbar").offsetTop + 150;
      // shy progress bar
      let max_y = document.documentElement.scrollHeight - window.innerHeight;
      let current_y = window.pageYOffset;
      let perc_y = (current_y / max_y) * 100;

      if (perc_y % 1 < 0.1) {
        progress.style.width = perc_y + "%";
      }
      if (perc_y == 100) {
        finished_page = 1;
        progress.classList.add("progress-bar-striped");
        progress.classList.add("progress-bar-animated");
      } else {
        if (progress.classList.contains("progress-bar-animated")) {
          progress.classList.remove("progress-bar-striped");
          progress.classList.remove("progress-bar-animated");
        }
      }

      let fromTop = window.pageYOffset + mainHeroHeight;

      let cur = [];

      [...scrollItems].map(function (item) {
        //debugger;
        if (item.offsetTop < fromTop) {
          cur.push(item);
        }
      });

      cur = cur[cur.length - 1];
      let id = cur ? cur.id : "";

      if (lastId !== id) {
        lastId = id;

        menuItems.forEach(function (elem, index) {
          elem.classList.remove("active");
          const filteredItems = [...menuItems].filter(
            (elem) => elem.getAttribute("href") === `#${id}`
          );

          if (filteredItems.length > 0) {
            filteredItems[0].classList.add("active");
          }
        });
      }
    });

    //  TYPE WRITER ANIMATION
    var dataText = [
      "Consulting at the intersection of health economics and data science.",
      "We help you to translate data into knowledge, and knowledge into action.",
    ];

    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < text.length) {
        // add next character to h1
        document.querySelector("#typewriter").innerHTML =
          text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

        // wait for a while and call this function again for next character
        setTimeout(function () {
          typeWriter(text, i + 1, fnCallback);
        }, 45);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == "function") {
        // call callback after timeout
        setTimeout(fnCallback, 3000);
      }
    }
    // start a typewriter animation for a text in the dataText array
    function StartTextAnimation(i) {
      if (typeof dataText[i] == "undefined") {
        setTimeout(function () {
          StartTextAnimation(0);
        }, 20);
      }
      // check if dataText[i] exists
      if (dataText[i] != undefined) {
        if (i < dataText[i].length) {
          // text exists! start typewriter animation
          typeWriter(dataText[i], 0, function () {
            // after callback (and whole text has been animated), start next text
            StartTextAnimation(i + 1);
          });
        }
      }
    }
    // start the text animation
    StartTextAnimation(0);
  }
});

// Enabling tooltip joke
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
