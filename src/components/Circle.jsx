import PropTypes from 'prop-types'

function Circle ({ color }) {
    return (
        <div className='slot-circle' style={{backgroundColor: color}} />
    )
}

Circle.propTypes = {
    color: PropTypes.string
}

export default Circle