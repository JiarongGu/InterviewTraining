import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import uuidv4 from 'uuid/v4';

import RecordRTC from 'recordrtc';
import fs from 'fs';

import styles from './Camera.scss';

type Props = {
  height?: number,
  width?: number,
  output: string,
  onSaved?: filepath => void,
  onError?: error => void,
  autoPlay?: boolean,
  styles: { video: string }
};

type State = {
  recordVideo: object,
  src: object,
  uploadSuccess: object,
  uploading: boolean
};

export class Camera extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false,
      styles: {}
    };

    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const recordingOptions = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      bitsPerSecond: 256000 // if this line is provided, skip above two
    };

    const videoNode = this.videoRef.current;
    const autoPlay = this.props.autoPlay;
    
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.setState({
          src: URL.createObjectURL(stream),
          recordVideo: RecordRTC(stream, recordingOptions)
        }, ()=> {
          if(autoPlay) {
            this.startRecord();
          } else {
            videoNode.pause();
          }
        });
      })
      .catch(error => {
        if (this.props.onError) this.props.onError(error);
      });
  }

  startRecord() {
    this.state.recordVideo.startRecording();
    this.videoRef.current.play();
  }

  stopRecord() {
    const videoNode = this.videoRef.current;
    const output = this.props.output;

    this.state.recordVideo.stopRecording(() => {
      videoNode.pause();
      const blob = this.state.recordVideo.getBlob();

      const fileReader = new FileReader();
      fileReader.onload = function() {
        const buffer = new Buffer(fileReader.result);
        fs.writeFile(`${output}/${uuidv4()}.webm`, buffer, err => {
          if (err) {
            if (this.props.onError) this.props.onError(err);
            return;
          }
        });
      };
      fileReader.readAsArrayBuffer(blob);
    });
  }

  render() {
    const { width, height } = this.props;

    return (
      <div className={styles.container}>
        <video src={this.state.src} ref={this.videoRef} muted className={this.props.styles.video} 
            onMouseEnter={() => {console.log("camera hover");}} />
        <div>
          <button onClick={this.startRecord}>Start Record</button>
          <button onClick={this.stopRecord}>Stop Record</button>
        </div>
      </div>
    );
  }
}
