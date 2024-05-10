import PropTypes from 'prop-types'
import Slot from "./Slot"

function Row({ index, row, updateBoard }) {
    return(
        <>
            {
                row.columns.map((column, columnIndex) => (
                    <Slot
                        key={index + '' + columnIndex}
                        column={column}
                        columnIndex={columnIndex}
                        updateBoard={updateBoard}
                    />
                ))
            }
        </>
    )
}

Row.propTypes = {
    index: PropTypes.number,
    row: PropTypes.object,
    updateBoard: PropTypes.func
}

export default Row