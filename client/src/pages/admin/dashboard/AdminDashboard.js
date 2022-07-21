import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../../components/items/PageTitle';
import styles from './AdminDashboard.module.css';
import '../AdminStyle.css';

import { callGetAdminStatisticsAPI, callGetAdminStatisticsChartAPI } from '../../../apis/AdminStatisticsAPICalls';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Chart } from 'primereact/chart';

function AdminDashboard() {

	const counts = useSelector(state => state.adminStatisticsReducer);
	const chartCounts = useSelector(state => state.adminStatisticsChartReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('day');
    const [searchValue, setSearchValue] = useState(new Date());
	const [userCount, setUserCount] = useState({});
	const [projectCount, setProjectCount] = useState({});
	const [sprintCount, setSprintCount] = useState({});

	// const [basicData] = useState({
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     datasets: [
    //         {
    //             label: 'My First dataset',
    //             backgroundColor: '#42A5F5',
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         },
    //         {
    //             label: 'My Second dataset',
    //             backgroundColor: '#FFA726',
    //             data: [28, 48, 40, 19, 86, 27, 90]
    //         }
    //     ]
    // });

	const onChangeDate = (e) => {

		setSearchValue(e.value);

		setUserCount({});
		
		dispatch(callGetAdminStatisticsChartAPI({
			searchCondition: viewMode,
			searchValue: e.value
		}));
	}

	const onChangeView = (value) => {

		setViewMode(value);

		setUserCount({});
		
		dispatch(callGetAdminStatisticsChartAPI({
			searchCondition: value,
			searchValue: searchValue
		}));
	}

	useEffect(
		() => {

			dispatch(callGetAdminStatisticsAPI());
			dispatch(callGetAdminStatisticsChartAPI({
				searchCondition: viewMode,
				searchValue: searchValue
			}));
		},
		[]
	);

	useEffect(
		() => {
			
			let searchDate = new Date(searchValue);
			let monthLastDay = new Date(searchDate.getFullYear(), searchDate.getMonth() + 1, 0).getDate();
			let lastMonth = 12;

			let labels = [];
			if(viewMode === 'day') {
				for(let	i = 0; i < monthLastDay; i++) labels.push(i + 1);
			} else {
				for(let	i = 0; i < lastMonth; i++) labels.push(i + 1);
			}

			let newUserCount = [];
			let resignedUserCount = [];
			let newProjectCount = [];
			let newSprintCount = [];
			let deletedSprintCount = [];
			
			if(Object.keys(chartCounts).length > 0) {

				for(let i = 0; i < labels.length; i++) {
					
					// 신규 회원 수
					let nFlag = false;
					chartCounts.newUserCount.map(el => {

						if(parseInt(el.day) === labels[i]) {

							newUserCount.push(el.count);
							nFlag = true;
						}
					})
					if(!nFlag) newUserCount.push(0);

					// 탈퇴 회원 수
					let rFlag = false;
					chartCounts.resignedUserCount.map(el => {

						if(parseInt(el.day) === labels[i]) {

							resignedUserCount.push(el.count);
							rFlag = true;
						}
					})
					if(!rFlag) resignedUserCount.push(0);

					// 생성된 프로젝트 수
					let npFlag = false;
					chartCounts.newProjectCount.map(el => {

						if(parseInt(el.day) === labels[i]) {

							newProjectCount.push(el.count);
							npFlag = true;
						}
					})
					if(!npFlag) newProjectCount.push(0);

					// 생성된 스프린트 수
					let nsFlag = false;
					chartCounts.newSprintCount.map(el => {

						if(parseInt(el.day) === labels[i]) {

							newSprintCount.push(el.count);
							nsFlag = true;
						}
					})
					if(!nsFlag) newSprintCount.push(0);

					// 삭제된 스프린트 수
					let rsFlag = false;
					chartCounts.deletedSprintCount.map(el => {

						if(parseInt(el.day) === labels[i]) {

							deletedSprintCount.push(el.count);
							rsFlag = true;
						}
					})
					if(!rsFlag) deletedSprintCount.push(0);
				}
			}
			
			setUserCount({ 
				labels: labels,
				datasets: [
					{
						type: 'bar',
						label: '신규 회원 수',
						backgroundColor: '#FFB95F',
						data: newUserCount
					},
					{
						type: 'bar',
						label: '탈퇴 회원 수',
						backgroundColor: 'grey',
						// data: resignedUserCount //TODO: 탈퇴 회원에 대한 히스토리가 없어 노출을 막아둠(주석 풀면 신규회원 수와 같은 수가 들어감)
					},
				],
			});

			setProjectCount({ 
				labels: labels,
				datasets: [
					{
						type: 'bar',
						label: '신규 프로젝트 수',
						backgroundColor: '#42A5F5',
						data: newProjectCount
					},
				],
			});

			setSprintCount({ 
				labels: labels,
				datasets: [
					{
						type: 'bar',
						label: '생성된 스프린트 수',
						backgroundColor: '#F86064',
						data: newSprintCount
					},
					{
						type: 'bar',
						label: '삭제된 스프린트 수',
						backgroundColor: 'grey',
						data: deletedSprintCount
					},
				],
			});
		},
		[chartCounts, viewMode, searchValue]
	);

	let stackedOptions = { // stacked chart css
		maintainAspectRatio: false,
		aspectRatio: .8,
		plugins: {
			tooltips: {
				mode: 'index',
				intersect: false
			},
			legend: {
				labels: {
					color: 'lightgrey'
				}
			}
		},
		scales: {
			x: {
				stacked: true,
				ticks: {
					color: '#495057'
				},
				grid: {
					color: 'grey'
				}
			},
			y: {
				stacked: true,
				ticks: {
					color: '#495057'
				},
				grid: {
					color: 'grey'
				}
			}
		}
	};

    return (
        <section className="section">
            {/* title */}
            <PageTitle 
                icon={<i className="pi pi-fw pi-chart-bar"></i>}
                text="대시보드"
            />

			{/* content(summary) */}
			<div id={styles.summaryContainer}>

				<div className={styles.summaryElement}>
					전체 회원 수 
					<div onClick={() => navigate(`/admin/member`)}>
						{counts.ALL_MEMBER_COUNT}명
					</div>
				</div>
				<div className={styles.summaryElement}>
					전체 프로젝트 수
					<div>
						{counts.ALL_PROJECT_COUNT}개
					</div>
				</div>
				<div className={styles.summaryElement}>
					전체 스프린트 수
					<div>
						{counts.ALL_SPRINT_COUNT}개
					</div>
				</div>
				<div className={styles.summaryElement}>
					전체 일감 / 백로그 수
					<div>
						{counts.ALL_TASK_COUNT}개 / {counts.ALL_BACKLOG_COUNT}개
					</div>
				</div>
				<div className={styles.summaryElement}>
					프로젝트 별 평균 스프린트 수
					<div>
						{counts.AVG_SPRINT_COUNT}개
					</div>
				</div>
				<div className={styles.summaryElement}>
					프로젝트 별 평균 일감 / 백로그 수
					<div>
						{counts.AVG_TASK_COUNT}개 / {counts.AVG_BACKLOG_COUNT}개
					</div>
				</div>
			</div>

            {/* search */}
            <div id={styles.searchContainer}>

				<span style={{marginRight: '20px'}}>날짜</span>
				{
					(viewMode === 'day') &&
					<Calendar 
						value={searchValue} 
						onChange={(e) => onChangeDate(e)} 
						view="month" 
						dateFormat="yy-mm" 
						style={{width: '300px'}}
						showIcon
					/>
				}

				{
					(viewMode === 'month') &&
					<Calendar 
						value={searchValue} 
						onChange={(e) => onChangeDate(e)} 
						view="year" 
						dateFormat="yy" 
						style={{width: '300px'}}
						showIcon
					/>
				}

                <div id={styles.period}>
					<Button 
						className="p-button-outlined p-button-custom"  
						label="Day"
						style={{
							width: '80px',
							height: '40px',
							backgroundColor: (viewMode === 'day')? '#00AA9C': '#333544',
							color: '#FFFFFFAA',
							border: '1px solid #333544',
							marginLeft: '20px'
						}}
						onClick={() => onChangeView('day')}
					/>

					<Button 
						className="p-button-outlined p-button-custom"  
						label="Month"
						style={{
							width: '80px',
							height: '40px',
							backgroundColor: (viewMode === 'month')? '#00AA9C': '#333544',
							color: '#FFFFFFAA',
							border: '1px solid #333544',
						}}
						onClick={() => onChangeView('month')}
					/>
					
				</div>
            </div>

            {/* content */}
            <div id={styles.contentContainer}>

				<div className={styles.row}>

					<div className={styles.cell}>
						<div className="card">
							<h5>신규/탈퇴 회원 수</h5>
							<Chart 
								type="bar" 
								data={userCount} 
								options={stackedOptions} 
							/>
						</div>
					</div>

					<div className={styles.cell}>
						<div className="card">
							<h5>신규 프로젝트 수</h5>
							<Chart 
								type="bar" 
								data={projectCount} 
								options={stackedOptions} 
							/>
						</div>
					</div>
					
				</div>

				<div className={styles.row}>

					<div className={styles.cell}>
						<div className="card">
							<h5>생성/삭제된 스프린트 수</h5>
							<Chart 
								type="bar" 
								data={sprintCount} 
								options={stackedOptions} 
							/>
						</div>
					</div>

					{/* <div className={styles.cell}>
						<div className="card">
							<h5>생성/삭제된 스프린트 수</h5>
							<Chart 
								type="bar" 
								data={sprintCount} 
								options={stackedOptions} 
							/>
						</div>
					</div> */}
				</div>

				{/* <div className={styles.row}>

					<div className={styles.cell}>
						<div className="card">
							<h5>생성/삭제된 스프린트 수</h5>
							<Chart 
								type="bar" 
								data={sprintCount} 
								options={stackedOptions} 
							/>
						</div>
					</div>

					<div className={styles.cell}>
						<div className="card">
							<h5>생성/삭제된 스프린트 수</h5>
							<Chart 
								type="bar" 
								data={sprintCount} 
								options={stackedOptions} 
							/>
						</div>
					</div>
				</div> */}
			</div>

        </section>
    );
}

export default AdminDashboard;