// File script.js - Logic JavaScript sẽ được viết ở các bước tiếp theo
let tasks= [
   {
    id: 1,
    title: "Sống dai",
    deadline:"2099-06-03",
    priority: "Cao",
    completed: false
   },
   {
    id: 2,
    title: "Tốt nghiệp đại học",
    deadline: "2028-05-31",
    priority:"Cao",
    completed: false
   },
   {
    id: 3,
    title: "Kiếm được 1 triệu Mỹ kim",
    deadline: "2077-01-01",
    priority: "Trung bình",
    completed: false
   },
   {
    id: 4,
    title: "Làm xong bài tập này",
    deadline: "2026-10-13",
    priority: "Cao",
    completed: true
   },
   {
    id: 5,
    title: "Đón Khá Bảnh ra tù",
    deadline: "2029-10",
    priority: "Thấp",
    completed: false
   },
];
const taskListElement = document.getElementById("task-list");
const searchInput    = document.getElementById("search-input");
const filterStatus   = document.getElementById("filter-status");

// Xác định class badge theo mức ưu tiên
function getBadgeClass(priority) {
  if (priority === "Cao")        return "badge badge-cao";
  if (priority === "Trung bình") return "badge badge-tb";
  return "badge badge-thap";
}

// Hàm render danh sách công việc ra giao diện
function renderTasks(list) {
  taskListElement.innerHTML = "";

  list.forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item" + (task.completed ? " completed" : "");
    taskItem.innerHTML = `
      <div class="task-info">
        <h3 style="${task.completed ? 'text-decoration: line-through; color:#aaa;' : ''}">
          ${task.title}
        </h3>
        <p>📅 Hạn: ${task.deadline || "Không có"} &nbsp;
           <span class="${getBadgeClass(task.priority)}">${task.priority}</span>
        </p>
        <p style="margin-top:4px;">
          ${task.completed
            ? '<span style="color:#2d6a4f; font-weight:600;">✅ Đã hoàn thành</span>'
            : '<span style="color:#e67e22; font-weight:600;">⏳ Chưa hoàn thành</span>'}
        </p>
      </div>
      <div class="task-actions">
        <button class="btn-toggle" onclick="toggleTask(${task.id})">
          ${task.completed ? "↩ Chưa xong" : "✔ Hoàn thành"}
        </button>
        <button class="btn-delete" onclick="deleteTask(${task.id})">🗑 Xóa</button>
      </div>
    `;
    taskListElement.appendChild(taskItem);
  });
}

// Hàm lọc và render theo từ khoá + trạng thái
function applyFilters() {
  const keyword = searchInput.value.toLowerCase().trim();
  const status  = filterStatus.value;

  const filtered = tasks.filter(task => {
    const matchName   = task.title.toLowerCase().includes(keyword);
    const matchStatus = status === "all"
      || (status === "completed"   &&  task.completed)
      || (status === "incomplete"  && !task.completed);
    return matchName && matchStatus;
  });

  renderTasks(filtered);
}

// Lắng nghe sự kiện tìm kiếm và lọc
searchInput.addEventListener("input", applyFilters);
filterStatus.addEventListener("change", applyFilters);

// Hiển thị lần đầu
renderTasks(tasks);

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
renderTasks(tasks);
  }
}
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
renderTasks(tasks); 
}

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const titleInput = document.getElementById("task-title");
  const deadlineInput = document.getElementById("task-deadline");
  const prioritySelect = document.getElementById("task-priority");

  const titleValue = titleInput.value.trim();


  if (titleValue === "") {
    alert("Vui lòng nhập tên công việc!");
    return;
  }


const newTask = {
    id: Date.now(),
    title: titleValue,
    deadline: deadlineInput.value,
    priority: prioritySelect.value,
    completed: false
  };

tasks.push(newTask);
renderTasks(tasks);

taskForm.reset();
});