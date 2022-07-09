import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Category, Issue, Urgency, Charger } from "./Types";
import KanbanBoardStyle from "./KanbanBoard.module.css";
import PageTitle from "../../../components/items/PageTitle";
import callGetTasksAPI from "../../../apis/TaskAPICalls";

// 초기 더미 데이터
const initialData = [

];

// 칸반 보드 전체
export default function KanbanBoard() {
  const [exampleData, setExampleData] = useState(() => initialData);
  const lastID = useRef();
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
    return (
      <>
        <div
          className={KanbanBoardStyle.kanbanColumn}
          onDragOver={props.onDragOver}
          onDrop={props.onDrop}
        >
          <div>
            <h2 className={KanbanBoardStyle.kanbanColumnTitle}>
              {props.category}
            </h2>
            {props.data &&
              props.data.map((task) => (
                <KanbanBox
                  key={task.backlogCode}
                  data={task}
                  onDragStart={props.KanbanBox.onDragStart}
                  updateTask={props.KanbanBox.updateTask}
                />
              ))}
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
    const { updateTaskCategory, setActiveTask, getTask } = props;

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
    const tasks = useSelector((state) => state.tasksReducer);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(callGetTasksAPI());
    }, []);

    // filterBy - 카테고리 받아서 반환 ( 아이템 카테고리와 카테고리 같은 것만)
    const filterBy = (category) => {
      if (tasks) {
        return tasks.filter((item) => item.progressStatus === category);
      }
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

  // const registNewTask = (newTask) => {

  //   fetch("http://localhost:8888/api/tasks", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Token": window.localStorage.getItem("access_token"),
  //     },
  //     body: JSON.stringify(newTask),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result.status == 201) {
  //         console.log(result.message);
  //       } else {
  //         console.log(result.status);
  //       }
  //     })

  // };

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
              // registNewTask();
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
          props.onDragStart(props.data.backlogCode, event);
        }}
        draggable="true"
      >
        {props.data.backlogTitle}
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
          currentTaskID={props.data.backlogCode}
          initialData={props.data}
        />
      )}
    </>
  );
}





/* ------------------------------모달-------------------------------- */

// 일감 모달창
function TaskModal(props) {

  // 일감 상세 조회 api
  console.log(props.currentTaskID);
    fetch(`http://localhost:8888/api/tasks/${props.currentTaskID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Access_token: window.localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const result = json.results[0];
        console.log(result.backlogCode || "");
      //  console.log(result.projectCode || "");
      //  console.log(result.sprintCode || "");
        setTaskTitle(result.backlogTitle || "");
        setTaskDescription(result.backlogDescription || "");
        // setTaskCategory(result.backlogCategory || "");
        setTaskProgressStatus(result.progressStatus || "");
        setTaskIssue(result.issue || "");
        setTaskUrgency(result.urgency || "");
        setTaskCharger(result.memberName || "");
      });



  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskProgressStatus, setTaskProgressStatus] = useState("");
  const [taskIssue, setTaskIssue] = useState("");
  const [taskUrgency, setTaskUrgency] = useState("");
  const [taskCharger, setTaskCharger] = useState("");

  // 초기 폼
  const resetForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskProgressStatus("");
    setTaskIssue("");
    setTaskUrgency("");
    setTaskCharger("");
  };




  // submit 동작
  const onSubmit = (event) => {
    if (props.type === "Create") {
      // 생성
      props.createTask(
        taskTitle, 
        taskDescription, 
        taskProgressStatus, 
        taskIssue,
        taskUrgency,
        taskCharger
      );
    } else {
      //수정
      props.updateTask(
        props.currentTaskID,
        taskTitle,
        taskDescription,
        taskProgressStatus,
        taskIssue,
        taskUrgency,
        taskCharger
      );
    }
    event.preventDefault(); //이벤트 동작 중지
    // 만약 create면 초기폼
    if (props.type === "Create") {
      resetForm();
    }
    props.onSubmit();
  };

  //close 동작
  const onClose = () => {
    resetForm();
    props.onSubmit();
  };

  return (
    <Modal>
      <EditTaskForm
        currentTitle={taskTitle}
        onTitleChange={(ti) => setTaskTitle(ti)}
        currentDescription={taskDescription}
        onDescriptionChange={(des) => setTaskDescription(des)}
        currentIssue={taskIssue}
        onIssueChange={(iss) => setTaskIssue(iss)}
        currentUrgency={taskUrgency}
        onUrgencyChange={(urg) => setTaskUrgency(urg)}
        currentCharger={taskCharger}
        onChargerChange={(char) => setTaskUrgency(char)}
        currentProgressStatus={taskProgressStatus}
        onProgressStatusChange={(prog)=> setTaskProgressStatus(prog)}
        onFormSubmit={onSubmit}
        onClose={onClose}
      />
    </Modal>
  );
}

// 일감 모달 창 - 상세 조회 폼
function EditTaskForm(props) {
  const {
    onFormSubmit,
    onTitleChange,
    currentTitle,
    onDescriptionChange,
    currentDescription,
    currentIssue,
    onIssueChange,
    currentUrgency,
    onUrgencyChange,
    currentCharger,
    onChargerChange,
    currentProgressStatus,
    onProgressStatusChange,
    onClose,
  } = props;

  return (
    <div className={KanbanBoardStyle.kanbanModalContent}>
      <form onSubmit={onFormSubmit}>
        <div className={KanbanBoardStyle.kanbanTitles}>상세 조회 및 수정</div>
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
            placeholder="필수 입력 사항입니다."
            value={currentTitle}
            onChange={(event) => onTitleChange(event.target.value)}
            required
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
            value={currentProgressStatus}
            onChange={(event) => {
              onProgressStatusChange(event.target.value);
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
            <option value={Charger.Jin}>우진</option>
            <option value={Charger.Park}>성준</option>
            <option value={Charger.Joo}>민주</option>
            <option value={Charger.Sol}>한솔</option>
            <option value={Charger.Lee}>호성</option>
          </select>
        </div>

        <div className={KanbanBoardStyle.kanbanDetailButton}>
          <div>
            <input
              className={KanbanBoardStyle.saveButton}
              type="Submit"
              value="확인"
              readOnly={true}
            />
            <button
              className={KanbanBoardStyle.cancelButton}
              type="button"
              onClick={onClose}
            >
              취소
            </button>
          </div>
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
