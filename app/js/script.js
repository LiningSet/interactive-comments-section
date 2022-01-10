/*all major variable declarations 
including those that will be re-defined after data being feched*/

const commentSection = document.querySelector(".comments-section");
const sendAvatar = document.querySelector(".send-inner .avatar");
const sendComment = document.querySelector(".send-comment");
const sendCommentTextarea = document.querySelector(".send-comment textarea");
const sendBtns = document.querySelectorAll(".send-submit-btn");
let overlay;
let replyInitBtns;
let replySubmitBtns;
let updateBtns;
let editBtns;
let deleteBtns;
let tempReplies;
let editableComments;
let editableReplies;
let optionNoBtn;
let optionYesBtn;
let ratings;
let commentContainers;
let replySection;
let currentUser;
let comments;
let replies;
let currentComment;
let listenToButtons;

fetch("/interactive-comments-section-main/app/js/data.json")
  .then((response) => response.json())
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
        <textarea cols="30" rows="5" placeholder="Reply..." spellcheck="false"></textarea>
        <button class="reply-submit-btn desktop-btn">REPLY</button>
      </div>
      
      <div class="reply-section">
        <div class="line"></div>
        <div class="reply-container"></div>
        </div>`;

      commentSection.append(commentToAdd);

      if (replies.length !== 0) {
        commentToAdd.querySelector(".reply-section").style.display = "flex";
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
    /*this specific variable requires to be in this lexical environment to allow code 
    to execute as it should*/
    let replyingTo;

    function reNew() {
      overlay = document.querySelector(".overlay");
      replyInitBtns = document.querySelectorAll(".reply-initiate-btn");
      replySubmitBtns = document.querySelectorAll(".reply-submit-btn");
      updateBtns = document.querySelectorAll(".update-btn");
      editBtns = document.querySelectorAll(".edit-btn");
      deleteBtns = document.querySelectorAll(".delete-btn");
      commentContainers = document.querySelectorAll(".comment-container");
      tempReplies = document.querySelectorAll(".reply-temporary");
      editableComments = document.querySelectorAll(".editable-comment");
      editableReplies = document.querySelectorAll(".editable-reply");
      optionNoBtn = document.querySelector(".option-no");
      optionYesBtn = document.querySelector(".option-yes");
      ratings = document.querySelectorAll(".rating");
    }
    listenToButtons = function () {
      reNew();
      let overlayAnim = gsap
        .timeline({ reversed: true })
        .to(".overlay", { display: "flex", duration: 0.001 })
        .to(".overlay", { opacity: 1, duration: 0.125 })
        .to(".popup", { scale: 1, opacity: 1, duration: 0.25 });
      let commentAssociatedR;

      //the piece that works when replyInitiate buttons are clicked

      replyInitBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          commentAssociatedR = e.target.closest(".comment-container");
          if (e.target.closest(".reply") === null) {
            replyingTo = commentAssociatedR.querySelector(
              ".heading-content h3"
            );
          } else {
            replyingTo = e.target
              .closest(".reply")
              .querySelector(".heading-content h3");
          }

          //replyingTo = commentAssociatedR.querySelector(".heading-content h3");

          console.log(replyingTo.innerText);

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
              commentAssociatedR.querySelector("textarea").focus();
            }, 250);
          });

          commentAssociatedR.querySelector(
            "textarea"
          ).value = `@${replyingTo.innerText} `;
        });
      });

      //the piece that works when replySubmit buttons are clicked

      replySubmitBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let target = e.target;
          let tempAssociated = target.closest(".reply-temporary");
          let rootCommentParent = target.closest(".comment-container");
          let replyContAssociated = document.querySelector(
            `#${rootCommentParent.id} .reply-container`
          );
          let textField = tempAssociated.querySelector("textarea");
          let replyData = {
            id: `${
              rootCommentParent.id
            }-${(replyContAssociated.children.length += 1)}`.substring(1),
            content: textField.value.replace(`@${replyingTo.innerText} `, ""),
            createdAt: "Now",
            score: 0,
            newScore: 0,
            replyingTo: replyingTo.innerText,
            user: {
              image: {
                png: currentUser.image.png,
                webp: currentUser.image.webp,
              },
              username: currentUser.username,
            },
          };

          sessionStorage.setItem(`${replyData.id}`, JSON.stringify(replyData));
          console.log(tempAssociated, replyData, textField.value);
          //textField.value = "";
          location.reload();
        });
      });

      //the piece that works edit buttons are clicked

      editBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".edit-btn")
            .forEach((b) => b.classList.remove("unclickable"));
          btn.classList.add("unclickable");

          /*directly adds the edit class to whichever comment or reply that contain the btn AND 
          have the "the-user" class in their classlist*/

          document
            .querySelectorAll(".the-user")
            .forEach((el) => el.classList.remove("edit"));
          btn.closest(".the-user").classList.add("edit");
          setTimeout(() => {
            document
              .querySelectorAll(".the-user p")
              .forEach((p) => p.setAttribute("contenteditable", "none"));
            btn
              .closest(".the-user")
              .querySelector("p")
              .setAttribute("contenteditable", "true");
            btn.closest(".the-user").querySelector("p").focus();
          }, 250);
        });
      });

      //the piece that works for the update buttons

      updateBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          btn
            .closest(".the-user")
            .querySelectorAll(".edit-btn")
            .forEach((b) => b.classList.remove("unclickable"));
          btn.closest(".the-user").classList.remove("edit");
          btn
            .closest(".the-user")
            .querySelector("p")
            .setAttribute("contenteditable", "false");
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
          document.body.style.overflow = "hidden";
        });
      });

      //the piece that works for No option

      optionNoBtn.addEventListener("click", () => {
        overlayAnim.reverse();
        document.body.style.overflow = "visible";
      });

      //the piece that works for Yes option

      optionYesBtn.addEventListener("click", () => {
        let toBeDeletedId = overlay.id.slice(4);
        let toBeDeleted = document.querySelector(`#${toBeDeletedId}`);

        if (toBeDeleted.classList.contains("reply")) {
          toBeDeleted.closest(".reply-container").removeChild(toBeDeleted);
          sessionStorage.removeItem(toBeDeletedId.slice(1));
        } else {
          toBeDeleted.closest(".comments-section").removeChild(toBeDeleted);
          sessionStorage.removeItem(toBeDeletedId.slice(1));
        }

        overlayAnim.reverse();
        document.body.style.overflow = "visible";

        location.reload();
      });

      //the piece that works for like and dislike buttons

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
    };

    listenToButtons();

    sendBtns.forEach((sendBtn) => {
      sendBtn.addEventListener("click", () => {
        let newCommentData = {
          id: (commentContainers.length += 1),
          content: sendCommentTextarea.value,
          createdAt: "Now",
          score: 0,
          newScore: 0,
          user: {
            image: {
              png: currentUser.image.png,
              webp: currentUser.image.webp,
            },
            username: currentUser.username,
          },
          replies: [],
        };

        sessionStorage.setItem(
          `${newCommentData.id}`,
          JSON.stringify(newCommentData)
        );

        sendCommentTextarea.value = "";
        location.reload();
      });
    });
  })
  .then(() => {
    let storageKeys = Object.keys(sessionStorage);

    let keysArrayCm = storageKeys.filter((key) => {
      return !isNaN(Number(key));
    });

    let keysArrayRp = storageKeys.filter((key) => {
      return key.includes("-") && key.length <= 5;
    });

    keysArrayCm.forEach((key) => {
      let recieved = sessionStorage.getItem(key);
      let parsed = JSON.parse(recieved);

      let element = document.createElement("div");

      element.id = `c${parsed.id}`;
      element.className = `comment-container editable-comment`;
      element.innerHTML = `
      <div class="comment the-user">
      <div class="rating-container">
        <div class="rating" data-score="${parsed.score}">
          <button class="like"><i class="fas fa-plus"></i></button>
          <div class="rating-display">${parsed.newScore}</div>
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
              src=${parsed.user.image.png}
              alt=""
              class="avatar"
            />
            <h3>${parsed.user.username}</h3>
            <span class="you">you</span>
            <span class="date">${parsed.createdAt}</span>
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
        ${parsed.content}
        </p>
    
        <button class="update-btn">UPDATE</button>
      </div>
      </div>
    
      <div class="reply-temporary">
      <div class="temp-inner">
        <img
          src=${parsed.user.image.png}
          alt=""
          class="avatar"
        />
        <button class="reply-submit-btn mobile-btn">REPLY</button>
      </div>
      <textarea cols="30" rows="5" placeholder="Reply..." spellcheck="false"></textarea>
      <button class="reply-submit-btn desktop-btn">REPLY</button>
      </div>
    
      <div class="reply-section">
        <div class="line"></div>
        <div class="reply-container"></div>
        </div>`;

      commentSection.append(element);
      listenToButtons();
    });

    keysArrayRp.forEach((key) => {
      let recieved = sessionStorage.getItem(key);
      let parsed = JSON.parse(recieved);
      let inside = document.querySelector(`#c${parsed.id[0]}`);
      let element = document.createElement("div");

      element.id = `r${parsed.id}`;
      element.className = `reply editable-reply the-user`;
      element.innerHTML = `
      <div class="rating-container">
        <div class="rating" data-score="${parsed.score}">
          <button class="like"><i class="fas fa-plus"></i></button>
          <div class="rating-display">${parsed.newScore}</div>
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
              src=${parsed.user.image.png}
              alt=""
              class="avatar"
            />
            <h3>${parsed.user.username}</h3>
            <span class="you">you</span>
            <span class="date">${parsed.createdAt}</span>
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
        <span class="mentioned" contenteditable="false">@${parsed.replyingTo}</span> ${parsed.content}
        </p>

        <button class="update-btn">UPDATE</button>
      </div>`;

      inside.querySelector(".reply-container").append(element);
      listenToButtons();
    });

    commentContainers.forEach((cm) => {
      if (cm.querySelector(".reply-container").children.length === 0) {
        cm.querySelector(".reply-section").style.display = "none";
      } else {
        cm.querySelector(".reply-section").style.display = "flex";
      }
    });

    console.log(keysArrayCm, keysArrayRp);
  });
