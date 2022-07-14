import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Category } from "./Types";
import KanbanBoardStyle from "./KanbanBoard.module.css";
import { KanbanColumn } from "./Column";
import { useParams } from "react-router-dom";

//API, Redux
import callGetTasksAPI from "../../../apis/TaskAPICalls";


export default function TaskTotalScreen(props) {
   
    // 일감 목록 
    const tasks = useSelector((state) => state.tasksReducer);
    const dispatch = useDispatch();
    const { projectCode } = useParams();

    useEffect(() => {
      console.log("tasks",tasks)
      dispatch(callGetTasksAPI(projectCode));
    }, []);

    const filterBy = (category) => {
      if (tasks) {
        return tasks.filter((item) => item.progressStatus === category);
      }
    };

    const createKanbanColumn = (category) => (
      <KanbanColumn
        category={category}
        data={filterBy(category)}
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



