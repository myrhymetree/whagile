import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Category } from "./Types";
import KanbanBoardStyle from "./KanbanBoard.module.css";
import { KanbanColumn } from "./Column";
//API, Redux
import callGetTasksAPI from "../../../apis/TaskAPICalls";


export default function TaskTotalScreen(props) {
    const { updateTaskCategory, setActiveTask, getTask } = props;

    // 드래그하는 특정 DOM(드래그하는 대상, 컬럼)을 선택하기 위해 useRef 사용
    const dragItem = useRef();
    const dragOverKanbanColumn = useRef();

    // id를 받아 드래그 아이템의 현재 값을 id로 지정
    // activeTask는 null -> id 넣어줌
    const dragItemStart = (backlogCode, event) => {
      dragItem.current = backlogCode;
      setActiveTask(backlogCode);
    };

    // 드래그되는 카테고리에서
    const dragOverCategory = (category, event) => {
      //category를 받아 드래그 하는 컬럼의 현재 값을 category로 지정
      dragOverKanbanColumn.current = category;

      // 만약 드래그하는 대상의 현재 값이 널이 아니면(id가 있으면)
      // currentItem에 드래그하는 대상의 현재 값을 getTask(taskData에 매칭)해서 넣어줌
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



