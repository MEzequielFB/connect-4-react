export const checkWinner = ({ rowIndex, columnIndex, board, turn }) => {
    if (checkVertical(rowIndex, columnIndex, board, turn)) return true
    if (checkHorizontal(rowIndex, columnIndex, board, turn)) return true
    if (checkDiagonalLeft(rowIndex, columnIndex, board, turn)) return true
    if (checkDiagonalRight(rowIndex, columnIndex, board, turn)) return true

    return false
}

export const checkDraw = ({ board, filledSlotsQuantity }) => {
    const slotsQuantity = board.rows.length * board.rows[0].columns.length
    return filledSlotsQuantity === slotsQuantity
}

const checkVertical = (rowIndex, columnIndex, board, turn) => {
    let consecutiveSlots = 1

    // Go up
    let i = rowIndex-1
    while (i >= 0 && board.rows[i].columns[columnIndex].turn === turn) {
        consecutiveSlots++
        i--
    }

    // Go down
    i = rowIndex+1
    while (i < board.rows.length && board.rows[i].columns[columnIndex].turn === turn) {
        consecutiveSlots++
        i++
    }

    console.log('Vertical ', consecutiveSlots)
    return consecutiveSlots >= 4 ? true : false
}

const checkHorizontal = (rowIndex, columnIndex, board, turn) => {
    let consecutiveSlots = 1

    // Go left
    let i = columnIndex-1
    while (i >= 0 && board.rows[rowIndex].columns[i].turn === turn) {
        consecutiveSlots++
        i--
    }

    // Go right
    i = columnIndex+1
    while (i < board.rows[rowIndex].columns.length && board.rows[rowIndex].columns[i].turn === turn) {
        consecutiveSlots++
        i++
    }

    console.log('Horizontal ', consecutiveSlots)
    return consecutiveSlots >= 4 ? true : false
}

const checkDiagonalLeft = (rowIndex, columIndex, board, turn) => {
    let consecutiveSlots = 1

    let row = rowIndex-1
    let column = columIndex-1
    while (row >= 0 && column >= 0 && board.rows[row].columns[column].turn === turn) {
        consecutiveSlots++
        row--
        column--
    }

    row = rowIndex+1
    column = columIndex+1
    while (row < board.rows.length && column < board.rows[rowIndex].columns.length && board.rows[row].columns[column].turn === turn) {
        consecutiveSlots++
        row++
        column++
    }

    console.log('Diagonal Left ', consecutiveSlots)
    return consecutiveSlots >= 4 ? true : false
}

const checkDiagonalRight = (rowIndex, columIndex, board, turn) => {
    let consecutiveSlots = 1

    let row = rowIndex+1
    let column = columIndex-1
    while (row < board.rows.length && column >= 0 && board.rows[row].columns[column].turn === turn) {
        consecutiveSlots++
        row++
        column--
    }

    row = rowIndex-1
    column = columIndex+1
    while (row >= 0 && column < board.rows[rowIndex].length && board.rows[row].columns[column].turn === turn) {
        consecutiveSlots++
        row--
        column++
    }

    console.log('Diagonal Right ', consecutiveSlots)
    return consecutiveSlots >= 4 ? true : false
}