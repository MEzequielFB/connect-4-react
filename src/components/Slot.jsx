import PropTypes from 'prop-types'

function Slot({ column, columnIndex, updateBoard }) {

    const handleClick = () => {
        updateBoard(columnIndex)
    }

    return(
        <article className='slot' onClick={handleClick}>
            <div className='slot-circle' style={{backgroundColor: column.turn}}>
                
            </div>
        </article>
    )
}

Slot.propTypes = {
    column: PropTypes.object,
    columnIndex: PropTypes.number,
    updateBoard: PropTypes.func
}

export default Slot