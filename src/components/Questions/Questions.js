import React from 'react';
import './index.css';

export default (props) => {
  return (
    <div id="questions">
      <h1>Questions Component</h1>
      <h1 className='outline'>Question 1 of 10 </h1>
      <div class='image-wrapper'>
        <img className='outline ' src='https://picsum.photos/400'></img>
      </div>
      <div class='center'>
        <h1 class='inline'>Question Goes here ?</h1>
      </div>
      <div class='answers-wrapper'>
        <div className='outline box'>Answer 1</div>
        <div className='outline box'>Answer 2</div>
        <div className='outline box'>Answer 3</div>
        <div className='outline box'>Answer 4</div>
      </div>
    </div>
  )
}
