import { GET_TASKS } from "../modules/TasksModule";
import { GET_TASK } from "../modules/TaskModule";

//전체 일감 목록 조회 API
function callGetTasksAPI(url) {
  const requestURL = url || "http://localhost:8888/api/tasks";
    // console.log("requestURL:", requestURL);
  return async function getTasks(dispatch, getState) {
    const result = await fetch(requestURL).then((res) => res.json());

    // console.log("result : ", result.results);
    dispatch({ type: GET_TASKS, payload: result.results });
  };
}
export default callGetTasksAPI;



// 개별 일감 조회 API
export const callGetTaskAPI = (taskCode) => {
  console.log(taskCode);
  let requestURL = `http://localhost:8888/api/tasks/${taskCode}`;
  console.log("requestURL:", requestURL);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL).then((res) => res.json());

    dispatch({ type: GET_TASK, payload: result.results });
  };
};




// 개별 일감 생성 API


// 개별 일감 수정 API 


// 개별 일감 삭제 API