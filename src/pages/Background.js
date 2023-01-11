import React from 'react'

const Background = () => {
    return (
        <div className=' position-relative' >
            <div className="position-absolute d-flex" style={{zIndex:"-1"}}>
                <div className='d-flex flex-column'>
                    <img id='tea'  src="/assets/tea.png" alt="" width="100" height="100"/>
                    <img id='donut' src="/assets/donut.png" alt="" width="100" height="100"/>
                    <img id='coffee' src="/assets/coffee.png" alt="" width="50" height="50"/>
                </div>
                <div className='d-flex flex-column'>
                    <img id='popcorn' src="/assets/popcorn.png" alt="" width="100" height="100"/>
                    <img id='lemon' src="/assets/lemon-1.png" alt="" width="100" height="100"/>
                    <img id='drink' src="/assets/drinks-1.png" alt="" width="100" height="100"/>
                </div>
            </div>
        </div>
    )
}

export default Background