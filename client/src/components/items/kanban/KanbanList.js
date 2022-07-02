import React from "react";
import styled from "styled-components";
import KanbanCard from "./KanbanCard";
import { DropTarget } from "react-dnd";


const KanbanListContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  margin:10px;
`;

const Title = styled.h2`
  border: 2px solid #00aa9c;
  border-radius: 15px;
  font-size: 15px;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00aa9c;
`;

const spec = {
  drop(props, monitor) {
    const droppedItem = monitor.getItem();
    props.updateCard({
      id: droppedItem.id,
      title: droppedItem.title,
      description: droppedItem.description,
      status: props.status,
      person: droppedItem.person,
      category: droppedItem.category,
      urgency: droppedItem.urgency,
    });
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}


function KanbanList({
  title,
  cards,
  updateCard,
  deleteCard,
  openAddCardModal,
  openDraft,
  connectDropTarget,
  isOver,
  canDrop,
}) {
  return connectDropTarget(
    <div>
      <KanbanListContainer
        style={{
          opacity: isOver && canDrop ? 0.3 : 1,
        }}
      >
        <Title>{title}</Title>
        {cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            updateCard={updateCard}
            deleteCard={deleteCard}
            openAddCardModal={openAddCardModal}
            openDraft={openDraft}
          />
        ))}
      </KanbanListContainer>
    </div>
  );
}








// class KanbanList extends Component {
//   formCards() {
//     return this.props.cards.map((card) => (
//       <KanbanCard
//         key={card.id}
//         card={card}
//         updateCard={this.props.updateCard}
//         deleteCard={this.props.deleteCard}
//         openAddCardModal={this.props.openAddCardModal}
//         openDraft={this.props.openDraft}
//       />
//     ));
//   }

//   render() {
//     const { connectDropTarget, isOver, canDrop } = this.props;

//     return connectDropTarget(
//       <div>
//         <KanbanListContainer
//           style={{
//             opacity: isOver && canDrop ? 0.3 : 1,
//           }}
//         >
//           <Title>{this.props.title}</Title>
//           {this.formCards()}
//         </KanbanListContainer>
//       </div>
//     );
//   }
// }

export default DropTarget("card", spec, collect)(KanbanList);
