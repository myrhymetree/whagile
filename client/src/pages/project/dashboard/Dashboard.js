import PageTitle from '../../../components/items/PageTitle';
import '/node_modules/primeflex/primeflex.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardCSS from './Dashboard.module.css';
import { callGetProjectStatisticsAPI } from '../../../apis/ProjectStatisticsAPICalls';
import { callGetNoticeAPI, callGetProjectMemberAPI } from '../../../apis/ProjectAPICalls';
import { Chart } from 'primereact/chart';
import { Editor } from 'primereact/editor';

function Dashboard() {

    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const { taskInfo, setTaskInfo } = useState([]);
    const [text, setText] = useState('');
     const taskCounts = useSelector(state => state.projectStatisticsReducer);
    const notice = useSelector(state => state.ProjectNoticeReducer);
    const members = useSelector(state => state.projectMemberReducer);
    console.log('통계', taskCounts);
    console.log('공지', notice);
    console.log('멤버목록', members);

    useEffect(
        () =>
        {
            dispatch(callGetProjectStatisticsAPI({
                'projectCode': projectCode
            }));

            dispatch(callGetNoticeAPI({
                'projectCode': projectCode
            }));

            dispatch(callGetProjectMemberAPI({
                'projectCode': projectCode
            }));
        },
        []
      );


    //   useEffect(
    //     () =>
    //     {
    //         if(taskCounts !== 'undefined' && taskCounts > 0) {

    //             setTaskInfo(taskCounts);
    //         }
    //     },
    //     [taskCounts]
    //   );

        const [chartData] = useState({
            labels: ['진행 전', '진행 중', '완료'],
            datasets: [
                {
                    data: [taskCounts.pendingTaskCntToProject, taskCounts.progressingTaskCntToProject, taskCounts.completedTaskCntToProject],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        });

        const [lightOptions] = useState({
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: { size: 15}
                    }
                },
                title: {
                    display: true,
                    text: '프로젝트 내 상태 별 일감 개수',
                    color: 'white',
                    position: 'bottom',
                    padding: {
                        top: 30,
                        bottom: 30
                    },
                    font: {
                        weight: 'bold',
                        style: 'normal',
                        size: 20
                    }
                }
            }
        });

        const renderHeader = () => {
            return (
                <span className="ql-formats">
                    <button className="ql-bold" aria-label="Bold"></button>
                    <button className="ql-italic" aria-label="Italic"></button>
                    <button className="ql-underline" aria-label="Underline"></button>
                </span>
            );
        }

        const header = renderHeader();

    return (
        <>
            <PageTitle
                icon={ <i className="pi pi-fw pi-chart-pie"></i> }
                text="대시보드"
            />
            <div className="flex flex-wrap card-container blue-container" style={{maxWidth: 100 + '%'}}>
                <div className="flex align-items-center justify-content-center bg-black-alpha-10 font-bold text-white m-2 border-round" style={{minWidth: 1000 + 'px', minHeight: 100 + 'px'}}>
                    {/* <label style={{  }}>업무리포트</label> */}
                    <Chart type="doughnut" data={chartData} options={lightOptions} />
                </div>
                <div className="flex align-items-center justify-content-center bg-black-alpha-10 font-bold text-white m-2 border-round" style={{minWidth: 1000 + 'px', minHeight: 100 + 'px'}}>
                    <label style={{ position: 'relative', width: '100%', height: '100%' }}>공지사항</label>
                    <p style={{ width: '150%', height: '10%', fontWeight: 'lighter' }}>{ notice.content}</p>
                    {/* <Editor style={{ height: '100px' }} value={ text } onTextChange={(e) => setText(e.htmlValue)} /> */}
                </div>
                {/* <div className="flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>
                    팀원목록
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>
                    업무목록
                </div> */}
            </div>
        </>
    );
}

export default Dashboard;