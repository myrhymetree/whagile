import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import TasksCreateModal from "./TasksCreateModal.module.css";


function TaskCreateModal() {

  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [position, setPosition] = useState("center");


  const dialogFuncMap = {
    displayBasic2: setDisplayBasic2,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          id={TasksCreateModal.TaskInnerCreateBtn}
          label="만들기"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
        <Button
          id={TasksCreateModal.TaskCancelBtn}
          label="취소"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
      </div>
    );
  };

  return (
    <>
      <Button
        id={TasksCreateModal.TaskCreateBtn}
        icon="pi pi-plus"
        onClick={() => onClick("displayBasic2")}
      />
      <Dialog
        id={TasksCreateModal.TaskCreateTitle}
        visible={displayBasic2}
        style={{ width: "50vw", height: "80vw" }}
        footer={renderFooter("displayBasic2")}
        onHide={() => onHide("displayBasic2")}
      >
        <div id={TasksCreateModal.TaskCreateTitle}>
          <p>일감 생성</p>
        </div>
        <hr />
        <div id={TasksCreateModal.TaskSummaryAndDescription}>
          <p>요약*</p>
        </div>
        <textarea
          id={TasksCreateModal.TaskTextArea}
          placeholder="일감의 제목을 입력해 주세요."
        />
        <div id={TasksCreateModal.TaskSummaryAndDescription}>
          <p>설명</p>
        </div>
        <textarea
          id={TasksCreateModal.TaskTextArea}
          placeholder="내용을 입력해 주세요."
        />

        <div id={TasksCreateModal.TaskOptions}>카테고리</div>
        <div id={TasksCreateModal.TaskOptions}>긴급도</div>
        <div id={TasksCreateModal.TaskOptions}>진행상태</div>
        <div id={TasksCreateModal.TaskOptions}>담당자</div>
      </Dialog>
    </>
  );
}

export default TaskCreateModal;

