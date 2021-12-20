import styled from "styled-components"

export default function Sucess(props) {
    return (
        <>
            <SucessContainer className={`flex-center`}>

                <SucessContent className={``}>
                    <div className="sucess">
                        <p>Pedido feito <br></br> com sucesso!</p>

                        <div className="movie">
                            <h5>Filme e sessão</h5>
                            <h6>{props.title}</h6>
                            <h6>{props.date} {props.time}</h6>
                        </div>

                        <div className="ticket">
                            <h5>Ingressos</h5>

                            {props.seatsReservedName.map((seatReserved) =>
                                <h6>Assento {seatReserved}</h6>
                            )}

                        </div>

                        <div className="buyer-data">
                            <h5>Comprador</h5>
                            <h6>Nome: {props.name}</h6>
                            <h6>CPF: {props.cpf}</h6>
                        </div>

                        <button>Voltar para Home</button>
                    </div>
                </SucessContent >


            </SucessContainer>
        </>
    )
}

const SucessContainer = styled.div`
    width: 100%;
    padding-top: 100px;

    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 100px 26px 0 26px;

    

`

const SucessHeader = styled.div`

    display: flex;
    justify-content: center;

    margin-bottom: 50px;

    p {

        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.04em;
        text-align: center;

        color: #247A6B;

        width: 60%;

    }

    
`

const SucessContent = styled.div`

    .sucess {
        display: flex;
        flex-direction: column;
    }

    p {

        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.04em;
        text-align: center;

        color: #247A6B;

        width: 100%;

        margin-bottom: 40px;

        background-color: red;

    }

    button {
        width: 225px;
        height: 42px;
        margin-top: 70px;

        border-radius: 3px;

        background-color: #E8833A;
    }

    h5 {

        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0.04em;
        text-align: left;

        color: #293845;

        margin-bottom: 15px;

    }

    h6 {

        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0.04em;
        text-align: left;

        color: #293845;
    }

    .movie, .ticket, .buyer-data {
        margin-bottom: 25px;
    }

    
`