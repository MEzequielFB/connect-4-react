import PropTypes from 'prop-types'
import { COLORS } from '../constants/constants'

function WinnerModal({ isWinner, winner, resetGame }) {
    let modalClassName = isWinner || isWinner === null ? 'winner-modal' : 'winner-modal hidden'
    let backgroundClassName = isWinner || isWinner === null ? 'transparent-background' : 'transparent-background hidden'
    let playerWinner = winner === COLORS.player1 ? 'Player 1' : 'Player 2'

    return(
        <>
            <div className={backgroundClassName} />
            <div className={modalClassName}>
                {
                    isWinner
                        ? <h1>The winner is <strong style={{color: winner}}>{playerWinner}</strong> !!!</h1>
                        : <h1>Draw !</h1>
                }
                <div className='slot-circle' style={{backgroundColor: winner}}></div>

                <button onClick={resetGame}>Play again!</button>
            </div>
        </>
    )
}

WinnerModal.propTypes = {
    isWinner: PropTypes.bool,
    winner: PropTypes.string,
    resetGame: PropTypes.func
}

export default WinnerModal