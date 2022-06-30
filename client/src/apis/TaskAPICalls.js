import { GET_TASKS } from "../modules/TaskModule";

function callGetTaskAPI(url) {
  const requestURL = url || "http://localhost:8888/api/tasks";

  return async function getTasks(dispatch, getState) {
    const result = await fetch(requestURL).then((res) => res.json());

    console.log("result : ", result.results);
    dispatch({ type: GET_TASKS, payload: result.results });
  };
}

export default callGetTaskAPI;