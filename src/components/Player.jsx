import PropTypes from 'prop-types'
import Circle from "./Circle"

function Player({ name, color }) {
    return (
        <aside className='player'>
            <h2>{name}</h2>
            <Circle color={color} />
        </aside>
    )
}

Player.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string
}

export default Player