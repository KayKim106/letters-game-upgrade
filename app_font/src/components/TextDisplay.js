import React from 'react'

const TextDisplay =  ( props ) =>{
    return(
        <div className="row subContents" style={{border:"2px solid #525354"}}>
            <div className="col-md-8 col-sm-8 col-xs-8" style={{color:`${props.textColor}`,textAlign:"left",}}>
                <h3 style={{fontWeight:"700"}}>
               { props.selectedLetter }
               </h3>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4" style={{textAlign:"right"}}>
            <span style={{fontSize:"13px", color:`${props.textColor}`, opacity:"0.3", alignItems:"right"}}>
                { props.textValidation }
               </span>
            </div>
        </div>
    )
}
export default TextDisplay;