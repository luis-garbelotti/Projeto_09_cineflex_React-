import styled from "styled-components"

export default function SessionFooter({ movieTitle, location }) {
    return (

        <Background>

            <div className="flex-center">
                <img src={location.state.posterURL} />
            </div>

            <span>{movieTitle} </span>

        </Background>

    )
}

const Background = styled.div`

    width: 100%;
    height: 117px;

    background-color: #DFE6ED;

    position: fixed;
    bottom: 0;
    left: 0;

    border: 1px solid #9EADBA;

    display: flex;
    align-items: center;

    div {

        width: 64px;
        height: 89px;

        margin: 14px 14px 14px 10px;

        border-radius: 2px;

        background-color: #ffffff;

    }

    img {

        width: 48px;
        height: 72px;

    }

    span {

        font-size: 26px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        letter-spacing: 0em;
        text-align: left;

        color: #293845;

    }
`