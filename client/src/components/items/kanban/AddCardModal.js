import React from "react";
import styled from "styled-components";
import AddCardModalStyle from "./AddCardModal.module.css";


const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Dialog = styled.div`
  position: relative;
  padding: 10px;
  width: 800px;
  height: 800px;
  background-color: #282936;
  border: 1px solid #1d1e27;
  border-radius: 15px;
`;


const InputLabelStyle = `
  display: block;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  resize: none;
  background-color: #333544;
  border-color: #333544;
  color: #fff;
  focus-outline: 1px solid #00AA9C;
  border-radius:5px;
  padding:5px;

`; 

const InputDescriptionStyle = `
  display: block;
  width: 100%;
  height: 140px;
  margin-bottom: 10px;
  resize: none;
  background-color: #1D1E27;
  border-color: #333544;
  color: #fff;
  focus-outline: 1px solid #00AA9C;
  border-radius:5px;
  padding:10px;
  &:focus {
  outline: 1px solid #00AA9C;
  }
`; 

const InputTitleStyle = `
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  resize: none;
  background-color: #1D1E27;
  color: #fff;
  border-radius:5px;
  padding: 10px;
  border: none;
  &:focus {
  outline: 1px solid #00AA9C;
  }
`;

const InputSelectStyle = `{
  display: block;
  width: 100%;
  margin-bottom: 10px;
  resize: none;
  background-color: #1D1E27;
  border-color: #333544;
  color: #fff;
  focus-outline: 1px solid #00AA9C;
  &:focus {
  outline: 1px solid #00AA9C;
  }
}`;



const InputTitle = styled.input`
  ${InputTitleStyle}
`;

const InputDescription = styled.textarea`
  ${InputDescriptionStyle}
`;

const InputLabel = styled.label`
  ${InputLabelStyle}
`;
const InputSelectStatus = styled.select`
  ${InputSelectStyle}
`;

const InputSelectPerson = styled.select`
  ${InputSelectStyle}
`;

const Actions = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const CancelButton = styled.button`
  margin: 10px;
  color: #fff;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  background-color: #696a71;
`;
const SaveButton = styled.button`
  margin: 10px;
  color: #fff;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  background-color: #00aa9c;
`;


function AddCardModal ({clearDraft, closeAddCardModal, updateCard,draft,updateDraft }) {
  const cancel = ()  => {
    clearDraft();
    closeAddCardModal();
  }

  const save = (evt) => {
    updateCard({
      id: draft.get("id"),
      title: draft.get("title"),
      description: draft.get("description"),
      status: draft.get("status"),
      person: draft.get("person"),
      category: draft.get("category"),
      urgency: draft.get("urgency"),
    });
    clearDraft();
    closeAddCardModal();
  }

    return (
      <Background>
        <Overlay onClick={(evt) => closeAddCardModal()} />
        <Dialog>
          <div id={AddCardModalStyle.TaskCreateTitle}>
            <p>일감 생성</p>
          </div>
          <hr />
          <div id={AddCardModalStyle.TaskSummary}>
            <InputLabel>요약*</InputLabel>
            <InputTitle
              placeholder="필수 입력 사항입니다."
              value={draft.get("title")}
              onChange={(evt) => updateDraft("title", evt.target.value)}
            />
          </div>
          <div id={AddCardModalStyle.TaskDescription}>
            <InputLabel>설명</InputLabel>
            <InputDescription
              placeholder="설명을 적어주세요"
              value={draft.get("description")}
              onChange={(evt) => updateDraft("description", evt.target.value)}
            />
          </div>
          <div id={AddCardModalStyle.TaskOptions}>
            <div id={AddCardModalStyle.TaskOption}>
              <InputLabel>카테고리</InputLabel>
              <InputSelectStatus
                value={draft.get("category")}
                onChange={(evt) => updateDraft("category", evt.target.value)}
              >
                <option value="issue">이슈</option>
                <option value="basic">기본</option>
              </InputSelectStatus>
            </div>
            <div id={AddCardModalStyle.TaskOption}>
              <InputLabel>긴급도</InputLabel>
              <InputSelectStatus
                value={draft.get("urgency")}
                onChange={(evt) => updateDraft("urgency", evt.target.value)}
              >
                <option value="lowGrade">낮음</option>
                <option value="normalGrade">보통</option>
                <option value="HighGrade">긴급</option>
              </InputSelectStatus>
            </div>
            <div id={AddCardModalStyle.TaskOption}>
              <InputLabel>진행 상태</InputLabel>
              <InputSelectStatus
                value={draft.get("status")}
                onChange={(evt) => updateDraft("status", evt.target.value)}
              >
                <option value="backlog">백로그</option>
                <option value="before">진행 전</option>
                <option value="ongoing">진행 중</option>
                <option value="done">완료</option>
              </InputSelectStatus>
            </div>
            <div id={AddCardModalStyle.TaskOption}>
              <InputLabel>담당자</InputLabel>
              <InputSelectPerson
                value={draft.get("person")}
                onChange={(evt) => updateDraft("person", evt.target.value)}
              >
                <option value="NONE">담당자 없음</option>
                <option value="PM">PM</option>
                <option value="Member">회원</option>
                <option value="Lee">이호성</option>
                <option value="Sol">장한솔</option>
                <option value="Joo">장민주</option>
                <option value="Park">박성준</option>
                <option value="Jin">차우진</option>
              </InputSelectPerson>
            </div>
          </div>
          <Actions>
            <SaveButton onClick={save}>저장</SaveButton>
            <CancelButton onClick={(evt) => cancel()}>취소</CancelButton>
          </Actions>
        </Dialog>
      </Background>
    );
}

export default AddCardModal;
