import { useState } from "react"
import PropTypes from 'prop-types'
import { COLORS } from "../constants/constants"
import Column from "./Column"
import Slot from "./Slot"

function Board({ rowsQuantity, columnsQuantity }) {
    /* const columns = Array(columnsQuantity).fill(null) */
    const [board, setBoard] = useState(Array(rowsQuantity).fill(Array(columnsQuantity).fill(null)))
    const [turn, setTurn] = useState(COLORS.player1)

    console.log('Board ', board)

    const updateBoard = (columnIndex) => {
        /* const boardColumn = board[0][columnIndex] */
        const rowIndex = getRowPositionToFill(columnIndex)
        
        if (rowIndex === null) return // Si la columna está llena retorna

        const newBoard = [...board]
        newBoard[rowIndex][columnIndex] = turn
        setBoard(newBoard)

        
        console.log('row | column ', rowIndex + ' ' + columnIndex)

        const newTurn = turn === COLORS.player1 ? COLORS.player2 : COLORS.player1
        setTurn(newTurn)
    }

    const getRowPositionToFill = (columnIndex) => {
        let positionToFill = null
        for (let rowIndex = board.length-1; rowIndex >= 0; rowIndex--) {
            if (board[rowIndex][columnIndex] === null) {
                positionToFill = rowIndex
                return positionToFill
            }
        }

        return positionToFill
    }

    /* const switchTurns = () => {
        const newTurn = turn === COLORS.player1 ? COLORS.player2 : COLORS.player1
        setTurn(newTurn)
    } */

    return(
        <section className="board">
            {
                board.map((row, rowIndex) => (
                    row.map((column, columnIndex) => (
                        <Slot
                            key={rowIndex + '' + columnIndex}
                            columnIndex={columnIndex}
                            turn={board[rowIndex][columnIndex]}
                            updateBoard={updateBoard}
                        />
                    ))
                ))
            }
        </section>
            /* {
                columns.map((_, index) => (
                    <Column
                        key={index}
                        turn={turn}
                        switchTurns={switchTurns}
                    />
                ))
            } */
    )
}

Board.propTypes = {
    rowsQuantity: PropTypes.number,
    columnsQuantity: PropTypes.number
}

export default Board