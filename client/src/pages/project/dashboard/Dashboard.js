import PageTitle from '../../../components/items/PageTitle';
import '/node_modules/primeflex/primeflex.scss';
import DashboardCSS from './Dashboard.module.css';

function Dashboard() {

    return (
        <>
            <PageTitle
                icon={ <i className="pi pi-fw pi-chart-pie"></i> }
                text="대시보드"
            />
            <div className="flex flex-wrap card-container blue-container" style={{maxWidth: 100 + '%'}}>
                <div className="flex align-items-center justify-content-center bg-black-alpha-30 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>업무리포트</div>
                <div className="flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>2</div>
                <div className="flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>3</div>
                <div className="flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 border-round" style={{minWidth: 200 + 'px', minHeight: 100 + 'px'}}>4</div>
            </div>
        </>
    );
}

export default Dashboard;