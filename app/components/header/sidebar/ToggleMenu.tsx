
"use client"

import { ThemeContext } from '@/app/context/lightdark';
import { useContext } from 'react';
import { BsList } from 'react-icons/bs'


const ToggleMenu = () => {
    const { dispatch } = useContext(ThemeContext);
    return (
        <div className='cursor-pointer' onClick={() => dispatch({ type: "SIDEBAR_TOGGLE" })} >
            <BsList fontSize={24} />
        </div>
    )
}
export default ToggleMenu
