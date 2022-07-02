import React from "react";
import styled from "styled-components";
import { DragSource } from "react-dnd";

const KanbanCardContainer = styled.div`
  width: 210px;
  height: 30px;
  background-color: #333544;
  border: 0px solid #00aa9c;
  border-radius: 20px;
  border-left-width: 8px;
  color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
`;

const spec = {
  beginDrag(props) {
    return {
      id: props.card.get("id"),
      title: props.card.get("title"),
      description: props.card.get("description"),
      person: props.card.get("person"),
    };
  },
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  };
}

// class KanbanCard extends Component {
//   render() {
//     const { connectDragSource} = this.props;
//     return connectDragSource(
//       <div>
//         <KanbanCardContainer
//           onClick={(evt) => {
//             this.props.openAddCardModal();
//             this.props.openDraft(this.props.card);
//           }}
//           onAuxClick={(evt) => this.props.deleteCard(this.props.card.get("id"))}
//         >
//           <Title>{this.props.card.title}</Title>
//         </KanbanCardContainer>
//       </div>
//     );
//   }
// }

function KanbanCard ({openAddCardModal, openDraft, card, deleteCard, connectDragSource }) {

  return connectDragSource(
    <div>
      <KanbanCardContainer
        onClick={(evt) => {
          openAddCardModal();
          openDraft(card);
        }}
        onAuxClick={(evt) => deleteCard(card.get("id"))}
      >
        <Title>{card.title}</Title>
      </KanbanCardContainer>
    </div>
  );
}

export default DragSource("card", spec, collect)(KanbanCard);
