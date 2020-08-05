import React from 'react';
import './index.scss';                    

export default () => (
  <div className='div1'>
    #div1 z-index: 50
    <div className='div2'>
      #div2 z-index: 40
    </div>
    <div className='div3'>
      #div3 z-index: 30
      <div className='div4'>
        #div4 z-index: 60
      </div>
      <div className='div5'>
        #div5 z-index: 10
        <div className='div6'>
          #div6 z-index: 100
        </div>
      </div>
    </div>
  </div>
)