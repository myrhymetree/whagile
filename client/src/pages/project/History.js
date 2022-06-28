import PageTitle from '../../components/items/PageTitle';

function History() {

    return (
        <main>
            <section>
                <PageTitle 
                    icon={<i className="pi pi-fw pi-history"></i>}
                    text="히스토리"
                />
            </section>
        </main>
    );
}

export default History;