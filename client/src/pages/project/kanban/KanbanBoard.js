import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Category, Issue, Urgency, Charger } from "./Types";
import KanbanBoardStyle from "./KanbanBoard.module.css";
import PageTitle from "../../../components/items/PageTitle";
import callGetTasksAPI from "../../../apis/TaskAPICalls";


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


// 일감 목록 조회 (필터?)
export function KanbanBoardTasks() {

  const tasks = useSelector(state => state.tasksReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callGetTasksAPI());
  },[tasks]
  )

  return (
    tasks && (
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.backlogCode}>{task.backlogTitle}</li>
          ))}
        </ul>
      </div>
    )
  );
}




// 칸반 보드 전체
export default function KanbanBoard() {
  const [exampleData, setExampleData] = useState(() => initialData);
  const lastID = useRef(20);
  const [activeTask, setActiveTask] = useState(null);

  // 새로운 데이터를 exampleData에 넣음
  const replaceField = (id, newField) => {
    const newData = exampleData.map((ex) => (ex.id !== id ? ex : newField));
    setExampleData(newData);
  };

  // 새로운 일감 만들기 (마지막 ID + 1 ) -  exampleData에 넣음
  const createTask = (
    category,
    title,
    description,
    issue,
    urgency,
    charger
  ) => {
    const newTask = {
      category,
      title,
      description,
      issue,
      urgency,
      charger,
      id: lastID.current + 1,
    };
    const newData = exampleData.concat(newTask);
    lastID.current += 1;
    setExampleData(newData);
  };

  // 일감 id를 받아서 순회 - exampleData의 id와 같으면 반환 / 같지 않으면 null반환
  const getTask = (id) => {
    for (let i = 0; i < exampleData.length; i++) {
      if (exampleData[i].id === id) {
        return exampleData[i];
      }
    }
    return null;
  };

  // 칸반 컬럼 - 컬럼에 박스(일감)을 뿌려줌
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
    // 구조분해 할당
    const { updateTaskCategory, data, setActiveTask, getTask } = props;

    // 드래그하는 특정 DOM(드래그하는 대상, 컬럼)을 선택하기 위해 useRef 사용
    const dragItem = useRef();
    const dragOverKanbanColumn = useRef();

    // id를 받아 드래그 아이템의 현재 값을 id로 지정
    // activeTask는 null -> id 넣어줌
    const dragItemStart = (id, event) => {
      dragItem.current = id;
      setActiveTask(id);
    };

    // 드래그되는 카테고리에서
    const dragOverCategory = (category, event) => {
      //category를 받아 드래그 하는 컬럼의 현재 값을 category로 지정
      dragOverKanbanColumn.current = category;

      // 만약 드래그하는 대상의 현재 값이 널이 아니면(id가 있으면)
      // currentItem에 드래그하는 대상의 현재 값을 getTask(exampleData에 매칭)해서 넣어줌
      if (dragItem.current != null) {
        const currentItem = getTask(dragItem.current);

        // currentItem이 null이거나 0이면,  void(아무일도 하지 않음)
        // 그렇지 않으면 현재아이템의 카테고리가 됨 ->> 이 값이 category와 다른 경우
        if (
          (currentItem === null || currentItem === void 0
            ? void 0
            : currentItem.category) !== category
        ) {
          //이런 경우에 이벤트 작동 못하게 막음
          event.preventDefault();
        }
      }
    };

    // drop - 드래그 아이템과 칸반 컬럼의 현재 값이 null이면 카테고리에 값 업데이트
    const drop = () => {
      if (dragItem.current != null && dragOverKanbanColumn.current != null) {
        updateTaskCategory(dragItem.current, dragOverKanbanColumn.current);
      }
    };
    
    // filterBy - 카테고리 받아서 반환 ( 아이템 카테고리와 카테고리 같은 것만)
    const filterBy = (category) => {
      return data.filter((item) => item.category === category);
    };

    // 칸반 컬럼 만들기
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
  function Trash({ activeTask, deleteTask }) {
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
        <div>삭제할 백로그와 일감을 이곳으로 옮겨주세요</div>
      </div>
    );
  }

  // 카테고리 업데이트- taskFromID에 getTask(exampleData에 매칭)한 값 넣어줌
  // 그 값이 null아니면, 일감 카테고리를 업데이트
  const updateTaskCategory = (id, newCategory) => {
    const taskFromID = getTask(id);
    if (taskFromID != null) {
      // updatedTask - 빈객체에 taskFromID 합친다음 다시 카테고리 새롭게 받아서 합침
      const updatedTask = Object.assign(Object.assign({}, taskFromID), {
        category: newCategory,
      });
      //그리고 이걸 exampleData에 id와 업데이트된 task를 넣어줌
      replaceField(id, updatedTask);
    }
  };


  //일감 업데이트 (카테고리 설명과 동일)
  const updateTask = (
    id,
    newCategory,
    newTitle,
    newDescription,
    newIssue,
    newUrgency,
    newCharger
  ) => {
    const taskFromID = getTask(id);
    if (taskFromID != null) {
      const updatedTask = Object.assign(Object.assign({}, taskFromID), {
        category: newCategory,
        title: newTitle,
        description: newDescription,
        issue: newIssue,
        urgency: newUrgency,
        charger: newCharger,
      });
      replaceField(id, updatedTask);
    }
  };


  // 일감 삭제
  const deleteTask = (id) => {
    // newData에 아이디값이 일치 하지 않는 것만 담음( 삭제된것 빼고 남음 )
    const newData = exampleData.filter((item) => item.id !== id);
    // deletedData에 아이디 값이 일치하는 것만 담음 ( 삭제된 아이템 )
    const deletedData = exampleData.filter((item) => item.id === id);

    if (newData) {
      // 예제 데이터 삭제되지 않은 아이템을 담음
      setExampleData(newData);
    }
    if (
      // 삭제된 아이템의 카테고리가 백로그가 아니면
      deletedData[0].category === "진행 전" ||
      deletedData[0].category === "진행 중" ||
      deletedData[0].category === "완료"
    ) {
      console.log(deletedData[0].category);
      // 삭제된 아이템 백로그 카테고리로 이동 ( 미구현 )
      // updateTaskCategory(deletedData);
    }
  };

  // 전체 Return
  return (
    <>
      <PageTitle
        icon={<i className="pi pi-fw pi-th-large"></i>}
        text="칸반 보드"
      />
      <TaskDisplay
        data={exampleData}
        updateTaskCategory={updateTaskCategory}
        updateTask={updateTask}
        setActiveTask={setActiveTask}
        getTask={getTask}
      />
      <KanbanBoardTasks />
      <div className={KanbanBoardStyle.kanbanDeleteTaskButtonDiv}>
        <Trash deleteTask={deleteTask} activeTask={activeTask} />
      </div>
    </>
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
            //상위 엘리먼트 이벤트 전파 중단
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




/* ------------------------------모달-------------------------------- */



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
  const [issue, setIssue] = useState(
    (_b =
      (_a = props.initialData) === null || _a === void 0
        ? void 0
        : _a.issue) !== null && _b !== void 0
      ? _b
      : Issue.Basic
  );
  const [urgency, setUrgency] = useState(
    (_b =
      (_a = props.initialData) === null || _a === void 0
        ? void 0
        : _a.urgency) !== null && _b !== void 0
      ? _b
      : Urgency.LowGrade
  );
  const [charger, setCharger] = useState(
    (_b =
      (_a = props.initialData) === null || _a === void 0
        ? void 0
        : _a.charger) !== null && _b !== void 0
      ? _b
      : Charger.None
  );

  // 초기 폼
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(Category.Backlog);
    setIssue(Issue.Basic);
    setUrgency(Urgency.LowGrade);
    setCharger(Charger.None);
  };

  // submit 동작
  const onSubmit = (event) => {
    if (props.type === "Create") {
      // 생성
      props.createTask(category, title, description, issue, urgency, charger);
    } else {
      //수정
      props.updateTask(props.currentTaskID, category, title, description, issue, urgency, charger);
    }
    event.preventDefault(); //이벤트 동작 중지
    // 만약 create면 초기폼
       if (props.type === "Create") {
      resetForm();
    }
    props.onSubmit();
  };

  //close 동작
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
        onDescriptionChange={(des) => setDescription(des)}
        currentIssue={issue}
        onIssueChange={(iss) => setIssue(iss)}
        currentUrgency={urgency}
        onUrgencyChange={(urg) => setUrgency(urg)}
        currentCharger={charger}
        onChargerChange={(char) => setCharger(char)}
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
    currentIssue,
    onIssueChange,
    currentUrgency,
    onUrgencyChange,
    currentCharger,
    onChargerChange,
  } = props;
  return (
    <div className={KanbanBoardStyle.kanbanModalContent}>
      <form onSubmit={onFormSubmit}>
        <div className={KanbanBoardStyle.kanbanTitles}>
          일감 상세 조회 및 수정
        </div>
        <div>
          <label
            htmlFor="input-title"
            className={KanbanBoardStyle.kanbanDetailTitle}
          >
            요약 *
          </label>
          <textarea
            className={KanbanBoardStyle.kanbanDetailInputTitle}
            id="input-title"
            value={currentTitle}
            onChange={(event) => onTitleChange(event.target.value)}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="input-textarea"
            className={KanbanBoardStyle.kanbanDetailDescription}
          >
            설명
          </label>
          <textarea
            className={KanbanBoardStyle.kanbanDetailInputDescription}
            id="input-description"
            value={currentDescription}
            onChange={(event) => onDescriptionChange(event.target.value)}
          ></textarea>
        </div>
        <div className={KanbanBoardStyle.TaskOptions}>
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
          <select
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-issue"
            value={currentIssue}
            onChange={(event) => {
              onIssueChange(event.target.value);
            }}
          >
            <option value={Issue.Basic}>기본</option>
            <option value={Issue.Issue}>이슈</option>
          </select>

          <select
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-urgency"
            value={currentUrgency}
            onChange={(event) => {
              onUrgencyChange(event.target.value);
            }}
          >
            <option value={Urgency.LowGrade}>낮음</option>
            <option value={Urgency.NormalGrade}>보통</option>
            <option value={Urgency.HighGrade}>긴급</option>
          </select>

          <select
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-charger"
            value={currentCharger}
            onChange={(event) => {
              onChargerChange(event.target.value);
            }}
          >
            <option value={Charger.None}>담당자 없음</option>
            <option value={Charger.PM}>PM</option>
            <option value={Charger.Member}>회원</option>
            <option value={Charger.Park}>박성준</option>
            <option value={Charger.Lee}>이호성</option>
            <option value={Charger.Joo}>장민주</option>
            <option value={Charger.Sol}>장한솔</option>
            <option value={Charger.Cha}>차우진</option>
          </select>
        </div>

        <div className={KanbanBoardStyle.kanbanDetailButton}>
          <input
            className={KanbanBoardStyle.saveButton}
            type="Submit"
            value="확인"
            readOnly={true}
          />
          <button
            className={KanbanBoardStyle.cancelButton}
            onClick={props.onClose}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

//모달 창
function Modal(props) {
  return (
    <>
      <div className={KanbanBoardStyle.kanbanModalScreen} />
      <div role="dialog" className={KanbanBoardStyle.kanbanModal}>
        {props.children}
      </div>
    </>
  );
}
