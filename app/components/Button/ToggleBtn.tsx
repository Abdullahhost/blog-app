
"use client"
import { ThemeContext } from '@/app/context/lightdark';
import React, { useContext } from 'react'
import { BsJustifyRight } from 'react-icons/bs'

const ToggleBtn = () => {
    const { state, dispatch } = useContext(ThemeContext);
    return (

        <div className="block w-fit lg:hidden " >
            <BsJustifyRight onClick={() => dispatch({ type: 'SIDEBAR_TOGGLE' })} fontSize={20} />
        </div>

    )
}

export default ToggleBtn
