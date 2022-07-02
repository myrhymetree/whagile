import React from "react";
import { connect } from "react-redux";
import { openAddCardModal } from "./actions";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  font-weight: bold;
  background-color: #333544;
  border-radius: 10px;
  border: none;
  width: 30px;
  height: 30px;
`;

function AddButton({openAddCardModal}) {

  return(
      <Button
        onClick={(evt) => {
          openAddCardModal();
        }}
      >
        +
      </Button>
  )
}


// class AddButton extends Component {
//   render() {
//     return (
//       <Button
//         onClick={(evt) => {
//           this.props.openAddCardModal();
//         }}
//       >
//         +
//       </Button>
//     );
//   }
// }

export default connect(null, { openAddCardModal })(AddButton);
