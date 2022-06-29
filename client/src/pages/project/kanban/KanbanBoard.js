import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import kanbanStyle from "./KanbanBoard.module.css";
import PageTitle from "../../../components/items/PageTitle";
import { Dialog } from "primereact/dialog";

const tasksFromKanban = [
  { id: uuid(), content: "일감 생성" },
  { id: uuid(), content: "일감 목록 조회" },
  { id: uuid(), content: "일감 상세 조회" },
  { id: uuid(), content: "일감 댓글 작성" },
  { id: uuid(), content: "일감 댓글 수정" },
  { id: uuid(), content: "일감 댓글 삭제" },
];

const boardsFromKanban = {
  [uuid()]: {
    subTitle: "백로그",
    tasks: tasksFromKanban,
  },
  [uuid()]: {
    subTitle: "진행 전",
    tasks: [],
  },
  [uuid()]: {
    subTitle: "진행 중",
    tasks: [],
  },
  [uuid()]: {
    subTitle: "완료",
    tasks: [],
  },
};


const onDragEnd = (result, boards, setBoards) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    // 다른 board로 이동
    const sourceBoard = boards[source.droppableId];
    const destinationBoard = boards[destination.droppableId];

    const sourceTasks = [...sourceBoard.tasks];
    const destinationTasks = [...destinationBoard.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, removed);

    setBoards({
      ...boards,
      [source.droppableId]: {
        ...sourceBoard,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destinationBoard,
        tasks: destinationTasks,
      },
    });
  } else {
    // board 내 위 아래 이동
    const board = boards[source.droppableId];
    const copiedTasks = [...board.tasks];
    const [removed] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, removed);
    setBoards({
      ...boards,
      [source.droppableId]: {
        ...board,
        tasks: copiedTasks,
      },
    });
  }
};

function KanbanBoard() {
  const [boards, setBoards] = useState(boardsFromKanban);
  return (
    <div className={kanbanStyle.container}>
      <div>
        <PageTitle
          icon={<i className="pi pi-fw pi-th-large"></i>}
          text="칸반보드"
        />
      </div>
      <div className={kanbanStyle.mainDiv}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, boards, setBoards)}
        >
          {Object.entries(boards).map(([boardId, board], index) => {
            return (
              <div className={kanbanStyle.board} key={boardId}>
                <div style={{ margin: 15 }}>
                  <Droppable droppableId={boardId} key={boardId}>
                    {(provided, snapshot) => {
                      return (
                        <>
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={kanbanStyle.boards}
                          >
                            <div className={kanbanStyle.subTitle}>
                              {board.subTitle}
                            </div>
                            {board.tasks.map((task, index) => {
                              return (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <>
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={kanbanStyle.tasks}
                                        >
                                          {task.content}
                                        </div>
                                      </>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        </>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default KanbanBoard;
