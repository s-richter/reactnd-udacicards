import React from 'react'
import { Text } from 'react-native'

function Progress(props) {
    const { answered, total } = props
    return (
        <Text>{answered} / {total}</Text>
    )
}

export default Progress