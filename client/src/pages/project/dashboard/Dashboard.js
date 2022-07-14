import PageTitle from '../../../components/items/PageTitle';
import '/node_modules/primeflex/primeflex.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardCSS from './Dashboard.module.css';
import { callGetProjectStatisticsAPI } from '../../../apis/ProjectStatisticsAPICalls';
import { Chart } from 'primereact/chart';
import { Editor } from 'primereact/editor';

function Dashboard() {

    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const { taskInfo, setTaskInfo } = useState([]);
    const [text1, setText1] = useState('<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>');
    const taskCounts = useSelector(state => state.projectStatisticsReducer);
    console.log('통계', taskCounts.includes);

    useEffect(
        () =>
        {
            dispatch(callGetProjectStatisticsAPI({
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
                    label: '맡고 있는 일감 갯수',
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
                <div className="flex align-items-center justify-content-center bg-black-alpha-30 font-bold text-white m-2 border-round" style={{minWidth: 1000 + 'px', minHeight: 100 + 'px'}}>
                    업무리포트
                    <Chart type="doughnut" data={chartData} options={lightOptions} style={{ position: 'relative', width: '30%' }} />
                </div>
                <div className="flex align-items-center justify-content-center bg-black-alpha-30 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>
                    공지사항
                    {/* <Editor style={{ height: '320px' }} value={text1} onTextChange={(e) => setText1(e.htmlValue)} /> */}
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>3</div>
                <div className="flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>4</div>
            </div>
        </>
    );
}

export default Dashboard;