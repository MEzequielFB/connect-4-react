import { useState } from "react"
import useSound from 'use-sound'
import PropTypes from 'prop-types'
import { COLORS } from "../constants/constants"
import Row from "./Row"
import WinnerModal from "./WinnerModal"
import applauseSfx from '../sounds/applause.mp3'

function Board({ rowsQuantity, columnsQuantity }) {
    const initialBoard = {
        rows: Array.from({ length: rowsQuantity }, () => ({
          columns: Array.from({ length: columnsQuantity }, () => ({ turn: null })),
        })),
    };
    const [board, setBoard] = useState(initialBoard)
    const [turn, setTurn] = useState(COLORS.player1)
    const [isWinner, setIsWinner] = useState(false)

    const [playApplause] = useSound(applauseSfx)

    console.log(board)

    const resetGame = () => {
        setBoard(initialBoard)
        setTurn(COLORS.player1)
        setIsWinner(false)
    }

    const updateBoard = (columnIndex) => {
        if (isWinner) return

        const rowIndex = getRowPositionToFill(columnIndex)
        
        if (rowIndex === null) return // Si la columna está llena retorna

        const newBoard = board
        newBoard.rows[rowIndex].columns[columnIndex].turn = turn
        setBoard(newBoard)
        
        console.log('row | column ', rowIndex + ' | ' + columnIndex)

        if (checkWinner(rowIndex, columnIndex)) {
            setIsWinner(true)
            console.log(turn + ' WON')
            playApplause()
            return
        }

        const newTurn = turn === COLORS.player1 ? COLORS.player2 : COLORS.player1
        setTurn(newTurn)
    }

    const checkWinner = (rowIndex, columnIndex) => {
        if (checkVertical(rowIndex, columnIndex)) return true
        if (checkHorizontal(rowIndex, columnIndex)) return true
        if (checkDiagonalLeft(rowIndex, columnIndex)) return true
        if (checkDiagonalRight(rowIndex, columnIndex)) return true

        return false
    }

    const checkVertical = (rowIndex, columnIndex) => {
        let consecutiveSlots = 1

        // Go up
        let i = rowIndex-1
        while (i >= 0 && board.rows[i].columns[columnIndex].turn === turn) {
            consecutiveSlots++
            i--
        }

        // Go down
        i = rowIndex+1
        while (i < board.rows.length && board.rows[i].columns[columnIndex].turn === turn) {
            consecutiveSlots++
            i++
        }

        console.log('Vertical ', consecutiveSlots)
        return consecutiveSlots >= 4 ? true : false
    }

    const checkHorizontal = (rowIndex, columnIndex) => {
        let consecutiveSlots = 1

        // Go left
        let i = columnIndex-1
        while (i >= 0 && board.rows[rowIndex].columns[i].turn === turn) {
            consecutiveSlots++
            i--
        }

        // Go right
        i = columnIndex+1
        while (i < board.rows[rowIndex].columns.length && board.rows[rowIndex].columns[i].turn === turn) {
            consecutiveSlots++
            i++
        }

        console.log('Horizontal ', consecutiveSlots)
        return consecutiveSlots >= 4 ? true : false
    }

    const checkDiagonalLeft = (rowIndex, columIndex) => {
        let consecutiveSlots = 1

        let row = rowIndex-1
        let column = columIndex-1
        while (row >= 0 && column >= 0 && board.rows[row].columns[column].turn === turn) {
            consecutiveSlots++
            row--
            column--
        }

        row = rowIndex+1
        column = columIndex+1
        while (row < board.rows.length && column < board.rows[rowIndex].columns.length && board.rows[row].columns[column].turn === turn) {
            consecutiveSlots++
            row++
            column++
        }

        console.log('Diagonal Left ', consecutiveSlots)
        return consecutiveSlots >= 4 ? true : false
    }

    const checkDiagonalRight = (rowIndex, columIndex) => {
        let consecutiveSlots = 1

        let row = rowIndex+1
        let column = columIndex-1
        while (row < board.rows.length && column >= 0 && board.rows[row].columns[column].turn === turn) {
            consecutiveSlots++
            row++
            column--
        }

        row = rowIndex-1
        column = columIndex+1
        while (row >= 0 && column < board.rows[rowIndex].length && board.rows[row].columns[column].turn === turn) {
            consecutiveSlots++
            row--
            column++
        }

        console.log('Diagonal Right ', consecutiveSlots)
        return consecutiveSlots >= 4 ? true : false
    }

    const getRowPositionToFill = (columnIndex) => {
        let positionToFill = null
        for (let rowIndex = board.rows.length-1; rowIndex >= 0; rowIndex--) {
            if (board.rows[rowIndex].columns[columnIndex].turn === null) {
                positionToFill = rowIndex
                return positionToFill
            }
        }

        return positionToFill
    }

    return(
        <>
            <h1 className="title">Connect 4</h1>
            <button className="resetBtn" onClick={resetGame}>Reset game</button>
            <section className="board">
                {
                    board.rows.map((row, rowIndex) => (
                        <Row
                            key={rowIndex}
                            index={rowIndex}
                            row={row}
                            updateBoard={updateBoard}
                        />
                    ))
                }
            </section>

            <WinnerModal isWinner={isWinner} winner={turn} resetGame={resetGame} />
        </>
    )
}

Board.propTypes = {
    rowsQuantity: PropTypes.number,
    columnsQuantity: PropTypes.number
}

export default Board