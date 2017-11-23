import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blue } from '../utils/colors'

// shared component 
export default function TextButton({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: blue
    }
})
