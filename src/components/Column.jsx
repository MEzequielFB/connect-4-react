import { useState } from "react"
import PropTypes from 'prop-types'
import Slot from "./Slot"

function Column({ turn, switchTurns }) {
    const [slots, setSlots] = useState(Array(6).fill(null))
    const [freeSlotPosition, setFreeSlotPosition] = useState(slots.length-1)
    const [isFull, setIsFull] = useState(false)

    // Si la columna está llena no actualiza los estados ni los turnos
    const handleClick = () => {
        if (isFull) return

        const newSlots = [...slots]
        newSlots[freeSlotPosition] = turn
        setSlots(newSlots)

        const newFreeSlotPosition = freeSlotPosition-1
        setFreeSlotPosition(newFreeSlotPosition)

        if (newFreeSlotPosition === -1) setIsFull(true)

        switchTurns()
    }

    return(
        <section className="column" onClick={handleClick}>
            {
                slots.map((_, index) => (
                    <Slot
                        key={index}
                        turn={slots[index]}
                    />
                ))
            }
        </section>
    )
}

Column.propTypes = {
    turn: PropTypes.string,
    switchTurns: PropTypes.func
}

export default Column