import { useState } from "react"
import PropTypes from 'prop-types'
import ColumnB from "./ColumnB"
import Slot from "./Slot"

function Row({ index, row, updateBoard }) {
    /* const columns = Array(columnsQuantity).fill(null) */

    return(
        <>
            {
                /* columns.map((_, columIndex) => ( */
                row.columns.map((column, columnIndex) => (
                    <Slot
                        key={index + '' + columnIndex}
                        column={column}
                        columnIndex={columnIndex}
                        updateBoard={updateBoard}
                    />
                ))
                /* <ColumnB
                        key={index + '' + columIndex}
                        index={columIndex}
                        turn={board[index][columIndex]}
                        rowsQuantity={rowsQuantity}
                        updateBoard={updateBoard}
                /> */
            }
        </>
    )
}

Row.propTypes = {
    index: PropTypes.number,
    row: PropTypes.object,
    board: PropTypes.object,
    rowsQuantity: PropTypes.number,
    columnsQuantity: PropTypes.number,
    updateBoard: PropTypes.func
}

export default Row