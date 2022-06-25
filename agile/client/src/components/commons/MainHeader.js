function MainHeader() {

    console.log(window.localStorage.getItem('access_token'));

    return (
        <h1>헤더</h1>
    );
}

export default MainHeader;