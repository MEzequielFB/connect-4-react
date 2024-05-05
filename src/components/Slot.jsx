import PropTypes from 'prop-types'

function Slot({ turn }) {

    return(
        <article className='slot'>
            <div className='slot-circle' style={{backgroundColor: turn}}>
                
            </div>
        </article>
    )
}

Slot.propTypes = {
    index: PropTypes.number,
    turn: PropTypes.string
}

export default Slot