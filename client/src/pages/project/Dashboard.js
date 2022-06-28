import PageTitle from '../../components/items/PageTitle';

function Dashboard() {

    return (
        <main>
            <section>
                <PageTitle
                    icon={ <i className="pi pi-fw pi-chart-pie"></i> }
                    text="대시보드"
                    />
            </section>
        </main>
    );
}

export default Dashboard;