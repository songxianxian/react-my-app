import React from 'react'

export default function Other () {
    let count = 0;
    while (count < 1000000000) {
        count++
    }
    return (
        <div>other components 组件</div>
    )
}