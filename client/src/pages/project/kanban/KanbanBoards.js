// import React, { useState} from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from "uuid/v4";
// import kanbanStyle from "./KanbanBoard.module.css";
import PageTitle from "../../../components/items/PageTitle";
// // import { useEffect } from "react";
// // import callGetTaskAPI from "../../../apis/TaskAPICalls";
// // import { useSelector, useDispatch } from "react-redux";
// import Tasks from "../../../components/items/kanban/Tasks"
// <Tasks />;
  


import React from "react";
import { connect } from "react-redux";
import {
  updateCard,
  deleteCard,
  updateDraft,
  openDraft,
  clearDraft,
  openAddCardModal,
  closeAddCardModal,
} from "../../../components/items/kanban/actions";
import KanbanBoard from "../../../components/items/kanban/KanbanBoard";
import AddCardModal from "../../../components/items/kanban/AddCardModal";
import styled from "styled-components";

const MainContainer = styled.main`
  grid-area: main;
`;

function KanbanBoards({
  cards,
  modal,
  updateCard,
  deleteCard,
  openAddCardModal,
  openDraft,
  draft,
  updateDraft,
  clearDraft,
  closeAddCardModal,
}) {
  return (
    <div>
      <PageTitle
        icon={<i className="pi pi-fw pi-th-large"></i>}
        text="칸반보드"
      />;
      <MainContainer>
        <KanbanBoard
          cards={cards}
          updateCard={updateCard}
          deleteCard={deleteCard}
          openAddCardModal={openAddCardModal}
          openDraft={openDraft}
        />
        {modal.addCardModalIsOpen ? (
          <AddCardModal
            draft={draft}
            updateCard={updateCard}
            updateDraft={updateDraft}
            clearDraft={clearDraft}
            closeAddCardModal={closeAddCardModal}
          />
        ) : null}
      </MainContainer>
    </div>
  );
}

const mapStateToProps = ({ cards, draft, modal }) => ({ cards, draft, modal });


export default connect(mapStateToProps, {
  updateCard,
  deleteCard,
  updateDraft,
  openDraft,
  clearDraft,
  openAddCardModal,
  closeAddCardModal,
})(KanbanBoards);









































































































































// const backlogFromKanban = [
//   { id: uuid(), content: "일감 생성" },
//   { id: uuid(), content: "일감 목록 조회" },
//   { id: uuid(), content: "일감 상세 조회" },
//   { id: uuid(), content: "일감 댓글 작성" },
//   { id: uuid(), content: "일감 댓글 수정" },
//   { id: uuid(), content: "일감 댓글 삭제" },
// ];

// function TaskList() {
//   const tasks = useSelector((state) => state.taskReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(callGetTaskAPI());
//   }, [tasks]);

//   return (
//     tasks && (
//       <div>
//         {tasks.map((task) => [
//         <Task key={task.backlogCode} 
//           title={task.backlgoTitle} 
//           description={task.backlogDescription}/>
//           ])}
//       </div>
//     )
//   );
// }


// const tasksBeforeFromKanban = [
//   <TaskList/>,
// ];

// const tasksProceedingFromKanban = [
//   <TaskList
//     key={task.backlogCode}
//     title={task.backlgoTitle}
//     tasks={tasks.filter((task) => task.backlogProgressStatus === "진행 중")}
//   />,
// ];

// const tasksCompletionFromKanban = [
//   <TaskList
//     key={task.backlogCode}
//     title={task.backlgoTitle}
//     tasks={tasks.filter((task) => task.backlogProgressStatus === "완료")}
//   />,
// ];

// const boardsFromKanban = {
//   [uuid()]: {
//     subTitle: "백로그",
//     tasks: backlogFromKanban,
//   },
//   [uuid()]: {
//     subTitle: "진행 전",
//     tasks: [],
//   },
//   [uuid()]: {
//     subTitle: "진행 중",
//     tasks: [],
//   },
//   [uuid()]: {
//     subTitle: "완료",
//     tasks: [],
//   },
// };





// function KanbanBoard() {
//   const [boards, setBoards] = useState(boardsFromKanban);
//   return (
//     <div className={kanbanStyle.container}>
//       <div>
//         <PageTitle
//           icon={<i className="pi pi-fw pi-th-large"></i>}
//           text="칸반보드"
//         />
//       </div>
//       <div className={kanbanStyle.mainDiv}>
//         <DragDropContext
//           onDragEnd={(result) => onDragEnd(result, boards, setBoards)}
//         >
//           {Object.entries(boards).map(([boardId, board], index) => {
//             return (
//               <div className={kanbanStyle.board} key={boardId}>
//                 <div style={{ margin: 15 }}>
//                   <Droppable droppableId={boardId} key={boardId}>
//                     {(provided) => {
//                       return (
//                         <>
//                           <div
//                             {...provided.droppableProps}
//                             ref={provided.innerRef}
//                             className={kanbanStyle.boards}
//                           >
//                             <div className={kanbanStyle.subTitle}>
//                               {board.subTitle}
//                             </div>
//                             {board.tasks.map((task, index) => {
//                               return (
//                                 <Draggable
//                                   key={task.id}
//                                   draggableId={task.id}
//                                   index={index}
//                                 >
//                                   {(provided, snapshot) => {
//                                     return (
//                                       <>
//                                         <div
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}
//                                           className={kanbanStyle.tasks}
//                                         >
//                                           {task.content}
//                                         </div>
//                                       </>
//                                     );
//                                   }}
//                                 </Draggable>
//                               );
//                             })}
//                             {provided.placeholder}
//                             <Tasks />
//                           </div>
//                         </>
//                       );
//                     }}
//                   </Droppable>
//                 </div>
//               </div>
//             );
//           })}
//         </DragDropContext>
//       </div>
//     </div>
//   );
// }

// export default KanbanBoard;


// const onDragEnd = (result, boards, setBoards) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     // 다른 board로 이동
//     const sourceBoard = boards[source.droppableId];
//     const destinationBoard = boards[destination.droppableId];

//     const sourceTasks = [...sourceBoard.tasks];
//     const destinationTasks = [...destinationBoard.tasks];

//     const [removed] = sourceTasks.splice(source.index, 1);
//     destinationTasks.splice(destination.index, 0, removed);

//     setBoards({
//       ...boards,
//       [source.droppableId]: {
//         ...sourceBoard,
//         tasks: sourceTasks,
//       },
//       [destination.droppableId]: {
//         ...destinationBoard,
//         tasks: destinationTasks,
//       },
//     });
//   } else {
//     // board 내 위 아래 이동
//     const board = boards[source.droppableId];
//     const copiedTasks = [...board.tasks];
//     const [removed] = copiedTasks.splice(source.index, 1);
//     copiedTasks.splice(destination.index, 0, removed);
//     setBoards({
//       ...boards,
//       [source.droppableId]: {
//         ...board,
//         tasks: copiedTasks,
//       },
//     });
//   }
// };

// function Task(props) {
//   const [showModal, setShowModal] = useState(false);

//   const {
//     backlogTitle,
//     backlogDescription,
//     issue,
//     urgency,
//     progressStatus,
//     backlogChargerCode,
//   } = props.task;

//   return (
//     <>
//       {showModal && (
//         <TaskInfo
//           onClose={() => setShowModal(false)}
//           task={props.task}
//           boardId={props.boardId}
//           updateTask={props.updateTask}
//         />
//       )}
//       <div
//         draggable
//         onDragEnd={() => props.dragEnded(props.boardId)}
//         onDragEnter={() => props.dragEntered(props.boardId)}
//         onClick={() => setShowModal(true)}
//       ></div>
//       <div>{backlogTitle}</div>
//       <div>{backlogDescription}</div>
//       <div>{issue}</div>
//       <div>{urgency}</div>
//       <div>{progressStatus}</div>
//       <div>{backlogChargerCode}</div>
//     </>
//   );
// }

// function TaskInfo(props) {
//   const [values, setValues] = useState({
//     ...props.task,
//   });

//   const updateBacklogTitle = (value) => {
//     setValues({ ...values, backlogTitle: value });
//   };

//   const updateBacklogDescription = (value) => {
//     setValues({ ...values, backlogDescription: value });
//   };

//   const updateIssue = (value) => {
//     setValues({ ...values, issue: value });
//   };
//   const updateUrgency = (value) => {
//     setValues({ ...values, urgency: value });
//   };
//   const updateProgressStatus = (value) => {
//     setValues({ ...values, progressStatus: value });
//   };
//   const upadateBacklogChargerCode = (value) => {
//     setValues({ ...values, backlogChargerCode: value });
//   };

//   useEffect(() => {
//     if (props.updateTask) props.updateTask(props.boardId, values.id, values);
//   }, [values]);

//   return (
//     <Modal onClose={props.onClose}>
//       <div>
//         <div>
//           <p>BacklogTitle</p>
//         </div>
//         <Editable
//           defaultValue={values.backlogTitle}
//           text={values.backlogTitle}
//           placeholder="Enter Title"
//           onSubmit={updateBacklogTitle}
//         />
//       </div>

//       <div>
//         <div>
//           <p>BacklogDescription</p>
//         </div>
//         <Editable
//           defaultValue={values.backlogDescription}
//           text={values.backlogDescription}
//           placeholder="Enter description"
//           onSubmit={updateBacklogDescription}
//         />
//       </div>
//       <div>
//         <div>
//           <p>Issue</p>
//         </div>
//         <Editable
//           defaultValue={values.issue}
//           text={values.issue}
//           placeholder="Enter Issue"
//           onSubmit={updateIssue}
//         />
//       </div>
//       <div>
//         <div>
//           <p>Urgency</p>
//         </div>
//         <Editable
//           defaultValue={values.urgency}
//           text={values.urgency}
//           placeholder="Enter Urgency"
//           onSubmit={updateUrgency}
//         />
//       </div>
//       <div>
//         <div>
//           <p>ProgressStatus</p>
//         </div>
//         <Editable
//           defaultValue={values.progressStatus}
//           text={values.progressStatus}
//           placeholder="Enter ProgressStatus"
//           onSubmit={updateProgressStatus}
//         />
//       </div>
//       <div>
//         <div>
//           <p>BacklogCharger</p>
//         </div>
//         <Editable
//           defaultValue={values.backlogChargerCode}
//           text={values.backlogChargerCode}
//           placeholder="Enter description"
//           onSubmit={upadateBacklogChargerCode}
//         />
//       </div>
//     </Modal>
//   );
// }

// function Modal(props) {
//   return (
//     <div
//       className="modals"
//       onClick={() => (props.onClose ? props.onClose() : "")}
//     >
//       <div
//         className="modal_content custom-scroll"
//         onClick={(event) => event.stopPropagation()}
//       >
//         {props.children}
//       </div>
//     </div>
//   );
// }

// function Editable(props) {
//   const [isEditable, setIsEditable] = useState(false);
//   const [inputText, setInputText] = useState(props.defaultValue || "");

//   const submission = (e) => {
//     e.preventDefault();
//     if (inputText && props.onSubmit) {
//       setInputText("");
//       props.onSubmit(inputText);
//     }
//     setIsEditable(false);
//   };

//   return (
//     <div className="editable">
//       {isEditable ? (
//         <form
//           className={`editable_edit ${props.editClass ? props.editClass : ""}`}
//           onSubmit={submission}
//         >
//           <input
//             type="text"
//             value={inputText}
//             placeholder={props.placeholder || props.text}
//             onChange={(event) => setInputText(event.target.value)}
//             autoFocus
//           />
//         </form>
//       ) : (
//         <p
//           className={`editable_display ${
//             props.displayClass ? props.displayClass : ""
//           }`}
//           onClick={() => setIsEditable(true)}
//         >
//           {props.text}
//         </p>
//       )}
//     </div>
//   );
// }
