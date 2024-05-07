import PropTypes from 'prop-types'
import { COLORS } from '../constants/constants'

function WinnerModal({ isWinner, winner }) {
    let className = isWinner ? 'winner-modal' : 'winner-model hidden'
    let playerWinner = winner === COLORS.player1 ? 'Player 1' : 'Player 2'

    return(
        <div className={className}>
            <h1>The winner is {playerWinner}</h1>
            <div className='slot-circle' style={{backgroundColor: winner}}></div>
        </div>
    )
}

WinnerModal.propTypes = {
    isWinner: PropTypes.bool,
    winner: PropTypes.string
}

export default WinnerModal