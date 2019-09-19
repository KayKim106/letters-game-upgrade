import React from 'react'
import './App.css'
import axios from 'axios'
// Data 
import data from './data/test-board-1.json'
import dictionary from './data/dictionary.json'

// Components
import LetterButtonList from './components/LetterButtonList'
import TextDisplay from './components/TextDisplay'
import ClearTextButton from './components/ClearTextButton'
import ShuffleButton from './components/ShuffleButton'


class App extends React.Component{
  
  constructor(props){
    super(props)

    this.state = {
      letterList : [],
      selectedLetterList : [],
      letterTerm  : '',
      textValidation: "InValid",
      colors:{
        selected:'linear-gradient(180deg, rgba(255,81,81,1) 0%, rgba(159,16,38,1) 100%)',
        valid:'#45b03f',
        default : 'linear-gradient(180deg, rgba(255,216,65,1) 0%, rgba(249,108,8,1) 100%)',
      },
      textColor:'#de1f23',
    }
  }

  // Get Json Data after render JSX
  componentDidMount(){

    this.parseDataToState(data.board);

  }


  // Get Parsing JSON Data(Letters) 
  parseDataToState = (data) =>{
    
    let tempList = [];

    let colors = this.state.colors;
    
    // Set Letters to State with colors
    data.forEach(function(letter){
      let letterObject = {
        letter:'',
        selected:colors.default,
      }
      letterObject.letter = letter
      tempList.push(letterObject)
    })
    this.setState({ letterList : tempList })
  }

  getSelectedLetterText = ( letter ) => {
   
    let colors = this.state.colors;
    // Get Initial selected Letter List
    let textArr = this.state.selectedLetterList
    
    // If textArr length is less than 1 ( expect the textArr = empty )
    if(textArr.length < 1){
      let tempArr = []

      // Add the letter to the Temp array for updateing to State
      tempArr.push(letter)

      let originalLetterList = this.state.letterList
      let oTempArray = []
      for(let i = 0; i<originalLetterList.length; i++){
        if(originalLetterList[i].letter === letter){
          originalLetterList[i].selected = colors.selected
        }
        oTempArray.push(originalLetterList[i])
      }

      // Update the TempArr to Selected Letter List
        this.setState({
          selectedLetterList : tempArr,      
          letterList: oTempArray
      })

    }else{
      // Boolean for checking that Letter is in the list of array
      let found = textArr.includes(letter)
      let newTextArray = []

      // If letter is in the list array
      if(found){
        
      // Filters All the letter except the letter what user Clicked 
         newTextArray = textArr.filter( text => text !== letter )
         let originalLetterList = this.state.letterList
         let oTempArray = []
         for(let i = 0; i<originalLetterList.length; i++){
           if(originalLetterList[i].letter === letter){
             originalLetterList[i].selected === colors.default ? originalLetterList[i].selected = colors.selected : originalLetterList[i].selected = colors.default
           }
           oTempArray.push(originalLetterList[i])
         }

      // Update selected Letter List to State with filtered List
        this.setState({
          selectedLetterList : newTextArray
        })

      }else{

        // If letter is not in the list of array
        let tempArr = this.state.selectedLetterList
        
        // Add new Letter to tempArr 
        tempArr.push(letter)
        
        let originalLetterList = this.state.letterList
        let oTempArray = []
        for(let i = 0; i<originalLetterList.length; i++){
          if(originalLetterList[i].letter === letter){
            originalLetterList[i].selected = colors.selected
          }
          oTempArray.push(originalLetterList[i])
        }

        // Update New tempArr to State
        this.setState({
          selectedLetterList : tempArr
        })
      }
    }
    // Run for Checking the typed word is matching with dictionary
    
      this.findWord();
    
  }

  findWord = () =>{

    let text = this.state.selectedLetterList.join('').toLowerCase()

    // Find the letter from Dictionay data
    let foundWord = dictionary.words.find( word => word === text )

    if(foundWord !== undefined){
      let colors = this.state.colors;
      let originalLetterList = this.state.letterList;
      let oTempArray = [];
    
    // Set LetterList for updating its color
      for(let i = 0; i<originalLetterList.length; i++){
      
          if(originalLetterList[i].selected === colors.selected){
            originalLetterList[i].selected = colors.valid
          }
          oTempArray.push(originalLetterList[i])
      }
      this.setState({ 
        textValidation : "Valid",
        textColor : "#45b03f" ,
        letterList :oTempArray,
        boarderColor:"green",
      })
      if(this.state.textValidation.toLowerCase() === "valid"){
        this.setState({ 
          letterList : this.setLetterBtn("reset"),
          textValidation : "InValid",
          textColor : "#de1f23",
         })
      }
    }else{
      this.setState({ 
        textValidation : "InValid",
        textColor : "#de1f23"
     })
    }    
  }

  // Clear Selected text
  setClearText = () =>{

    let colors = this.state.colors;
    let originalLetterList = this.state.letterList
  
    for(let i = 0; i<originalLetterList.length; i++){
    
        originalLetterList[i].selected = colors.default
    }

   this.setState({ 
     selectedLetterList : [],
     textColor : "#de1f23",
     textValidation:'InValid'
    })
  }

  // Refresh Letter buttons color
  setLetterBtn = (type) =>{
    let oTempArray = [];
    let colors = this.state.colors;
    let originalLetterList = this.state.letterList;
    
    if(type === "reset"){
      for(let i = 0; i<originalLetterList.length; i++){
          if(originalLetterList[i].selected === colors.valid){
              originalLetterList[i].selected = colors.selected
          }
           oTempArray.push(originalLetterList[i])
      }
    }
   return oTempArray;
  }

  onShuffle = async () =>{

    let url = 'http://localhost:5000/shuffle';
    
    axios.get(url)
    .then(res => this.parseDataToState(res.data))
  }

  render(){
    return(
      <div className="App">
        <div className="col-md-12">
          <div className="row container">
            <div className="col-md-6 col-sm-10 col-xs-10 contents top">
              <LetterButtonList letters = { this.state.letterList } getSelectedLetterText={ this.getSelectedLetterText }/> 
            </div>
            <div className="col-md-6 col-sm-10 col-xs-10 contents bottom">
              <div className="row">
                <div className="col-md-12">
                <ClearTextButton onTextClearButton={ this.setClearText } />  
                </div> 
              </div>
              <div className="row">
                <div className="col-md-12 textDisplay" style={{position:"absolute", bottom:"0"}}>
                  <TextDisplay selectedLetter = { this.state.selectedLetterList.join(' ') } textValidation = { this.state.textValidation } textColor = { this.state.textColor } />   
                </div> 
              </div>
            </div>
            {/* Hidden Component for Mobile view */}
            <div className="col-md-6 col-sm-10 col-xs-10 contents bottom_2">
              <div className="row">
                  <div className="col-md-12" style={{position:"absolute", bottom:"0"}}>
                    <TextDisplay selectedLetter = { this.state.selectedLetterList.join(' ') } textValidation = { this.state.textValidation } textColor = { this.state.textColor } />   
                  </div> 
                </div>
              </div>
            </div>
            <div>
              <ShuffleButton onShuffle ={ this.onShuffle }/>
            </div>
          </div>
        </div>
      )
    }
  }

export default App;
