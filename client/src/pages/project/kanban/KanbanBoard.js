import React, { useState, useRef } from "react";
import { Category, Issue } from "./Types";
import KanbanBoardStyle from "./KanbanBoard.module.css";

// 초기 더미 데이터
const initialData = [
  { category: Category.Backlog, id: 0, title: "일감 조회" },
  { category: Category.InProgress, id: 1, title: "일감 상세 조회" },
  { category: Category.Done, id: 2, title: "일감 수정" },
  { category: Category.Before, id: 3, title: "일감 생성" },
  { category: Category.Before, id: 4, title: "백로그 생성" },
  { category: Category.Backlog, id: 5, title: "일감 조회" },
  { category: Category.InProgress, id: 6, title: "일감 상세 조회" },
  { category: Category.Done, id: 7, title: "일감 수정" },
  { category: Category.Before, id: 8, title: "일감 생성" },
  { category: Category.Before, id: 9, title: "백로그 생성" },
  { category: Category.Backlog, id: 10, title: "일감 조회" },
  { category: Category.InProgress, id: 11, title: "일감 상세 조회" },
  { category: Category.Done, id: 12, title: "일감 수정" },
  { category: Category.Before, id: 13, title: "일감 생성" },
  { category: Category.Before, id: 14, title: "백로그 생성" },
  { category: Category.Backlog, id: 15, title: "일감 조회" },
  { category: Category.InProgress, id: 16, title: "일감 상세 조회" },
  { category: Category.Done, id: 17, title: "일감 수정" },
  { category: Category.Before, id: 18, title: "일감 생성" },
  { category: Category.Before, id: 19, title: "백로그 생성" },
];

// 칸반 보드
export default function KanbanBoard() {
  const [exampleData, setExampleData] = useState(() => initialData);
  const lastID = useRef(20);
  const [activeTask, setActiveTask] = useState(null);

  const replaceField = (id, newField) => {
    const newData = exampleData.map((u) => (u.id !== id ? u : newField));
    setExampleData(newData);
  };
  const createTask = (category, title, description, issue) => {
    const newTask = {
      category,
      title,
      description,
      issue,
      id: lastID.current + 1,
    };
    const newData = exampleData.concat(newTask);
    lastID.current += 1;
    setExampleData(newData);
  };
  const getTask = (id) => {
    for (let i = 0; i < exampleData.length; i++) {
      if (exampleData[i].id === id) {
        return exampleData[i];
      }
    }

    return null;
  };

  // 칸반 컬럼
  function KanbanColumn(props) {
    const items = props.data.map((val) => (
      <KanbanBox
        key={val.id}
        data={val}
        onDragStart={props.KanbanBox.onDragStart}
        updateTask={props.KanbanBox.updateTask}
      />
    ));
    return (
      <>
        <div
          className={KanbanBoardStyle.kanbanColumn}
          onDragOver={props.onDragOver}
          onDrop={props.onDrop}
        >
          <div>
            <div>
              <h2 className={KanbanBoardStyle.kanbanColumnTitle}>
                {props.category}
              </h2>
            </div>
            {items}
          </div>
          <div className={KanbanBoardStyle.kanbanNewTaskButtonDiv}>
            <CreateNewTaskButton createTask={createTask} />
          </div>
        </div>
      </>
    );
  }

  // drag and drop에 따라 바뀌는 카테고리 업데이트
  function TaskDisplay(props) {
    const { updateTaskCategory, data, setActiveTask, getTask } = props;

    const dragItem = useRef();
    const dragOverKanbanColumn = useRef();

    const dragItemStart = (id, event) => {
      dragItem.current = id;
      setActiveTask(id);
    };
    const dragOverCategory = (category, event) => {
      dragOverKanbanColumn.current = category;
      if (dragItem.current != null) {
        const currentItem = getTask(dragItem.current);
        if (
          (currentItem === null || currentItem === void 0
            ? void 0
            : currentItem.category) !== category
        ) {
          event.preventDefault();
        }
      }
    };

    const drop = () => {
      if (dragItem.current != null && dragOverKanbanColumn.current != null) {
        updateTaskCategory(dragItem.current, dragOverKanbanColumn.current);
      }
    };
    const filterBy = (category) => {
      return data.filter((item) => item.category === category);
    };
    const createKanbanColumn = (category) => (
      <KanbanColumn
        category={category}
        data={filterBy(category)}
        KanbanBox={{
          onDragStart: dragItemStart,
          updateTask: props.updateTask,
        }}
        onDragOver={(event) => {
          dragOverCategory(category, event);
        }}
        onDrop={drop}
      />
    );
    return (
      <div className={KanbanBoardStyle.kanbanContainer}>
        <div className={KanbanBoardStyle.kanbanColumnBacklog}>
          {createKanbanColumn(Category.Backlog)}
        </div>
        <div className={KanbanBoardStyle.kanbanColumnBefore}>
          {createKanbanColumn(Category.Before)}
        </div>
        <div className={KanbanBoardStyle.kanbanColumnInProgress}>
          {createKanbanColumn(Category.InProgress)}
        </div>
        <div className={KanbanBoardStyle.kanbanColumnDone}>
          {createKanbanColumn(Category.Done)}
        </div>
      </div>
    );
  }

  // 일감 생성
  function CreateNewTaskButton(props) {
    const [showModal, setShowModal] = useState(false);
    return (
      <div>
        <div>
          <button
            className={KanbanBoardStyle.kanbanBoxAddButton}
            onClick={(e) => {
              setShowModal(true);
            }}
          >
            +
          </button>
        </div>
        {showModal && (
          <TaskModal
            type="Create"
            createTask={props.createTask}
            onSubmit={() => {
              setShowModal(false);
            }}
          />
        )}
      </div>
    );
  }

  // 일감(백로그) 삭제
  function ClosedTask(props) {
    return (
      <>
        <div>Delete</div>
      </>
    );
  }
  function Trash(props) {
    const { activeTask, deleteTask } = props;

    const onDragOver = (event) => {
      event.preventDefault();
    };
    const onDrop = (event) => {
      if (activeTask != null) {
        deleteTask(activeTask);
      }
    };
    return (
      <div
        className={KanbanBoardStyle.kanbanBoxDeleteButton}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <ClosedTask />
      </div>
    );
  }

  const updateTaskCategory = (id, newCategory) => {
    const taskFromID = getTask(id);
    if (taskFromID != null) {
      const updatedTask = Object.assign(Object.assign({}, taskFromID), {
        category: newCategory,
      });
      replaceField(id, updatedTask);
    }
  };

  const updateTask = (id, newCategory, newTitle, newDescription) => {
    const taskFromID = getTask(id);
    if (taskFromID != null) {
      const updatedTask = Object.assign(Object.assign({}, taskFromID), {
        category: newCategory,
        title: newTitle,
        description: newDescription,
      });
      replaceField(id, updatedTask);
    }
  };

  const deleteTask = (id) => {
    const newData = exampleData.filter((item) => item.id !== id);
    setExampleData(newData);
  };

  return (
    <div>
      <div className={KanbanBoardStyle.kanbanDeleteTaskButtonDiv}>
        <Trash deleteTask={deleteTask} activeTask={activeTask} />
      </div>
      <TaskDisplay
        data={exampleData}
        updateTaskCategory={updateTaskCategory}
        updateTask={updateTask}
        setActiveTask={setActiveTask}
        getTask={getTask}
      />
    </div>
  );
}

// 일감 상세 조회 및 수정버튼
function EditButton(props) {
  return (
    <div
      role="button"
      className={KanbanBoardStyle.kanbanEditAndDetailButton}
      onClick={props.onClick}
    >
      ≡
    </div>
  );
}

// 칸반 개별 일감들(박스)
function KanbanBox(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={KanbanBoardStyle.kanbanBox}
        onDragStart={(event) => {
          props.onDragStart(props.data.id, event);
        }}
        draggable="true"
      >
        {props.data.title}
        <EditButton
          onClick={(event) => {
            event.stopPropagation();
            setShowModal(true);
          }}
        ></EditButton>
      </div>
      {showModal && (
        <TaskModal
          type="Edit"
          onSubmit={() => {
            setShowModal(false);
          }}
          updateTask={props.updateTask}
          currentTaskID={props.data.id}
          initialData={props.data}
        />
      )}
    </>
  );
}

// 일감 모달창 수정 적용
function TaskModal(props) {
  var _a, _b, _c, _d;
  const [category, setCategory] = useState(
    (_b =
      (_a = props.initialData) === null || _a === void 0
        ? void 0
        : _a.category) !== null && _b !== void 0
      ? _b
      : Category.Backlog
  );
  const [title, setTitle] = useState(
    (_d =
      (_c = props.initialData) === null || _c === void 0
        ? void 0
        : _c.title) !== null && _d !== void 0
      ? _d
      : ""
  );
  const [description, setDescription] = useState(
    (_d =
      (_c = props.initialData) === null || _c === void 0
        ? void 0
        : _c.description) !== null && _d !== void 0
      ? _d
      : ""
  );

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(Category.Backlog);
  };

  const onSubmit = (event) => {
    if (props.type === "Create") {
      props.createTask(category, title, description);
    } else {
      props.updateTask(props.currentTaskID, category, title, description);
    }
    event.preventDefault();
    if (props.type === "Create") {
      resetForm();
    }
    props.onSubmit();
  };
  const onClose = (event) => {
    resetForm();
    props.onSubmit();
  };
  return (
    <Modal onClose={onClose}>
      <EditTaskForm
        currentCategory={category}
        onCategoryChange={(cat) => setCategory(cat)}
        currentTitle={title}
        onTitleChange={(ti) => setTitle(ti)}
        currentDescription={description}
        onDescriptionChange={(ti) => setDescription(ti)}
        onFormSubmit={onSubmit}
      />
    </Modal>
  );
}

// 일감 모달 창 - 상세 조회 폼
function EditTaskForm(props) {
  const {
    onFormSubmit,
    onCategoryChange,
    onTitleChange,
    currentCategory,
    currentTitle,
    onDescriptionChange,
    currentDescription,
  } = props;
  return (
    <div className={KanbanBoardStyle.kanbanModalContent}>
      <form onSubmit={onFormSubmit}>
        <br />
        <div>
          <label
            htmlFor="input-title"
            className={KanbanBoardStyle.kanbanDetailTitle}
          >
            요약 *
            <textarea
              className={KanbanBoardStyle.kanbanDetailInputTitle}
              id="input-title"
              value={currentTitle}
              onChange={(event) => onTitleChange(event.target.value)}
            ></textarea>
          </label>
        </div>
        <div>
          <label
            htmlFor="input-textarea"
            className={KanbanBoardStyle.kanbanDetailDescription}
          >
            설명
            <textarea
              className={KanbanBoardStyle.kanbanDetailInputDescription}
              id="input-description"
              value={currentDescription}
              onChange={(event) => onDescriptionChange(event.target.value)}
            ></textarea>
          </label>
        </div>
        <div>
          <label
            htmlFor="select-category"
            className={KanbanBoardStyle.kanbanDetailSelection}
          >
            <select
              className={KanbanBoardStyle.kanbanDetailInputSelection}
              id="select-category"
              value={currentCategory}
              onChange={(event) => {
                onCategoryChange(event.target.value);
              }}
            >
              <option value={Category.Backlog}>백로그</option>
              <option value={Category.Before}>진행 전</option>
              <option value={Category.InProgress}>진행 중</option>
              <option value={Category.Done}>완료</option>
            </select>
          </label>
        </div>

        <br />
        <input type="Submit" value="Submit" readOnly={true} />
      </form>
    </div>
  );
}

// 모달 창
function Modal(props) {
  return (
    <>
      <div className={KanbanBoardStyle.kanbanModalScreen} />
      <div role="dialog" className={KanbanBoardStyle.kanbanModal}>
        {props.children}
        <button onClick={props.onClose}>취소</button>
      </div>
    </>
  );
}
