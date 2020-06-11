import React from 'react';
import imageCompression from 'browser-image-compression';

class ImgCompressor extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            compressed_link: '',
            original_image: '',
            original_link: '',
            clicked: false,
            uploadImage: false
        };
    }

    handleInput = (event) => {
        const imageFile = event.target.files[0];
        this.setState({
            original_link: URL.createObjectURL(imageFile),
            original_image: imageFile,
            outputFileName: imageFile.name,
            uploadImage: true
        });
    }
    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        if(options.maxSizeMB >= this.state.original_image.size/1024){
            alert("image is too small to compress");
            return 0;
        }
        let output;
        imageCompression(this.state.original_image, options).then(
            x => {
                output = x;
                const download_link = URL.createObjectURL(output);
                this.setState({
                    compressed_link: download_link,
                    compressed_size: output.size
                });
            }
        )
        this.setState({
            clicked: true
        });
        return 1;
    }
    render(){
        return(
            <div>
                {this.state.uploadImage ? (
                    <div className="ui card">
                        <div className="image">
                            <img src ={this.state.original_link} />   
                            size -> {this.state.original_image.size/(1024*1024)} mb 
                        </div>
                    </div>

                ) : (
                    <div className="ui card">
                    <div className="image">
                        <img src ='' />    
                    </div>
                </div>
                 )
                }
                <div>
                    <input type = "file" accept='image/*' onChange={(e)=> this.handleInput(e)} />
                </div>
                <div>
                    {this.state.outputFileName ? (
                        <div>
                            <p></p>
                            <button className="ui button" onClick={(e) => this.onSubmit(e)} > compress </button>
                        </div>
                    ) : (<></>)
                    }
                </div>
                {this.state.clicked ? (
                    <div>
                        compressed!!!!! to {this.state.compressed_size/(1024*1024)} mb
                        <div className="ui card">
                        <div className="image">
                            <img src ={this.state.compressed_link} />    
                        </div>
                    </div>
                        <br/><br/>Click to download<br/>
                        <a href = {this.state.compressed_link} download={this.state.outputFileName}> <button className="ui button">download</button></a>
                    </div>
                ): (<></>)
                }
            </div>
        );
    }
}
export default ImgCompressor;