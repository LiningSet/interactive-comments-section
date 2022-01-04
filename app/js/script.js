const commentSection = document.querySelector(".comments-section");
const sendAvatar = document.querySelector(".send-inner .avatar");
const sendComment = document.querySelector(".send-comment");
const sendCommentTextarea = document.querySelector(".send-comment textarea");
const sendBtns = document.querySelectorAll(".send-submit-btn");
let replySection;
let currentUser;
let comments;
let replies;
let currentComment;

fetch("/interactive-comments-section-main/app/js/data.json")
  .then((e) => {
    return e.json();
  })
  .then((data) => {
    currentUser = data.currentUser;
    comments = data.comments;
  })
  .then(() => {
    console.log(currentUser);
    sendAvatar.setAttribute("src", currentUser.image.png);

    //iterates through each comment in data.json and creates a tag with respective data
    comments.forEach((comment) => {
      replies = comment.replies;
      let commentToAdd = document.createElement("div");
      //the editable classname in below means that it has potencial to turn out as the user therefore having an edit button
      commentToAdd.className = `comment-container editable-comment`;
      commentToAdd.id = `c${comment.id}`;

      commentToAdd.innerHTML = `<div class="comment">
        <div class="rating-container">
          <div class="rating" data-score="${comment.score}">
            <button class="like"><i class="fas fa-plus"></i></button>
            <div class="rating-display">${comment.newScore}</div>
            <button class="dislike"><i class="fas fa-minus"></i></button>
          </div>
      
          <button class="reply-initiate-btn mobile-btn">
            <i class="fas fa-reply"></i> Reply
          </button>
      
          <div class="user-exclusive-btns mobile-btn">
            <button class="delete-btn">
              <i class="fas fa-trash"></i> Delete
            </button>
            <button class="edit-btn">
              <i class="fas fa-marker"></i> Edit
            </button>
          </div>
        </div>
        <div class="content">
          <div class="heading">
            <div class="heading-content">
              <img
                src=${comment.user.image.png}
                alt=""
                class="avatar"
              />
              <h3>${comment.user.username}</h3>
              <span class="you">you</span>
              <span class="date">${comment.createdAt}</span>
            </div>
            <button class="reply-initiate-btn desktop-btn">
              <i class="fas fa-reply"></i> Reply
            </button>
      
            <div class="user-exclusive-btns desktop-btn">
              <button class="delete-btn">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="edit-btn">
                <i class="fas fa-marker"></i> Edit
              </button>
            </div>
          </div>
          <p contenteditable="false" class="comment-text">
          ${comment.content}
          </p>
      
          <button class="update-btn">UPDATE</button>
        </div>
      </div>
      
      <div class="reply-temporary">
        <div class="temp-inner">
          <img
            src=${currentUser.image.png}
            alt=""
            class="avatar"
          />
          <button class="reply-submit-btn mobile-btn">REPLY</button>
        </div>
        <textarea cols="30" rows="5" placeholder="Reply..."></textarea>
        <button class="reply-submit-btn desktop-btn">REPLY</button>
      </div>`;

      commentSection.append(commentToAdd);

      if (replies.length !== 0) {
        let rsta = `<div class="reply-section">
        <div class="line"></div>
        <div class="reply-container"></div>
        </div>`;
        document.querySelector(`#c${comment.id}`).innerHTML += rsta;
        replies.forEach((reply) => {
          let replyToAdd = document.createElement("div");
          replyToAdd.className = `reply editable-reply`;
          replyToAdd.id = `r${reply.id}`;
          replyToAdd.innerHTML = `
          <div class="rating-container">
            <div class="rating" data-score="${reply.score}">
              <button class="like"><i class="fas fa-plus"></i></button>
              <div class="rating-display">${reply.newScore}</div>
              <button class="dislike"><i class="fas fa-minus"></i></button>
            </div>
            <button class="reply-initiate-btn mobile-btn">
              <i class="fas fa-reply"></i> Reply
            </button>

            <div class="user-exclusive-btns mobile-btn">
              <button class="delete-btn">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="edit-btn">
                <i class="fas fa-marker"></i> Edit
              </button>
            </div>
          </div>
          <div class="content">
            <div class="heading">
              <div class="heading-content">
                <img
                  src=${reply.user.image.png}
                  alt=""
                  class="avatar"
                />
                <h3>${reply.user.username}</h3>
                <span class="you">you</span>
                <span class="date">${reply.createdAt}</span>
              </div>
              <button class="reply-initiate-btn desktop-btn">
                <i class="fas fa-reply"></i> Reply
              </button>

              <div class="user-exclusive-btns desktop-btn">
              <button class="delete-btn">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="edit-btn">
                <i class="fas fa-marker"></i> Edit
              </button>
            </div>
            </div>
            <p class="reply-text" contenteditable="false">
            <span class="mentioned" contenteditable="false">@${reply.replyingTo}</span> ${reply.content}
            </p>

            <button class="update-btn">UPDATE</button>
          </div>`;
          document
            .querySelector(`#c${comment.id} .reply-container`)
            .append(replyToAdd);

          if (reply.user.username === currentUser.username) {
            document.querySelector(`#r${reply.id}`).classList.add("the-user");
          }
        });
      }
      if (comment.user.username === currentUser.username) {
        document.querySelector(`#c${comment.id}`).classList.add("the-user");
      }
    });
  })
  .then(() => {
    let overlay = document.querySelector(".overlay");
    const replyInitBtns = document.querySelectorAll(".reply-initiate-btn");
    const updateBtns = document.querySelectorAll(".update-btn");
    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");
    const commentContainers = document.querySelectorAll(".comment-container");
    const tempReplies = document.querySelectorAll(".reply-temporary");
    const editableComments = document.querySelectorAll(".editable-comment");
    const editableReplies = document.querySelectorAll(".editable-reply");
    let optionNoBtn = document.querySelector(".option-no");
    let optionYesBtn = document.querySelector(".option-yes");
    let overlayAnim = gsap
      .timeline({ reversed: true })
      .to(".overlay", { display: "flex", duration: 0.001 })
      .to(".overlay", { opacity: 1, duration: 0.125 })
      .to(".popup", { scale: 1, opacity: 1, duration: 0.25 });
    let commentAssociatedR;

    //the piece that works when replyInitiate buttons are clicked

    replyInitBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        replyInitBtns.forEach((b) => {
          b.classList.remove("reply-active");
        });
        btn.classList.add("reply-active");

        commentContainers.forEach((comment) => {
          if (comment.contains(e.target)) {
            commentAssociatedR = comment;
          }
        });

        const show = gsap
          .timeline({ reversed: true })
          .to(`#${commentAssociatedR.id} .reply-temporary`, {
            display: "flex",
            duration: 0.0001,
          })
          .to(`#${commentAssociatedR.id} .reply-temporary`, {
            padding: "1rem",
            height: "auto",
            duration: 0.05,
            ease: "linear",
            scale: 1,
          });

        const hide = gsap
          .timeline({ reversed: true })
          .to(
            `.comment-container:not(#${commentAssociatedR.id}) .reply-temporary`,
            {
              padding: "0",
              height: "0",
              duration: 0.05,
              ease: "linear",
              scale: 0.85,
            }
          )
          .to(
            `.comment-container:not(#${commentAssociatedR.id}) .reply-temporary`,
            {
              display: "none",
            },
            ">-.125"
          );

        tempReplies.forEach((rep) => {
          if (!commentAssociatedR.contains(rep)) {
            hide.play();
          }
          show.play();
          setTimeout(() => {
            document
              .querySelector(
                `#${commentAssociatedR.id} .reply-temporary textarea`
              )
              .focus();
          }, 250);
        });
      });
    });

    //the piece that works edit buttons are clicked

    editBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.add("unclickable");

        let stats;
        /*first checks replies to see if they contain the target button to then give "edit"
        class to the reply, if not, it gives the "edit"
        class name to any of the comments that contains the clicked button*/
        editableReplies.forEach((reply) => {
          if (reply.contains(btn)) {
            stats = {
              hasTarget: true,
              elem: document.querySelector(`#${reply.id}`),
            };
          } else {
            stats = { hasTarget: false, elem: null };
          }
        });

        switch (stats.hasTarget) {
          case true:
            let textBox = document.querySelector(`#${stats.elem.id} p`);
            stats.elem.classList.add("edit");

            textBox.setAttribute("contenteditable", "true");
            textBox.focus();
            console.log(stats.elem);
            break;
          case false:
            editableComments.forEach((cm) => {
              cm.children[0].classList.remove("edit");
              if (
                cm.contains(btn) &&
                !cm.contains(document.querySelector(".edit"))
              ) {
                let textBox = document.querySelector(`#${cm.id} p`);
                cm.children[0].classList.add("edit");

                textBox.setAttribute("contenteditable", "true");
                textBox.focus();
              }
            });
            break;
        }
      });
    });

    //the piece that works for the update buttons

    updateBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (btn.closest(".reply") != null) {
          btn.closest(".reply").classList.remove("edit");

          document
            .querySelectorAll(`#${btn.closest(".reply").id} .edit-btn`)
            .forEach((b) => {
              b.classList.remove("unclickable");
            });
        } else {
          btn.closest(".comment").classList.remove("edit");
          document
            .querySelectorAll(
              `#${btn.closest(".comment-container").id} .edit-btn`
            )
            .forEach((b) => {
              b.classList.remove("unclickable");
            });
        }
        btn
          .closest(".content")
          .children[1].setAttribute("contenteditable", "false");
      });
    });

    //the piece that works for the delete buttons

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.closest(".reply") != null) {
          overlay.id = `del-${btn.closest(".reply").id}`;
        } else {
          overlay.id = `del-${btn.closest(".comment-container").id}`;
        }

        overlayAnim.play();
      });
    });

    //the piece that works for No option

    optionNoBtn.addEventListener("click", () => {
      overlayAnim.reverse();
    });

    //the piece that works for Yes option

    optionYesBtn.addEventListener("click", () => {
      let toBeDeletedId = overlay.id.slice(4);
      let toBeDeleted = document.querySelector(`#${toBeDeletedId}`);

      if (toBeDeleted.classList.contains("reply")) {
        toBeDeleted.closest(".reply-container").removeChild(toBeDeleted);
      } else {
        toBeDeleted.closest(".comments-section").removeChild(toBeDeleted);
      }
      overlayAnim.reverse();
      console.log(toBeDeletedId);
    });
  })
  .then(() => {
    sendBtns.forEach((sendBtn) => {
      sendBtn.addEventListener("click", () => {
        let addToJson = {
          id: comments.length++,
          content: sendCommentTextarea.innerText,
          createdAt: "now",
          score: 0,
          newScore: 0,
          user: {
            images: {
              png: currentUser.image.png,
              webp: currentUser.image.webp,
            },
          },
          username: currentUser.username,
        };
        let commentToAdd = document.createElement("div");

        commentToAdd.className = `comment-container editable-comment`;
        commentToAdd.id = `c${comments.length++}`;

        commentToAdd.innerHTML = `<div class="comment the-user">
          <div class="rating-container">
            <div class="rating" data-score="0">
              <button class="like"><i class="fas fa-plus"></i></button>
              <div class="rating-display">0</div>
              <button class="dislike"><i class="fas fa-minus"></i></button>
            </div>
        
            <button class="reply-initiate-btn mobile-btn">
              <i class="fas fa-reply"></i> Reply
            </button>
        
            <div class="user-exclusive-btns mobile-btn">
              <button class="delete-btn">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="edit-btn">
                <i class="fas fa-marker"></i> Edit
              </button>
            </div>
          </div>
          <div class="content">
            <div class="heading">
              <div class="heading-content">
                <img
                  src="${currentUser.image.png}"
                  alt=""
                  class="avatar"
                />
                <h3>${currentUser.username}</h3>
                <span class="you">you</span>
                <span class="date">1 minute ago</span>
              </div>
              <button class="reply-initiate-btn desktop-btn">
                <i class="fas fa-reply"></i> Reply
              </button>
        
              <div class="user-exclusive-btns desktop-btn">
                <button class="delete-btn">
                  <i class="fas fa-trash"></i> Delete
                </button>
                <button class="edit-btn">
                  <i class="fas fa-marker"></i> Edit
                </button>
              </div>
            </div>
            <p contenteditable="false" class="comment-text">
            ${sendCommentTextarea.innerText}
            </p>
        
            <button class="update-btn">UPDATE</button>
          </div>
        </div>
        
        <div class="reply-temporary">
          <div class="temp-inner">
            <img
              src="${currentUser.image.png}"
              alt=""
              class="avatar"
            />
            <button class="reply-submit-btn mobile-btn">REPLY</button>
          </div>
          <textarea cols="30" rows="5" placeholder="Reply..."></textarea>
          <button class="reply-submit-btn desktop-btn">REPLY</button>
        </div>`;
        //commentSection.append(commentToAdd);

        sessionStorage.setItem(
          `${comments.length}`,
          JSON.stringify(commentToAdd)
        );
        comments.push(addToJson);
      });
    });
  })
  .then(() => {
    let ratings = document.querySelectorAll(".rating");

    ratings.forEach((rating) => {
      rating.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("like") &&
          rating.dataset.score >= rating.children[1].textContent
        ) {
          if (rating.dataset.score === rating.children[1].textContent) {
            e.target.classList.add("liked");
            e.target.classList.remove("disliked");
          }

          rating.children[1].textContent++;
        }
        if (
          e.target.classList.contains("dislike") &&
          rating.dataset.score <= rating.children[1].textContent
        ) {
          if (rating.dataset.score === rating.children[1].textContent) {
            e.target.classList.add("disliked");
            e.target.classList.remove("liked");
          }

          rating.children[1].textContent--;
        }
        if (rating.dataset.score !== rating.children[1].textContent) {
          rating.children[1].style.animation = "zoom 0.5s ease forwards";
          rating.children[1].addEventListener("animationend", () => {
            rating.children[1].style.animation = "none";
          });
        }
      });
    });
  });
