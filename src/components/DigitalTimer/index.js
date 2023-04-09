// Write your code here
import {Component} from 'react'
import './index.css'

const playImg = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseImg = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
const resetImg = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png '

const playAltText = 'play icon'
const pauseAltText = 'pause icon'
const resetAltText = ' reset icon'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimit: 25,
    currentRunningSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intarvalID)
  }

  startTimerCountDown = () => {
    const {currentRunningSeconds, timerLimit} = this.state

    const isTimeCompleted = currentRunningSeconds === timerLimit * 60
    if (isTimeCompleted) {
      this.setState({isTimerRunning: false, currentRunningSeconds: 0})
      this.clearTimer()
    } else {
      this.setState({currentRunningSeconds: currentRunningSeconds + 1})
    }
  }

  startStopTimer = () => {
    const {timerLimit, isTimerRunning, currentRunningSeconds} = this.state
    this.setState({isTimerRunning: !isTimerRunning})

    const isTimerCompleted = timerLimit * 60 === currentRunningSeconds
    if (isTimerCompleted) {
      this.setState({isTimerRunning: false})
      this.clearTimer()
    }
    if (isTimerRunning) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    } else {
      this.intarvalID = setInterval(this.startTimerCountDown, 1000)
    }
  }

  onResetTimer = () => {
    this.setState({
      isTimerRunning: false,
      timerLimit: 25,
      currentRunningSeconds: 0,
    })
    this.clearTimer()
  }

  decreaseTimerLimit = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState({timerLimit: timerLimit - 1})
    }
  }

  increaseTimerLimit = () => {
    const {timerLimit} = this.state
    this.setState({timerLimit: timerLimit + 1})
  }

  convertTimeToTimerFormat = () => {
    const {timerLimit, currentRunningSeconds} = this.state
    const timeInSeconds = timerLimit * 60 - currentRunningSeconds
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesInStringFormat}:${secondsInStringFormat}`
  }

  render() {
    const {isTimerRunning, timerLimit, currentRunningSeconds} = this.state
    const isButtonDisable = currentRunningSeconds !== 0
    // console.log(currentRunningSeconds, isTimerRunning)
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="bg-container">
          <div className="timer-card-container">
            <div className="timer-container">
              <h1 className="time">{this.convertTimeToTimerFormat()}</h1>
              <p className="timer-text">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="operating-container">
            <div className="start-pause-reset-container">
              <button
                className="play-button"
                type="button"
                onClick={this.startStopTimer}
              >
                <img
                  src={isTimerRunning ? pauseImg : playImg}
                  className="play-img"
                  alt={isTimerRunning ? pauseAltText : playAltText}
                />
                <p className="button-text">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>

              <button
                className="play-button"
                type="button"
                onClick={this.onResetTimer}
              >
                <img src={resetImg} className="play-img" alt={resetAltText} />
                <p className="button-text">Reset</p>
              </button>
            </div>
            <p className="set-timer-text">Set Timer limit</p>
            <div className="add-sub-button-container">
              <button
                className="add-button"
                type="button"
                onClick={this.decreaseTimerLimit}
                disabled={isButtonDisable}
              >
                -
              </button>
              <div className="default-timer-container">
                <p className="timer-limit">{timerLimit}</p>
              </div>
              <button
                className="add-button"
                type="button"
                onClick={this.increaseTimerLimit}
                disabled={isButtonDisable}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
