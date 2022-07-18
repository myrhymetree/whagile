import { decodeJwt } from "../../../utils/tokenUtils"
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";

export default function TaskComment({taskCode, taskProjectCode, sprintCode}) {
    const user = decodeJwt(window.localStorage.getItem('access_token'));


  return (
    <>
      <h1>댓글입니다.</h1>
      <InputTextarea></InputTextarea>
      <Button
        label="등록"
        onClick={console.log("등록버튼")}
      />
    </>
  );
}
