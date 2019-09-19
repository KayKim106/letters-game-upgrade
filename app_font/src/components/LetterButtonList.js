import React from 'react'

// Component 
import LetterButton from './LetterButton'

const letterDisplayStyle = {
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-around",
    width:"100%",
    height:"auto",
}
const buttonWrapper = {
    
    width:"25%",
    padding:"1%"
    
}
const LetterbuttonList = ({ letters, getSelectedLetterText }) =>{
    const renderButtonList = letters.map( letter =>{
        return(
            <div key={ letter.letter } style={ buttonWrapper }>
                <LetterButton letter = { letter.letter } getLetterText = { getSelectedLetterText } color={ letter.selected } />
            </div>
        )
    })
    return (
        <div style={letterDisplayStyle}>
            { renderButtonList }
        </div>
    )
} 
export default LetterbuttonList