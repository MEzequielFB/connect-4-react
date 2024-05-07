import PropTypes from 'prop-types'
import { useState } from 'react'
import Slot from './Slot'

function ColumnB({ index, turn, rowsQuantity, updateBoard }) {
    const slots = useState(Array(rowsQuantity).fill(null))

    const handleClick = () => {
        updateBoard(index)
    }

    return(
        <section className='column' onClick={handleClick}>
            {
                slots.map((_, slotIndex) =>(
                    <Slot
                        key={'slot' + index + '' + slotIndex}
                        turn={turn}
                    />
                ))
            }
        </section>
    )
}

ColumnB.propTypes = {
    index: PropTypes.number,
    turn: PropTypes.string,
    rowsQuantity: PropTypes.number,
    updateBoard: PropTypes.func
}

export default ColumnB