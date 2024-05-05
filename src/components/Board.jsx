import { useState } from "react"
import PropTypes from 'prop-types'
import { COLORS } from "../constants/constants"
import Column from "./Column"

function Board({ columnsQuantity }) {
    const columns = Array(columnsQuantity).fill(null)
    const [turn, setTurn] = useState(COLORS.player1)

    const switchTurns = () => {
        const newTurn = turn === COLORS.player1 ? COLORS.player2 : COLORS.player1
        setTurn(newTurn)
    }

    return(
        <section className="board">
            {
                columns.map((_, index) => (
                    <Column
                        key={index}
                        turn={turn}
                        switchTurns={switchTurns}
                    />
                ))
            }
        </section>
    )
}

Board.propTypes = {
    columnsQuantity: PropTypes.number
}

export default Board