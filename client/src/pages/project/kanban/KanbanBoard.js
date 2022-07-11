
import TaskTotalScreen from "./TaskTotalScreen";

import AbandonTask from "./AbandonTask";
import React, { useState, } from "react";

import KanbanBoardStyle from "./KanbanBoard.module.css";
import PageTitle from "../../../components/items/PageTitle";





// 칸반 보드
export default function KanbanBoard() {
  const [taskData, setTaskData] = useState();
  const [activeTask, setActiveTask] = useState(null);

  const replaceField = (backlogCode, newField) => {
    const newData = taskData.map((ex) =>
      ex.backlogCode !== backlogCode ? ex : newField
    );
    setTaskData(newData);
  };

  const createTask = (
    taskTitle,
    taskDescription,
    taskProgressStatus,
    taskIssue,
    taskUrgency,
    taskCharger
  ) => {
    const newTask = {
      taskTitle,
      taskDescription,
      taskProgressStatus,
      taskIssue,
      taskUrgency,
      taskCharger
    };
    const newData = taskData.concat(newTask);
    setTaskData(newData);
  };

  // 일감 id를 받아서 순회 - TaskData의 id와 같으면 반환 / 같지 않으면 null반환
  const getTask = (backlogCode) => {
    for (let i = 0; i < taskData.length; i++) {
      if (taskData[i].backlogCode === backlogCode) {
        return taskData[i];
      }
    }
    return null;
  };



  // 카테고리 업데이트- taskFromID에 getTask(taskData에 매칭)한 값 넣어줌
  // 그 값이 null아니면, 일감 카테고리를 업데이트
  const updateTaskCategory = (backlogCode, newCategory) => {
    const taskFromID = getTask(backlogCode);
    if (taskFromID != null) {
      // updatedTask - 빈객체에 taskFromID 합친다음 다시 카테고리 새롭게 받아서 합침
      const updatedTask = Object.assign(Object.assign({}, taskFromID), {
        category: newCategory,
      });
      //그리고 이걸 taskData에 id와 업데이트된 task를 넣어줌
      replaceField(backlogCode, updatedTask);
    }
  };

  //일감 업데이트 (카테고리 설명과 동일)
  const updateTask = (
    backlogCode,
    newTaskTitle,
    newTaskDescription,
    newTaskProgressStatus,
    newTaskIssue,
    newTaskUrgency,
    newTaskCharger
  ) => {
    const taskFromID = getTask(backlogCode);
    if (taskFromID != null) {
      const updatedTask = Object.assign(Object.assign({}, taskFromID), {
        taskProgressStatus: newTaskProgressStatus,
        taskTitle: newTaskTitle,
        taskDescription: newTaskDescription,
        taskIssue: newTaskIssue,
        taskUrgency: newTaskUrgency,
        taskCharger: newTaskCharger,
      });
      replaceField(backlogCode, updatedTask);
    }
  };

  // 일감 삭제
  const deleteTask = (backlogCode) => {
    // newData에 아이디값이 일치 하지 않는 것만 담음( 삭제된것 빼고 남음 )
    const newData = taskData.filter(
      (item) => item.backlogCode !== backlogCode
    );
    // deletedData에 아이디 값이 일치하는 것만 담음 ( 삭제된 아이템 )
    const deletedData = taskData.filter(
      (item) => item.backlogCode === backlogCode
    );

    if (newData) {
      // 예제 데이터 삭제되지 않은 아이템을 담음
      setTaskData(newData);
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
      <TaskTotalScreen
        data={taskData}
        updateTaskCategory={updateTaskCategory}
        updateTask={updateTask}
        setActiveTask={setActiveTask}
        getTask={getTask}
      />
      <div className={KanbanBoardStyle.kanbanDeleteTaskButtonDiv}>
        <AbandonTask deleteTask={deleteTask} activeTask={activeTask} />
      </div>
    </>
  );
}

