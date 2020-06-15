import React from 'react';

class App extends React.Component{

    addColor(){
        console.log("test1");
        
    }
    render(){
        return(
            <div>
                {this.addColor()}
            </div>
        )
    }
} 

export default App;