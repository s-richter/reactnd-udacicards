import React from 'react'
import { Text } from 'react-native'

// shows the user how many cards he has answered in the quiz plus the total amount of cards
function Progress(props) {
    const { answered, total } = props
    return (
        <Text>{answered} / {total}</Text>
    )
}

export default Progress