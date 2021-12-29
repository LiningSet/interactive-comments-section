let currentUser;
let comments;

fetch("/interactive-comments-section-main/app/js/data.json")
  .then((e) => {
    return e.json();
  })
  .then((data) => {
    currentUser = data.currentUser;
    comments = data.comments;
  });

setTimeout(() => {
  console.log(currentUser);
}, 1000);
