import PageTitle from '../../components/items/PageTitle';

function Management() {

    return (
        <main>
            <section>
                <PageTitle 
                    icon={<i className="pi pi-fw pi-cog"></i>}
                    text="프로젝트 관리"
                    />
            </section>
        </main>
    );
}

export default Management;