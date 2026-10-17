import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCheck,
  Circle,
  ClipboardList,
  Clock3,
  Grip,
  LayoutGrid,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "taskflow-kanban-board-v1";
const COLUMNS = [
  { id: "todo", title: "To do", description: "Things on your list", icon: Circle, color: "blue" },
  { id: "progress", title: "In progress", description: "Work in motion", icon: Clock3, color: "amber" },
  { id: "done", title: "Done", description: "Look at you go", icon: CheckCheck, color: "green" },
];

const SEED_TASKS = [
  { id: "seed-1", title: "Outline project goals", description: "Write down the main outcomes and what success looks like.", priority: "high", tag: "Planning", status: "todo" },
  { id: "seed-2", title: "Collect inspiration", description: "Gather a few examples and references for the team.", priority: "medium", tag: "Research", status: "todo" },
  { id: "seed-3", title: "Set up shared workspace", description: "Create a home for project files and notes.", priority: "low", tag: "Setup", status: "todo" },
  { id: "seed-4", title: "Draft the first version", description: "Get a first pass ready for a quick review.", priority: "high", tag: "Design", status: "progress" },
  { id: "seed-5", title: "Check in with the team", description: "Share a short update and unblock open questions.", priority: "medium", tag: "Team", status: "progress" },
  { id: "seed-6", title: "Create project brief", description: "Capture the scope, audience, and key milestones.", priority: "low", tag: "Planning", status: "done" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "medium",
  tag: "",
  status: "todo",
};

function loadStoredBoard() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { tasks: SEED_TASKS, notice: "" };
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.some((task) => (
      !task
      || typeof task.id !== "string"
      || typeof task.title !== "string"
      || !COLUMNS.some((column) => column.id === task.status)
    ))) {
      return {
        tasks: SEED_TASKS,
        notice: "Saved board data could not be read, so the example board was restored.",
      };
    }
    return { tasks: parsed, notice: "" };
  } catch (error) {
    return {
      tasks: SEED_TASKS,
      notice: error instanceof SyntaxError
        ? "Saved board data was invalid, so the example board was restored."
        : "Browser storage is unavailable. Board changes may not persist after refresh.",
    };
  }
}

function TaskCard({ task, onEdit, onDelete, onDragStart, onDragEnd, dragging }) {
  return (
    <article
      className={`task-card${dragging ? " is-dragging" : ""}`}
      draggable="true"
      onDragStart={(event) => onDragStart(event, task)}
      onDragEnd={onDragEnd}
      aria-label={`${task.title}, ${task.priority} priority`}
    >
      <div className="task-card-top">
        <span className={`priority-dot priority-${task.priority}`} />
        <span className={`priority-label priority-text-${task.priority}`}>{task.priority} priority</span>
        <span className="drag-hint" aria-hidden="true"><Grip size={16} /></span>
        <div className="task-actions">
          <button type="button" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
            <Pencil size={14} />
          </button>
          <button className="delete-action" type="button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-card-footer">
        {task.tag ? <span className="task-tag">{task.tag}</span> : <span />}
        <span className="task-move-controls">
          {task.status !== "todo" && (
            <button type="button" aria-label={`Move ${task.title} to ${COLUMNS[COLUMNS.findIndex((column) => column.id === task.status) - 1].title}`} onClick={() => onEdit(task, "previous")}>
              <ArrowUp size={14} />
            </button>
          )}
          {task.status !== "done" && (
            <button type="button" aria-label={`Move ${task.title} to ${COLUMNS[COLUMNS.findIndex((column) => column.id === task.status) + 1].title}`} onClick={() => onEdit(task, "next")}>
              <ArrowDown size={14} />
            </button>
          )}
        </span>
      </div>
    </article>
  );
}

function TaskDialog({ task, initialStatus, onClose, onSave }) {
  const [form, setForm] = useState(task ? {
    title: task.title,
    description: task.description || "",
    priority: task.priority || "medium",
    tag: task.tag || "",
    status: task.status,
  } : { ...EMPTY_FORM, status: initialStatus });
  const [error, setError] = useState("");

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Give your task a short title before saving.");
      return;
    }
    onSave({ ...form, title: form.title.trim(), description: form.description.trim(), tag: form.tag.trim() });
  }

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <section
        className="task-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-heading">
          <div>
            <p className="dialog-eyebrow">{task ? "KEEP IT UP TO DATE" : "MAKE A LITTLE PROGRESS"}</p>
            <h2 id="dialog-title">{task ? "Edit task" : "Add a task"}</h2>
          </div>
          <button className="dialog-close" type="button" aria-label="Close dialog" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        <form onSubmit={submit}>
          <label className="dialog-field">
            <span>Task title <b aria-hidden="true">*</b></span>
            <input
              autoFocus
              value={form.title}
              onChange={(event) => {
                setForm((current) => ({ ...current, title: event.target.value }));
                if (error) setError("");
              }}
              placeholder="e.g. Plan the next team check-in"
              maxLength={100}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "task-title-error" : undefined}
            />
            {error && <small className="form-error" id="task-title-error">{error}</small>}
          </label>
          <label className="dialog-field">
            <span>Description <small>Optional</small></span>
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Add a little context so future-you knows what to do."
              rows="3"
              maxLength={300}
            />
          </label>
          <div className="dialog-fields-row">
            <label className="dialog-field">
              <span>Priority</span>
              <select value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="dialog-field">
              <span>Column</span>
              <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
                {COLUMNS.map((column) => <option key={column.id} value={column.id}>{column.title}</option>)}
              </select>
            </label>
          </div>
          <label className="dialog-field">
            <span>Label <small>Optional</small></span>
            <input
              value={form.tag}
              onChange={(event) => setForm((current) => ({ ...current, tag: event.target.value }))}
              placeholder="e.g. Design, Planning, Team"
              maxLength={24}
            />
          </label>
          <div className="dialog-actions">
            <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            <button className="save-button" type="submit">{task ? "Save changes" : "Add task"} <Check size={16} /></button>
          </div>
        </form>
      </section>
    </div>
  );
}

function App() {
  const [initial, setInitial] = useState(() => loadStoredBoard());
  const [tasks, setTasks] = useState(initial.tasks);
  const [storageNotice, setStorageNotice] = useState(initial.notice);
  const [dialog, setDialog] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dropTarget, setDropTarget] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      setStorageNotice("Could not save changes in this browser. Check its storage settings.");
    }
  }, [tasks]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const taskCounts = useMemo(
    () => Object.fromEntries(COLUMNS.map((column) => [
      column.id,
      tasks.filter((task) => task.status === column.id).length,
    ])),
    [tasks],
  );

  function saveTask(form) {
    if (dialog?.task) {
      setTasks((current) => current.map((task) => (
        task.id === dialog.task.id ? { ...task, ...form } : task
      )));
      setToast("Task updated");
    } else {
      const newTask = { ...form, id: globalThis.crypto.randomUUID() };
      setTasks((current) => [...current, newTask]);
      setToast("Task added to your board");
    }
    setDialog(null);
  }

  function deleteTask(task) {
    setTasks((current) => current.filter((item) => item.id !== task.id));
    setToast("Task deleted");
  }

  function moveTask(taskId, newStatus) {
    setTasks((current) => current.map((task) => (
      task.id === taskId ? { ...task, status: newStatus } : task
    )));
  }

  function handleDragStart(event, task) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", task.id);
    setDraggedTask(task.id);
  }

  function handleDrop(event, status) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain") || draggedTask;
    if (taskId) {
      const movingTask = tasks.find((task) => task.id === taskId);
      if (movingTask && movingTask.status !== status) {
        moveTask(taskId, status);
        setToast(`Moved to ${COLUMNS.find((column) => column.id === status).title}`);
      }
    }
    setDraggedTask(null);
    setDropTarget("");
  }

  function nudgeTask(task, direction) {
    const currentIndex = COLUMNS.findIndex((column) => column.id === task.status);
    const nextColumn = COLUMNS[currentIndex + (direction === "next" ? 1 : -1)];
    if (nextColumn) {
      moveTask(task.id, nextColumn.id);
      setToast(`Moved to ${nextColumn.title}`);
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Taskflow board home">
          <span className="brand-mark"><LayoutGrid size={19} /></span>
          <span>task<span>flow</span></span>
        </a>
        <div className="header-right">
          <span className="board-live"><span /> Board saved in this browser</span>
          <span className="avatar" aria-label="Your board">Y</span>
        </div>
      </header>

      <main className="main-content" id="top">
        <section className="welcome-row">
          <div className="welcome-copy">
            <p className="eyebrow"><Sparkles size={14} /> YOUR SPACE TO GET THINGS DONE</p>
            <h1>A little progress <span>goes a long way.</span></h1>
            <p>Keep the big picture in view and move the little things forward.</p>
          </div>
          <button className="add-task-button" type="button" onClick={() => setDialog({ initialStatus: "todo" })}>
            <Plus size={18} /> Add a task
          </button>
        </section>

        <section className="board-summary" aria-label="Board summary">
          <div className="summary-icon"><ClipboardList size={19} /></div>
          <div className="summary-copy">
            <strong>{tasks.length} {tasks.length === 1 ? "task" : "tasks"}</strong>
            <span>on your board</span>
          </div>
          <span className="summary-divider" />
          {COLUMNS.map((column) => (
            <div className="summary-stat" key={column.id}>
              <span className={`summary-dot ${column.color}`} />
              <strong>{taskCounts[column.id]}</strong>
              <span>{column.title}</span>
            </div>
          ))}
          <span className="summary-hint"><Grip size={15} /> Drag cards to move them</span>
        </section>

        {storageNotice && (
          <div className="storage-notice" role="status">
            <span>{storageNotice}</span>
            <button type="button" aria-label="Dismiss storage notice" onClick={() => setStorageNotice("")}><X size={16} /></button>
          </div>
        )}

        <section className="board" aria-label="Kanban board">
          {COLUMNS.map((column) => {
            const Icon = column.icon;
            const columnTasks = tasks.filter((task) => task.status === column.id);
            return (
              <section
                className={`board-column column-${column.color}${dropTarget === column.id ? " is-drop-target" : ""}`}
                key={column.id}
                aria-labelledby={`column-${column.id}-title`}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  setDropTarget(column.id);
                }}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setDropTarget("");
                }}
                onDrop={(event) => handleDrop(event, column.id)}
              >
                <div className="column-heading">
                  <span className="column-icon"><Icon size={17} /></span>
                  <div className="column-title-wrap">
                    <h2 id={`column-${column.id}-title`}>{column.title}</h2>
                    <p>{column.description}</p>
                  </div>
                  <span className="column-count">{columnTasks.length}</span>
                  <button
                    className="column-add"
                    type="button"
                    aria-label={`Add task to ${column.title}`}
                    onClick={() => setDialog({ initialStatus: column.id })}
                  >
                    <Plus size={17} />
                  </button>
                </div>
                <div className="column-cards">
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      dragging={draggedTask === task.id}
                      onDragStart={handleDragStart}
                      onDragEnd={() => {
                        setDraggedTask(null);
                        setDropTarget("");
                      }}
                      onEdit={(selected, move) => {
                        if (move) nudgeTask(selected, move);
                        else setDialog({ task: selected });
                      }}
                      onDelete={deleteTask}
                    />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="empty-column">
                      <span><Icon size={18} /></span>
                      <p>Nothing here just yet</p>
                      <button type="button" onClick={() => setDialog({ initialStatus: column.id })}>Add a task</button>
                    </div>
                  )}
                  <button
                    className="add-card-link"
                    type="button"
                    onClick={() => setDialog({ initialStatus: column.id })}
                  >
                    <Plus size={16} /> Add a task
                  </button>
                </div>
              </section>
            );
          })}
        </section>
        <p className="board-footnote">Your board saves automatically in this browser. Drag cards, or use the arrow controls on each card.</p>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top"><span className="brand-mark"><LayoutGrid size={16} /></span>taskflow</a>
        <span>A calmer way to organize your next step.</span>
        <span>Saved locally in this browser</span>
      </footer>

      {dialog && (
        <TaskDialog
          key={dialog.task?.id || dialog.initialStatus}
          task={dialog.task}
          initialStatus={dialog.initialStatus}
          onClose={() => setDialog(null)}
          onSave={saveTask}
        />
      )}

      {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
    </div>
  );
}

export default App;
