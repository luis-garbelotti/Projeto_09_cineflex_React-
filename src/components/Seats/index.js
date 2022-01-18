import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";

export default function Seats() {

    const [sessionSeats, setSessionSeats] = useState(null)
    const { idSessao } = useParams();
    const [selected, setSelected] = useState(false);
    const [hiddenSucess, setHiddenSucess] = useState('hidden');
    const [hidden, setHidden] = useState('')
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [seatsReserve, setSeatsReserve] = useState([]);

    let seatsReserved = [];
    let seatsReservedName = [];

    const isFilled = (name !== "" && cpf !== "");

    useEffect(() => {
        const seatsRequisition = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)

        seatsRequisition.then((seat) => {
            setSessionSeats(seat.data);
        })
    }, []);

    if (!sessionSeats) {
        return <Loading />
    }

    function checkSeat(check, numberSeat) {

        numberSeat.isAvailable === 'selected' ? numberSeat.isAvailable = true : numberSeat.isAvailable === true ? numberSeat.isAvailable = 'selected' : numberSeat.isAvailable = false;

        !check ? alert('Esse assento não está disponível') : selected === false ? setSelected(true) : setSelected(false);

    }

    function reserve() {

        for (let i = 0; i < sessionSeats.seats.length; i++) {

            if (sessionSeats.seats[i].isAvailable === 'selected') {
                seatsReserved.push(sessionSeats.seats[i].id);
                seatsReservedName.push(sessionSeats.seats[i].name);
            }

            setSeatsReserve([...seatsReservedName]);

        }

        if (seatsReserved.length === 0) {

            alert("Selecione no mínimo 1 (um) assento para continuar");

        } else if (name === '' || cpf === '') {

            alert("Preencha os dados corretamente.");

        } else if (cpf.length !== 11) {

            alert("Digite um CPF válido e apenas com números, sem pontos ( . ) ou traços ( - )")

        } else {

            let reserve = { ids: seatsReserved, name: name, cpf: cpf };

            const promisse = axios.post("https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many", reserve);
            promisse.then(sendData());

        }

    }

    function sendData() {

        setHiddenSucess('');
        setHidden('hidden');

    }

    return (
        <>

            <Container className={`flex-center ${hidden}`}>

                <SeatsHeader className="flex-center">

                    <h2>Selecione o(s) assento(s)</h2>

                </SeatsHeader>

                <SeatList>

                    {sessionSeats.seats.map((numberSeat) =>
                        <SeatNumber className={`flex-center pointer`} key={numberSeat.id}
                            seatAvailable={numberSeat.isAvailable} onClick={() => checkSeat(numberSeat.isAvailable, numberSeat)}>
                            <span>{numberSeat.name}</span>
                        </SeatNumber >
                    )}

                </SeatList>

                <SeatStatus>

                    <div className="flex-center selected">
                        <div></div>
                        <span>Selecionado</span>
                    </div>

                    <div className="flex-center available">
                        <div></div>
                        <span>Disponível</span>
                    </div>

                    <div className="flex-center unavailable">
                        <div></div>
                        <span>Indisponível</span>
                    </div>

                </SeatStatus>

                <SeatData>

                    <div className="buyer">

                        <p>Nome do comprador: </p>
                        <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Digite seu nome..."></input>

                        <p>CPF do comprador: </p>
                        <input type="text" onChange={e => setCpf(e.target.value)} value={cpf} placeholder="Digite seu CPF..."></input>

                    </div>

                    <Button className="pointer" isFilled={isFilled} onClick={reserve}>Reservar assento(s)</Button>

                </SeatData>

                <SeatFooter>

                    <div className="flex-center image">
                        <img src={sessionSeats.movie.posterURL} />
                    </div>

                    <div className="text">
                        <span>{sessionSeats.movie.title}</span>
                        <span>{sessionSeats.day.weekday} - {sessionSeats.name}</span>
                    </div>

                </SeatFooter>

            </Container>

            <SucessContainer className={`flex-center`} hiddenSucess={hiddenSucess}>

                <SucessContent className={`${hiddenSucess}`}>
                    <div className="sucess">
                        <p>Pedido feito <br></br> com sucesso!</p>

                        <div className="movie">
                            <h5>Filme e sessão</h5>
                            <h6>{sessionSeats.movie.title}</h6>
                            <h6>{sessionSeats.day.date} {sessionSeats.name}</h6>
                        </div>

                        <div className="ticket">

                            <h5>Ingressos</h5>

                            {seatsReserve.map((reservedSeat) =>
                                <h6 key={reservedSeat} > Assento {reservedSeat}</h6>
                            )}

                        </div>

                        <div className="buyer-data">
                            <h5>Comprador</h5>
                            <h6>Nome: {name}</h6>
                            <h6>CPF: {cpf}</h6>
                        </div>

                        <div>
                            <Link to={'/'}>
                                <button>Voltar para Home</button>
                            </Link>
                        </div>
                    </div>
                </SucessContent >

            </SucessContainer>

        </>
    )
}

const Container = styled.div` 

    flex-direction: column;
    padding: 0 20px 200px 20px;

`

const SeatsHeader = styled.div`

    width: 100%;
    height: 100px;
    
    margin-top: 67px;
    margin-bottom: 0;

    h2 {
        font-size: 24px;
        font-weight: 400;
        line-height: 28px;
        letter-spacing: 0.04em;
        text-align: center;

        color: #293845;

        width: 100%;

    }
`

const SeatList = styled.div`

    width: 100%;
    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

`

const SeatNumber = styled.div`

    width: 26px;
    height: 26px;
    margin: 0 3px 26px 3px;

    border: 1px solid ${({ seatAvailable }) => !seatAvailable ? '#F7C52B' : seatAvailable === 'selected' ? '#1AAE9E' : '#7B8B99'};

    background-color: ${({ seatAvailable }) => !seatAvailable ? '#FBE192' : seatAvailable === 'selected' ? '#8DD7CF' : '#C3CFD9'};

    border-radius: 50%;

    span {

        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0.04em;
        text-align: center;

    }
`

const SeatStatus = styled.div`

    width: 90%;
    height: auto;
    margin: 0;

    display: flex;
    justify-content: space-around;

    div {
        flex-direction: column;
    }

    span {

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 15px;
        letter-spacing: -0.013em;
        text-align: left;

        color: #4E5A65;
  
    }

    .selected div {

        width: 25px;
        height: 25px;

        border-radius: 50%;
        border: 1px solid #1AAE9E;
        background-color: #8DD7CF;

    }

    .available div {

        width: 25px;
        height: 25px;

        border-radius: 50%;
        border: 1px solid #7B8B99;
        background-color: #C3CFD9;

    }

    .unavailable div {

        width: 25px;
        height: 25px;

        border-radius: 50%;
        border: 1px solid #F7C52B;
        background-color: #FBE192;

    }

    .flex-center span {
        margin-top: 8px;
    }
`

const SeatData = styled.div`

    margin-top: 45px;
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    .buyer {
        width: 100%;
    }

    p {

        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

        color: #293845;

    }

    input {

        width: 100%;
        height: 51px;
        margin-bottom: 7px;
        padding-left: 18px;

        border: 1px solid #D4D4D4;
        border-radius: 3px;

        background-color: #ffffff;

    }

    input::placeholder {

        font-size: 18px;
        font-style: italic;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

    }
`

const Button = styled.button`

    width: 225px;
    height: 42px;
    margin-top: 57px;

    border-radius: 3px;

    background-color: ${(props) => props.isFilled ? '#E8833A' : '#C0BCB9'};
    color: #ffffff;

`

const SeatFooter = styled.div`

    width: 100%;
    height: 117px;

    background-color: #DFE6ED;

    position: fixed;
    bottom: 0;
    left: 0;

    border: 1px solid #9EADBA;

    display: flex;
    align-items: center;

    .text {

        display: flex;
        flex-direction: column;
        width: auto;
        height: auto;
        
    }

    .image {

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

const SucessContainer = styled.div`
    width: 100%;
    padding-top: 100px;

    display: flex;
    justify-content: center;
    flex-direction: column;  

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

    }

    button {

        width: 225px;
        height: 42px;
        margin-top: 70px;
        margin-bottom: 30px;

        border-radius: 3px;

        background-color: #E8833A;

        color: #ffffff;

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

