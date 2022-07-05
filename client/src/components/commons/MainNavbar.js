import MainNavbarCSS from "./MainNavbar.module.css";
import { callGetProjectAPI } from "../../apis/ProjectAPICalls";

import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import Icon from "@mdi/react";
import { mdiMonitorDashboard } from "@mdi/js";

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"; /* 페이지 강제 이동 */

function MainNavbar({projectCode}) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector(state => state.projectsReducer);
  console.log(project);

  const number = parseInt(`${projectCode}`);
  console.log('project', number);

  let items = [
    {
      label: "대시보드",
      icon: "pi pi-fw pi-chart-pie",
      command: () => {
        navigate(`/project/${ projectCode }/dashboard`);
      },
    },
    {
      label: "백로그 및 스프린트",
      icon: "pi pi-fw pi-inbox",
      command: () => {
        navigate(`/project/${ projectCode }/backlog-and-sprint`);
      },
    },
    {
      label: "간트차트",
      icon: "pi pi-fw pi-chart-bar",
      command: () => {
        navigate(`/project/${ projectCode }/gantt`);
      },
    },
    {
      label: "칸반보드",
      icon: "pi pi-fw pi-th-large",
      command: () => {
<<<<<<< HEAD
        navigate(`/project/kanban-boards`);
=======
        navigate(`/project/${ projectCode }/kanban-board`);
>>>>>>> 04e74ad9854feeea9d740be79f1c036bad550cf0
      },
    },
    {
      label: "히스토리",
      icon: "pi pi-fw pi-history",
      command: () => {
        navigate(`/project/${ projectCode }/history`);
      },
    },
    {
      label: "프로젝트 관리",
      icon: "pi pi-fw pi-cog",
      command: () => {
        navigate(`/project/${ projectCode }/management`);
      },
    },
  ];

  useEffect(
    () => {
        dispatch(callGetProjectAPI({
            'projectCode': number
        }));
    },
    []
);

  return (
    <nav id={ MainNavbarCSS.navbar }>
      <div className={ MainNavbarCSS.projectName }>
        <Icon
          path={mdiMonitorDashboard}
          title="User Profile"
          size={0.8}
          color="#9B9EA3"
        />
        <span style={{ marginLeft: "8px" }}>{ project[0].projectName }</span>
      </div>
      <div>
        <Menu model={ items }/>
      </div>
      <div>
        <Button
          id={MainNavbarCSS.projectListBtn}
          label="프로젝트 목록"
          className="p-button-raised"
          onClick={() => navigate("/projects")}
        />
      </div>
    </nav>
  );
}

export default MainNavbar;
