import React from 'react';
import './App.css';

//global mouse "state"
let mouseDown = false

window.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    mouseDown = true
  }
})
window.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    mouseDown = false
  }
})

class Note extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      sound: props.sound,
      name: props.name,
      held: false,
      playing: false
    }
    this.overHandler = this.overHandler.bind(this)
    this.leaveHandler = this.leaveHandler.bind(this)
    this.downHandler = this.downHandler.bind(this)
    this.activate = this.activate.bind(this)
  }
  activate() {
    this.setState({held: false})
    let note = document.getElementById(this.state.name)
    let sound = document.getElementById(this.state.name + "Sound")
    let duration = (sound.duration + 1).toString() + "s"
    note.style.delayOut = duration
    sound.volume = 0.3
    sound.play()
    this.setState({playing: true})
    setTimeout(() => {this.setState({playing: false})}, sound.duration * 1000)
  }
  overHandler() {
    let sound = document.getElementById(this.state.name + "Sound")
    if (mouseDown && sound.paused) {
      this.setState({held: true})
    }
  }
  downHandler() {
    let sound = document.getElementById(this.state.name + "Sound")
    if (sound.paused) {
      this.setState({held: true})
    }
  }
  leaveHandler() {
    let sound = document.getElementById(this.state.name + "Sound")
    if (mouseDown && sound.paused) {
      this.activate()
    }
  }
  render() {
    let isChanging = this.state.held || this.state.playing
    let display = isChanging ? "note" : "dullNote"
    
    return(
      <div className={display} id={this.state.name}
      onMouseLeave={this.leaveHandler}
      onMouseOver={this.overHandler}
      onMouseDown={this.downHandler}
      onMouseUp={this.activate}>
        {/* {this.state.name} */}
        <audio className="noteAudio" id={this.state.name + "Sound"}>
          <source src={this.state.sound}/>
        </audio>
      </div>
    )
  }
}

//create board class
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noteCount: props.noteCount,
    }
    // this.defaultSound = "./assets/WilhelmScream.mp3"
    this.defaultSound = "https://upload.wikimedia.org/wikipedia/commons/d/d9/Wilhelm_Scream.ogg"
    this.defaultKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    this.notes = []
    for (let i = 0; i < this.state.noteCount; i++) {
      let index = this.defaultKeys[i].toString()
      let newNote = <Note
        sound={this.defaultSound}
        key={index}
        name={index}
      />
      this.notes.push(newNote)
    }
  }
  render() {
    return (
      <div className="board" id="board">
        {this.notes}
      </div>
    )
  }
}

function App() {
  return (
    <div className="centerDiv">
      <h1>Sound Board</h1>
      <Board noteCount={10}/>
      <h2>Click or swipe your cursor on the board to play</h2>
      <h3>Future Updates: key support and drag/drop to enable new sound effects</h3>
    </div>
  )
}

export default App;
