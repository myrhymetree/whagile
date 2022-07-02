import React from "react";
import styled from "styled-components";
import KanbanList from "./KanbanList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AddButton from "./AddButton";
const KanbanBoardContainer = styled.div`
  background: #282936;
  padding: 4px;
  width: 250px;
  min-height: 600px;
  border-radius: 15px;
  float: left;
  color: white;
  margin: 20px;
`;



// ***********************************************
function KanbanBoard({cards, updateCard, deleteCard, openAddCardModal, openDraft}) {


  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanBoardContainer>
        <KanbanList
          title="백로그"
          status="backlog"
          cards={cards.filter(
            (card) => card.get("status") === "backlog"
          )}
          updateCard={updateCard}
          deleteCard={deleteCard}
          openAddCardModal={openAddCardModal}
          openDraft={openDraft}
        />
        <AddButton />
      </KanbanBoardContainer>
      <KanbanBoardContainer>
        <KanbanList
          title="진행 전"
          status="before"
          cards={cards.filter(
            (card) => card.get("status") === "before"
          )}
          updateCard={updateCard}
          deleteCard={deleteCard}
          openAddCardModal={openAddCardModal}
          openDraft={openDraft}
        />
        <AddButton />
      </KanbanBoardContainer>
      <KanbanBoardContainer>
        <KanbanList
          title="진행 중"
          status="ongoing"
          cards={cards.filter(
            (card) => card.get("status") === "ongoing"
          )}
          updateCard={updateCard}
          deleteCard={deleteCard}
          openAddCardModal={openAddCardModal}
          openDraft={openDraft}
        />
        <AddButton />
      </KanbanBoardContainer>
      <KanbanBoardContainer>
        <KanbanList
          title="완료"
          status="done"
          cards={cards.filter((card) => card.get("status") === "done")}
          updateCard={updateCard}
          deleteCard={deleteCard}
          openAddCardModal={openAddCardModal}
          openDraft={openDraft}
        />
        <AddButton />
      </KanbanBoardContainer>
    </DndProvider>
  );
}

// ***********************************************

// class KanbanBoard extends Component {
//   render() {
//     return (
//       <DndProvider backend={HTML5Backend}>
//           <KanbanBoardContainer>
//             <KanbanList
//               title="백로그"
//               status="backlog"
//               cards={this.props.cards.filter(
//                 (card) => card.get("status") === "backlog"
//               )}
//               updateCard={this.props.updateCard}
//               deleteCard={this.props.deleteCard}
//               openAddCardModal={this.props.openAddCardModal}
//               openDraft={this.props.openDraft}
//             />
//             <AddButton />
//           </KanbanBoardContainer>
//           <KanbanBoardContainer>
//             <KanbanList
//               title="진행 전"
//               status="before"
//               cards={this.props.cards.filter(
//                 (card) => card.get("status") === "before"
//               )}
//               updateCard={this.props.updateCard}
//               deleteCard={this.props.deleteCard}
//               openAddCardModal={this.props.openAddCardModal}
//               openDraft={this.props.openDraft}
//             />
//             <AddButton />
//           </KanbanBoardContainer>
//           <KanbanBoardContainer>
//             <KanbanList
//               title="진행 중"
//               status="ongoing"
//               cards={this.props.cards.filter(
//                 (card) => card.get("status") === "ongoing"
//               )}
//               updateCard={this.props.updateCard}
//               deleteCard={this.props.deleteCard}
//               openAddCardModal={this.props.openAddCardModal}
//               openDraft={this.props.openDraft}
//             />
//             <AddButton />
//           </KanbanBoardContainer>
//           <KanbanBoardContainer>
//             <KanbanList
//               title="완료"
//               status="done"
//               cards={this.props.cards.filter(
//                 (card) => card.get("status") === "done"
//               )}
//               updateCard={this.props.updateCard}
//               deleteCard={this.props.deleteCard}
//               openAddCardModal={this.props.openAddCardModal}
//               openDraft={this.props.openDraft}
//             />
//             <AddButton />
//           </KanbanBoardContainer>
//       </DndProvider>
//     );
//   }
// }

export default KanbanBoard;
