//Login

const mainDiv = document.getElementById("main");

const loginSection = document.getElementById("loginSection");

function login(event) {
  event.preventDefault();
  let name = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  
  if (pass === "123456") {
    
    loginSection.classList.add("hidden");
    mainDiv.classList.remove("hidden");
    
    mainDiv.setAttribute("aria-hidden", "false"); 
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
      let offset = sec.offsetTop - 50;
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

   document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("no-data-message").classList.remove("hidden");
  document.getElementById("lesson-container").classList.add("hidden");
  });

const loadCategoryLesson=(level_no)=>{
  
  const url =`https://openapi.programming-hero.com/api/level/${level_no}`
  console.log(url);
  fetch(url)
  .then((res)=>res.json())
  .then((dt)=> {
   

    




  

    
    document.getElementById("no-data-message").classList.add("hidden");
    document.getElementById("lesson-container").classList.remove("hidden");
    displayLesson(dt.data)

  }
  )
  
}

const DisplyCategory = (data) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = ""; // Clear previous categories

  for (let lesson of data) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
            <button id="btn-${lesson.level_no}" 
                onClick="loadCategoryLesson(${lesson.level_no})"
                class="btn px-3 bg-slate-400 text-black hover:btn-primary text-xl hover:text-white font-semibold border-none">
                ${lesson.lessonName}
            </button>`
        ;
    categoryContainer.append(categoryDiv);
  }
};
loadCategories()


//card load

function loadLesson(){
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((res)=>res.json())
  .then((dt)=>{
    displayLesson(dt.data);
    
  })
}

const displayLesson=(data)=>{
  // console.log(data);
  
  const videoContainer =document.getElementById("lesson-container")

  videoContainer.innerHTML=""

   if(data.length==0){
    videoContainer.innerHTML=`
       
     <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
       <img src="./assets/alert-error.png" alt="">
       <h2 class="text-2xl font-bold">Ooh Sorry ! there is no content here</h2>
    </div>
    
    `


    return
   }




  data.forEach((lesson)=>{
    console.log(lesson);
    const lessonCard = document.createElement('div')
    lessonCard.innerHTML=`
    

          <div class=" bg-white text-black flex flex-col items-center text-center rounded-md">
          <div class=" px-3 py-7 flex flex-col gap-5">
            <h2 class=" font-bold text-[32px]">${lesson.word}</h2>
            <p class="font-medium text-[20px]">Meaning / Pronunciation</p>
            <h2 class=" font-semibold text-[32px] object-cover">"${lesson.meaning}/${lesson.pronunciation}"</h2>
            <div class="pt-8 flex justify-between">
              <button class="btn px-3 py-3 border-none bg-gray-300"><img class="w-[30px] h-[30px] " src="https://img.icons8.com/?size=48&id=BzHWSXaTEkEv&format=png" alt=""></button>
              <button class="btn px-3 py-3 border-none bg-gray-300"><img class="w-[30px] h-[30px] " src="https://img.icons8.com/?size=100&id=41563&format=png" alt=""></button>
            </div>
          </div>
        </div>
    
    `
    videoContainer.append(lessonCard)
  })

}
loadLesson()




















