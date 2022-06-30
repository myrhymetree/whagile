import PageTitle from '../../../components/items/PageTitle';
import '../AdminStyle.css';

function AdminDashboard() {

    return (
        <section className="section">
            {/* title */}
            <PageTitle 
                icon={<i className="pi pi-fw pi-chart-bar"></i>}
                text="대시보드"
            />

            {/* search */}

            {/* table */}
            
        </section>
    );
}

export default AdminDashboard;