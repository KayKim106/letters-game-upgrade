import React from 'react'

const LetterButton = ( props ) =>{
    return(
        <div className="btn letterBtn" onClick = { _ => props.getLetterText( props.letter )} style={{background:`${props.color}`,width:"100%",height:"72.47px", color:"white",border:"2px solid #e3363a",borderRadius:"10%", display:"flex", justifyContent:"center", alignItems:'center', fontWeight:"700", fontSize:"2rem"}}>
            {props.letter}
        </div>
    )
}
export default LetterButton
