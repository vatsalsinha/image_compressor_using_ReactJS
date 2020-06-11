import React from 'react';
import ImgCompressor from './ImgCompressor';

const App = () =>{
    return(
        <div className="ui container">
            Image Compressor
            <h4> Upload an Image to compress</h4>
            <ImgCompressor />
        </div>
    );
}

export default App;