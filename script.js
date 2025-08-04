//scroll navbar
window.onscroll = function () {
  const nav = document.querySelector(".navbar-items");
  const header = document.querySelector(".header");

  //كم عامل سكرول

  if (window.scrollY > header.offsetTop) {
    nav.classList.add("scrollNav");
  } else {
    nav.classList.remove("scrollNav");
  }
};

// toggle mode

function darkMode() {
  document.querySelector("body").classList.toggle("dark");

  document.querySelector("body").classList.toggle("light");
  document.querySelector(".add-btn").classList.toggle("buttondark");
}
document.querySelector(".dark-btn").addEventListener("click", darkMode);
document.querySelector(".light-btn").addEventListener("click", darkMode);

// add tasks

const DeleteBtn= document.querySelector("#deleteCompletedBtn");
const dropbtn = document.querySelector(".dropbtn");
const task = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-btn");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
 let completedTasks = JSON.parse(localStorage.getItem("completedTasks") || "[]");
 let currentFilter = "all";
sorted =[];
DisplayTasks();
addBtn.addEventListener("click", () => {
  const taskText = task.value.trim();

  if (!taskText) return;

  tasks.push(taskText);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  task.value = "";
  DisplayTasks();
  //ينقلني عقائمة المهام
  window.location.href="#all-tasks"
});


// show all tasks

function DisplayTasks() {
 dropbtn.innerHTML=`${currentFilter}<i class="fa-solid fa-caret-down">`;
  if(currentFilter=="completed"){
    sorted=tasks.filter(task => completedTasks.includes(task));
     
  }else if(currentFilter=="not-Completed"){
    sorted=tasks.filter(task => !completedTasks.includes(task) );
  }else{
    sorted=tasks
  }
  const result = sorted
    .map((task, index) => {
      const isCompleted = completedTasks.includes(task); 
      return `
        <div class="task">
          <button class="comp">
            <i class="fa-regular ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
            <span class="task-item ${isCompleted ? 'completedTask' : ''}">${task}</span>
          </button>
          <button class="delete" data-index=${index}><i class="fa-regular fa-trash-can"></i></button>
        </div>
      `;
    })
    .join("");
  
  document.querySelector(".task-list").innerHTML = result;

  addCompleteListeners();
  addDeleteListeners();
}

//filters
document.querySelector(".show-completed").addEventListener("click", ()=>{
  currentFilter="completed";
  DisplayTasks();

});
document.querySelector(".show-notCompleted").addEventListener("click", ()=>{
  currentFilter="not-Completed";
  DisplayTasks();

});
document.querySelector(".show-all").addEventListener("click", ()=>{
  currentFilter="all";
  DisplayTasks();

});



 //completed tasks
function addCompleteListeners() {
  document.querySelectorAll(".comp").forEach((btn) => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i");
      const complete = icon.classList.toggle("fa-circle-check");
      icon.classList.toggle("fa-circle");

      const taskTextElem = btn.querySelector(".task-item");
      taskTextElem.classList.toggle("completedTask");

      const taskText = taskTextElem.textContent.trim();

      if (complete) {
        if (!completedTasks.includes(taskText)) {
          completedTasks.push(taskText);
        }
      } else {
        completedTasks = completedTasks.filter(task => task !== taskText);
      }

      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

     
    });
  });
}



//delete task
//splice ممكن استخدم كمان
function addDeleteListeners() {
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const taskText = btn.parentElement.querySelector(".task-item").textContent.trim();

      tasks = tasks.filter((task, i) => i !== index);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      completedTasks = completedTasks.filter(task => task !== taskText);
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

      DisplayTasks();
    });
  });
}

// delete all completed

DeleteBtn.addEventListener("click",()=>{

  //مرّ على كل مهمة موجودة في tasks، وخلي فقط المهام اللي مش موجودة في completedTask
   tasks = tasks.filter(task => !completedTasks.includes(task));
  completedTasks = [ ];
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
   localStorage.setItem("completedTasks", JSON.stringify(completedTasks)); 
      DisplayTasks();
})

