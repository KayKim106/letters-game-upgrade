import React,{Component} from "react"

const ShuffleButton = ( props ) => {

    return(
        <div onClick={ props.onShuffle }>
            섞어
        </div>
    )
}
export default ShuffleButton;