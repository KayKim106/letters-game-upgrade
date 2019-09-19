import React from 'react'

const btnStyle = {
    width: "30px",
    height: "30px",
    padding: "0px 0px",
    borderRadius: "15px",
    textAlign: "center",
    fontSize: "23px",
    lineHeight: "22px",
    color:"white",
    background:"lightgray",
    marginLeft:"20px",
}
const ClearTextButton = (props) =>{
    return(
        <div className="subContents" style={{textAlign:"right", paddingTop:"5px"}}>
            <h6 style={{color:"lightgray", fontSize:"12px"}}>clear word
             <button onClick={props.onTextClearButton} style={btnStyle} type="button" className="btn btn-circle btn-xl"><i className="fa fa-times"></i>
                </button>
            </h6>
        </div>
    )
}
export default ClearTextButton;