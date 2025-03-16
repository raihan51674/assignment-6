//Login

const mainDiv = document.getElementById("main");
// const toggleBtn = document.getElementById("toggleBtn");
const loginSection = document.getElementById("loginSection");

function login(event) {
  event.preventDefault();
  let name = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  // Simple login validation
  if (pass === "123456") {
    // Hide the login section and show the main div
    loginSection.classList.add("hidden");
    mainDiv.classList.remove("hidden");
    // toggleBtn.classList.remove("hidden");
    // toggleBtn.textContent = "Hide"; // Button text for hiding the div
    mainDiv.setAttribute("aria-hidden", "false"); // Update accessibility
  } else {
    alert("Password is incorrect. Type: '123456'");
  }
}



// FAQ section
const faqButtons = document.querySelectorAll('button');
faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;

    content.classList.toggle('hidden');


    const span = button.querySelector('span:last-child');
    if (content.classList.contains('hidden')) {
      span.textContent = '+';
    } else {
      span.textContent = '-';
    }
  });
});


//scroll
document.addEventListener("DOMContentLoaded", function() {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".nav-link");

  // Scroll to 'About' on load
  document.getElementById("learn").scrollIntoView({ behavior: "smooth" });

  window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;

    sections.forEach((sec) => {
      let offset = sec.offsetTop - 100;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (scrollPosition >= offset && scrollPosition < offset + height) {
        navLinks.forEach((link) => link.classList.remove("text-coral-500", "font-bold"));
        document.querySelector(`.nav-link[href="#${id}"]`).classList.add("text-coral-500", "font-bold");
      }
    });
  });
});








//Lesson data

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((dt) => {
      console.log(dt);

      if (dt?.data) {
        // Modify lesson names before displaying
        const updatedData = dt.data.map((lesson) => {
          if (lesson.id === 101) {
            lesson.lessonName = "Lesson-1"; // Rename Level 6
          } else if (lesson.id === 102) {
            lesson.lessonName = "Lesson-2"; // Rename Level 7
          }
          else if (lesson.id === 103) {
            lesson.lessonName = "Lesson-3"; // Rename Level 7
          }
          else if (lesson.id === 104) {
            lesson.lessonName = "Lesson-4"; // Rename Level 7
          }
          else if (lesson.id === 105) {
            lesson.lessonName = "Lesson-5"; // Rename Level 7
          }
          else if (lesson.id === 106) {
            lesson.lessonName = "Lesson-6"; // Rename Level 7
          }
          else if (lesson.id === 107) {
            lesson.lessonName = "Lesson-7"; // Rename Level 7
          }
          return lesson;
        });



        DisplyCategory(updatedData);
      }
      // Debugging: Check API response

    })

};

const DisplyCategory = (data) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = ""; // Clear previous categories

  for (let lesson of data) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
            <button id="btn-${lesson.category_id}" 
                onClick="loadCategoryVideo(${lesson.category_id})"
                class="btn px-3 bg-slate-400 text-black hover:btn-primary text-xl hover:text-white font-semibold border-none">
                ${lesson.lessonName}
            </button>`
        ;
    categoryContainer.append(categoryDiv);
  }
};

















