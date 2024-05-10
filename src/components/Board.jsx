import { useRef, useState } from "react"
import useSound from 'use-sound'
import PropTypes from 'prop-types'
import { COLORS } from "../constants/constants"
import Row from "./Row"
import WinnerModal from "./WinnerModal"
import applauseSfx from '../sounds/applause.mp3'
import crowdSfx from '../sounds/crowd.mp3'
import { checkDraw, checkWinner } from "../gameChecks/checks"

function Board({ rowsQuantity, columnsQuantity }) {
    const initialBoard = {
        rows: Array.from({ length: rowsQuantity }, () => ({
          columns: Array.from({ length: columnsQuantity }, () => ({ turn: null })),
        })),
    };
    const [board, setBoard] = useState(initialBoard)
    const [turn, setTurn] = useState(COLORS.player1)
    const [isWinner, setIsWinner] = useState(false)

    const filledSlotsQuantity = useRef(0)

    const [playApplause] = useSound(applauseSfx)
    const [playCrowd] = useSound(crowdSfx)

    console.log(board)

    const resetGame = () => {
        setBoard(initialBoard)
        setTurn(COLORS.player1)
        setIsWinner(false)
        filledSlotsQuantity.current = 0
    }

    const updateBoard = (columnIndex) => {
        if (isWinner || isWinner === null) return

        const rowIndex = getRowPositionToFill(columnIndex)
        
        if (rowIndex === null) return // Si la columna está llena retorna

        const newBoard = board
        newBoard.rows[rowIndex].columns[columnIndex].turn = turn
        setBoard(newBoard)

        filledSlotsQuantity.current++
        
        console.log('row | column ', rowIndex + ' | ' + columnIndex)

        if (checkWinner({ rowIndex, columnIndex, board, turn, filledSlotsQuantity })) {
            setIsWinner(true)
            console.log(turn + ' WON')
            playApplause()
            return
        }

        if (checkDraw({ board: newBoard, filledSlotsQuantity: filledSlotsQuantity.current })) {
            setIsWinner(null)
            setTurn('black')
            console.log('DRAW')
            playCrowd()
            return
        }

        const newTurn = turn === COLORS.player1 ? COLORS.player2 : COLORS.player1
        setTurn(newTurn)
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