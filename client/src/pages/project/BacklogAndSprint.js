import PageTitle from '../../components/items/PageTitle';

function BacklogAndSprint() {

    return (
        <main>
            <section>
                <PageTitle
                    icon={ <i className="pi pi-fw pi-inbox"></i> }
                    text="백로그 및 스프린트"
                />
            </section>
        </main>
    );
}

export default BacklogAndSprint;