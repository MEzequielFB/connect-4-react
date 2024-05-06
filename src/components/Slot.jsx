import PropTypes from 'prop-types'

function Slot({ columnIndex, turn, updateBoard }) {

    const handleClick = () => {
        updateBoard(columnIndex)
    }

    return(
        <article className='slot' onClick={handleClick}>
            <div className='slot-circle' style={{backgroundColor: turn}}>
                
            </div>
        </article>
    )
}

Slot.propTypes = {
    rowIndex: PropTypes.number,
    columnIndex: PropTypes.number,
    turn: PropTypes.string,
    updateBoard: PropTypes.func
}

export default Slot