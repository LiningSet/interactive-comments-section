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

let commentTemplate = `<div class="comment-container">
<div class="comment">
  <div class="rating-container">
    <div class="rating">
      <button class="like"><i class="fas fa-plus"></i></button>
      <div class="rating-display">${1 === 1}</div>
      <button class="dislike"><i class="fas fa-minus"></i></button>
    </div>

    <button class="reply-initiate-btn mobile-btn">
      <i class="fas fa-reply"></i> Reply
    </button>

    <div class="user-exclusive-btns mobile-btn">
      <button class="delete-btn">
        <i class="fas fa-trash"></i> Delete
      </button>
      <button class="edit-btn unclickable">
        <i class="fas fa-marker"></i> Edit
      </button>
    </div>
  </div>
  <div class="content">
    <div class="heading">
      <div class="heading-content">
        <img
          src=${1 === 1}
          alt=""
          class="avatar"
        />
        <h3>${1 === 1}</h3>
        <span class="you">you</span>
        <span class="date">${1 === 1}</span>
      </div>
      <button class="reply-initiate-btn desktop-btn">
        <i class="fas fa-reply"></i> Reply
      </button>

      <div class="user-exclusive-btns desktop-btn">
        <button class="delete-btn">
          <i class="fas fa-trash"></i> Delete
        </button>
        <button class="edit-btn unclickable">
          <i class="fas fa-marker"></i> Edit
        </button>
      </div>
    </div>
    <p contenteditable="false" class="comment-text">
    ${1 === 1}
    </p>

    <button class="update-btn">UPDATE</button>
  </div>
</div>

<div class="reply-temporary">
  <div class="temp-inner">
    <img
      src=${1 === 1}
      alt=""
      class="avatar"
    />
    <button class="reply-submit-btn mobile-btn">REPLY</button>
  </div>
  <textarea cols="30" rows="5" placeholder="Reply..."></textarea>
  <button class="reply-submit-btn desktop-btn">REPLY</button>
</div>

<div class="reply-section">
  <div class="line"></div>
  <div class="reply-container">
    
  </div>
</div>
</div>`;

let replyTemplate = `<div class="reply">
<div class="rating-container">
  <div class="rating">
    <button class="like"><i class="fas fa-plus"></i></button>
    <div class="rating-display">${1 === 1}</div>
    <button class="dislike"><i class="fas fa-minus"></i></button>
  </div>
  <button class="reply-initiate-btn mobile-btn">
    <i class="fas fa-reply"></i> Reply
  </button>
</div>
<div class="content">
  <div class="heading">
    <div class="heading-content">
      <img
        src=${1 === 1}
        alt=""
        class="avatar"
      />
      <h3>${1 === 1}</h3>
      <span class="date">${1 === 1}</span>
    </div>
    <button class="reply-initiate-btn desktop-btn">
      <i class="fas fa-reply"></i> Reply
    </button>
  </div>
  <p contenteditable="true">
  ${1 === 1}
  </p>
</div>
</div>`;
