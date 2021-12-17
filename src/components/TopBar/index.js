import styled from 'styled-components'

export default function TopBar() {
    return (
        <>
            <Topbar className="flex-center">
                <h1>CINEFLEX</h1>
            </Topbar>
        </>
    )
}

const Topbar = styled.div`
    width: 100%;
    height: 67px;

    background-color: #C3CFD9;

    position: fixed;
    top: 0;
    left: 0;

    h1 {
        font-size: 34px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px;
        letter-spacing: 0em;
        color: #E8833A;
    }
`