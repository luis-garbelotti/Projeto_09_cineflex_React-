import styled from "styled-components"
import Loader from "react-loader-spinner"

export default function Loading() {
    return (
        <>
            <Load>

                <Wait className="flex-center">Carregando...</Wait>

                <div>
                    <Loader type="MutatingDots" color="#247A6B" secondaryColor="#E8833A" height={80} width={80} />
                </div>

            </Load>
        </>
    )
}

const Wait = styled.h1`

    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.04em;
    text-align: center;

    color: #293845;

    margin-top: 150px;
    margin-bottom: 50px;

`
const Load = styled.div`
    display: flex;
    flex-direction: column;

    div {
        margin-left: auto;
        margin-right: auto;
    }
`
