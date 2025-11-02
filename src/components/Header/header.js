import React, {useState} from 'react'
import Button from '../ui/button.js'

export default function Header(){
    const [headerButton, setHeaderButton] = useState('mood')
    return (
        <div className='bg-black'>
            <div>
                <div className='text-white font-bold text-lg'>{'M'}</div>
                <h1 className='heading-mood-beats'>{'Mood Beats'}</h1>
            </div>
            <div>
                <Button id='mood'>{'Mood'}</Button>
                <Button>{'History'}</Button>
                <Button>{'Reset'}</Button>
            </div>
        </div>
    )
}