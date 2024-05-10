import PropTypes from 'prop-types'
import Circle from './Circle'

function Slot({ column, columnIndex, updateBoard }) {

    const handleClick = () => {
        updateBoard(columnIndex)
    }

    return(
        <article className='slot' onClick={handleClick}>
            <Circle color={column.turn} />
        </article>
    )
}

Slot.propTypes = {
    column: PropTypes.object,
    columnIndex: PropTypes.number,
    updateBoard: PropTypes.func
}

export default Slot