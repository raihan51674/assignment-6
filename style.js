












 //login section

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
 
 
 
 
 
 //scroll section
 document.addEventListener("DOMContentLoaded", function() {
   let sections = document.querySelectorAll("section");
   let navLinks = document.querySelectorAll(".nav-link");
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
 
 
 
 
 
 
 
 
 //Lesson all data show
 
 const loadCategories = () => {
   fetch("https://openapi.programming-hero.com/api/levels/all")
     .then((res) => res.json())
     .then((dt) => {
       console.log(dt);
 
       if (dt?.data) {
         
         const updatedData = dt.data.map((lesson) => {
           if (lesson.id === 101) {
             lesson.lessonName = "Lesson-1"; 
           } else if (lesson.id === 102) {
             lesson.lessonName = "Lesson-2"; 
           }
           else if (lesson.id === 103) {
             lesson.lessonName = "Lesson-3"; 
           }
           else if (lesson.id === 104) {
             lesson.lessonName = "Lesson-4"; 
           }
           else if (lesson.id === 105) {
             lesson.lessonName = "Lesson-5"; 
           }
           else if (lesson.id === 106) {
             lesson.lessonName = "Lesson-6"; 
           }
           else if (lesson.id === 107) {
             lesson.lessonName = "Lesson-7"; 
           }
           return lesson;
         });
 
 
 
         DisplyCategory(updatedData);
       }
       
 
     })
 
 };
 
 
 
    document.addEventListener("DOMContentLoaded", () => {
   document.getElementById("no-data-message").classList.remove("hidden");
   document.getElementById("lesson-container").classList.add("hidden");
   });
 
   //load all lesson category
 
 const loadCategoryLesson=(level_no)=>{
   
   const url =`https://openapi.programming-hero.com/api/level/${level_no}`
   console.log(url);
   fetch(url)
   .then((res)=>res.json())
   .then((dt)=> {
 
     document.querySelectorAll("#category-container button").forEach(btn => {
       btn.classList.remove("active");
   });
    
     const clickedButton = document.getElementById(`btn-${level_no}`);
     console.log(clickedButton);
     
       clickedButton.classList.add("active");
 
     
     document.getElementById("no-data-message").classList.add("hidden");
     document.getElementById("lesson-container").classList.remove("hidden");
     displayLesson(dt.data)
 
   }
   )
   
 }
 
 //lesson details popup
 
 const loadLessonDetails=(lessonId)=>{
   const url =`https://openapi.programming-hero.com/api/word/${lessonId}`
   fetch(url)
   .then((res)=>res.json())
   .then((dt)=>DisplayLessonDetails(dt.data)
   )
   
   
 }
 
 const DisplayLessonDetails=(lesson)=>{
   console.log(lesson);
   document.getElementById("lesson_details").showModal();
   const DetailsContainer = document.getElementById("details-container")
   DetailsContainer.innerHTML=`
   <div class="card card-dash bg-base-100  box-border ">
           <div class="flex flex-col gap-5">
             <h2 class=" font-bold text-[30px]">${lesson.word} (<i class="fa-solid fa-microphone"></i> :${lesson.pronunciation})</h2>
             <h2 class="text-[22px] font-bold">Meaning</h2>
             <h3 class="text-[24px] font-medium">${lesson.meaning}</h3>
             <h2 class="text-[24px] font-bold">Example</h2>
         
             <p class="text-[24px] font-normal">${lesson.sentence}</p>
             <h2 class="text-[24px] font-semibold">সমার্থক শব্দ গুলো</h2>
             <div class="flex flex-row gap-3 text-center items-center">
             <p class="text-[22px] font-normal rounded-md bg-[#D7E4EF] px-3 py-2">${lesson.synonyms[0]}</p> <p class="text-[22px] rounded-md bg-[#D7E4EF] font-normal px-3 py-2">${lesson.synonyms[1]}</p> <p class="text-[22px] rounded-md bg-[#D7E4EF] font-normal px-3 py-2">${lesson.synonyms[2]}</p>
             
             </div>
            
           </div>
            </div>
   
   `
   
 
 }
 
 
 //display all button
 const DisplyCategory = (data) => {
   const categoryContainer = document.getElementById("category-container");
   categoryContainer.innerHTML = ""; // Clear previous categories
 
   for (let lesson of data) {
     const categoryDiv = document.createElement("div");
     categoryDiv.innerHTML = `
             <button id="btn-${lesson.level_no}" 
                 onClick="loadCategoryLesson(${lesson.level_no})"
                 class=" rounded-md pl-2 pr-2 border-2 border-indigo-500/100 text-[#422AD5] hover:bg-[#422AD5] text-[18px] hover:text-white items-center flex"><i class="fa-solid fa-book-open"></i>
                 ${lesson.lessonName}
             </button>`
         ;
     categoryContainer.append(categoryDiv);
   }
 };
 loadCategories()
 
 
 // all card load
 
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
        
      <div class="py-5 bg-[#F8F8F8] col-span-full flex flex-col gap-5 justify-center items-center text-center">
        <img src="./assets/alert-error.png" alt="">
        <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
     </div>
     
     `
 
 
     return
    }
 
 
 
 
   data.forEach((lesson)=>{
     console.log(lesson);
     const lessonCard = document.createElement('div')
     lessonCard.innerHTML=`
     
 
           <div class="bg-gray-100 text-black flex flex-col gap-5 border-2 rounded-md w-[380px] h-[300px] flex-shrink-0 justify-between p-5">
         <div class="flex flex-col gap-5 items-center text-center">
          <h2 class="font-bold text-2xl">${lesson.word}</h2>
         <p class="font-medium text-lg">Meaning / Pronunciation</p>
         <h2 class="font-semibold text-xl">"${lesson.meaning} / ${lesson.pronunciation}"</h2>
        </div>
 
         <div class="flex justify-between">
         <button onClick="loadLessonDetails('${lesson.id}')" class="btn text-2xl p-3 border-none bg-gray-300 rounded-md hover:bg-gray-400">
          <i class="fa-solid fa-circle-info"></i>
         </button>
            <button onClick="speakWord('${lesson.word}')" class="btn text-2xl p-3 border-none bg-gray-300 rounded-md hover:bg-gray-400">
             <i class="fa-solid fa-volume-high"></i>
 
 
 
         </button>
         </div>
        </div>
 
     
     `
     videoContainer.append(lessonCard)
   })
 
 }
 loadLesson()
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 