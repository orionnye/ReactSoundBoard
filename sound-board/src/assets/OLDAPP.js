import React from 'react';
import './App.css';

//OnKeyDown
document.addEventListener("keydown", (e) => {
  let sound = document.getElementById(e.key)
  if (sound !== null) {
    sound.volume = 0.4
    if (sound.paused) {
      sound.play()
    }
  }
})

//create banner
const banner = <div className="banner">Sound Board</div>

//the keys are the tricky part
class Note extends React.Component {
  constructor(props) {
    super(props)
    // UPON RECIEVING INPUT UPDATE THAT INPUT UP TO THE STATE CLOUD
    this.state = {sound: props.sound, index: props.index, volume: 0.4}
    this.handleClick = this.handleClick.bind(this)
    this.active = false;
  }
  handleClick() {
    let sound = document.getElementById(this.state.index)
    sound.volume = this.state.volume
    if (sound.paused) {
      sound.play()
    }
  }

  render() {
    return (
      <div className="key" onClick={this.handleClick} background-color="" >
          {this.state.index}
        <audio controls className="sneakyAudio"id={this.state.index}>
          <source src={this.state.sound}/>
        </audio>
      </div>
    )
  }
}

function Keyboard() {
  let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  let defaultSound = "https://upload.wikimedia.org/wikipedia/commons/d/d9/Wilhelm_Scream.ogg"
  let notes = []
  keys.forEach((key) => {
    notes.push(<Note sound={defaultSound} index={key.toString()}/>)
  })
  let addKey = <div className="changeKey" onClick={this.addNote}>+</div>
  let loseKey = <div className="changeKey" onClick={this.loseNote}>-</div>
  return(
    <div className="board">
      <div className="keyBoard">
        {notes}
      </div>
    </div>
  )
}
//create board class
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {noteCount: props.noteCount}
    this.maxNotes = 9
    //function binding
    this.addNote = this.addNote.bind(this);
    this.loseNote = this.loseNote.bind(this);
  }
  addNote() {
    if (this.state.noteCount < this.maxNotes) {
      this.setState(state => ({
        noteCount: state.noteCount + 1
      }));
    }
  }
  loseNote() {
    if (this.state.noteCount > 1) {
      this.setState(state => ({
        noteCount: state.noteCount - 1
      }));
    }
  }
  render() {
    let notes = []
    for (let i = 0; i < this.state.noteCount; i++) {
      let defaultSound = "https://upload.wikimedia.org/wikipedia/commons/d/d9/Wilhelm_Scream.ogg"
      let note = <Note sound={defaultSound} index={(i + 1).toString()} key={i.toString()}/>
      notes.push(note)
    }
    let addKey =
      <div className="changeKey" onClick={this.addNote} background-color="">
        +
      </div>
    if (this.state.noteCount === this.maxNotes) {
      addKey =
        <div className="greyKey" onClick={this.addNote} background-color="">
          +
        </div>
    }
    let loseKey = 
      <div className="changeKey" onClick={this.loseNote} background-color="">
        -
      </div>
    if (this.state.noteCount === 1) {
      loseKey = 
        <div className="greyKey" onClick={this.loseNote} background-color="">
          -
        </div>
    }
    return (
      <div className="board">
        <div className="keyBoard" >
          {notes}
          <div className="changeKeyBox">
            {addKey}
            {loseKey}
          </div>
        </div>
      </div>
    )
  }
}

function ListedAudio(props) {
  return(
    <audio controls className="listedAudio">
      <source src={props.sound}/>
    </audio>
  )
}
//soundlist tab
function SoundList(props) {
  let sounds = []
  props.sounds.forEach(audio => {
    let newListed = <ListedAudio sound = {audio}/>
    sounds.push(newListed)
  })
  return(
    <div className="audioList">
      <div className="audioHeader">
        Audio List
      </div>
      {sounds}
    </div>
  )
}

//tweak sound tab
let tweakTab = <div></div>

//create tab section under board
function BottomBar(props) {
  return(
    <div className="bottomBar">
      {props.left}
      {props.right}
    </div>
  )
} 

function App() {
  return (
    <div>
      {banner}
      {/* <Board noteCount={9}/> */}
      <Keyboard />
      {/* <BottomBar 
        left = {
          <SoundList sounds = 
            {
              ["https://upload.wikimedia.org/wikipedia/commons/d/d9/Wilhelm_Scream.ogg",
              "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Howie_Long_Scream.ogg",
              "https://upload.wikimedia.org/wikipedia/commons/0/01/SoundFX_Wabern.ogg"]
            }
          />
        }
        right = {tweakTab}
      /> */}
    </div>
  );
}

export default App;
