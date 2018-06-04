import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import uuidv4 from 'uuid/v4';

import { RecordRTCPromisesHandler } from 'recordrtc';
import fs from 'fs';

import styles from './Camera.scss';

type Props = {
  height?: number,
  width?: number,
  output: string,
  onSaved?: filePath => void,
  onError?: error => void,
  styles: { video: string },
  onMouseEnter?: event => void,
  onMouseLeave?: event => void
};

type State = {
  recordVideo: object,
  src: object,
  uploadSuccess: object,
  uploading: boolean,
  stream: object,
  startTime?: Date
};

export class Camera extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false,
      styles: {},
      stream: undefined,
      startTime: undefined
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const recordingOptions = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      bitsPerSecond: 2048000 // if this line is provided, skip above two
    };

    const videoNode = this.videoRef.current;
    const autoPlay = this.props.autoPlay;

    navigator.mediaDevices
      .getUserMedia({
        video: {
          aspectRatio: { ideal: 1256 / 708 }
        },
        audio: true
      })
      .then(stream => {
        this.setState(
          {
            src: URL.createObjectURL(stream),
            recordVideo: new RecordRTCPromisesHandler(stream, recordingOptions),
            stream: stream
          },
          () => {
            videoNode.pause();
          }
        );
      })
      .catch(error => {
        if (this.props.onError) this.props.onError(error);

        console.log(error);
      });
  }

  startRecording() {
    const video = this.videoRef.current;
    this.state.recordVideo.startRecording().then(() => {
      this.setState({ startTime: Date.now() });
      this.videoRef.current.play();
    });
  } 

  stopRecording() {
    const videoNode = this.videoRef.current;
    const output = this.props.output;

    const promise = new Promise((resolve, reject) => {
      this.state.recordVideo.stopRecording().then(() => {
        videoNode.pause();

        const blob = this.state.recordVideo.getBlob();
        const fileReader = new FileReader();
        const duration = Date.now() - this.state.startTime;

        fileReader.onload = function() {
          const buffer = new Buffer(fileReader.result);
          const filePath = `${output}/${uuidv4()}.${duration}.webm`;

          fs.writeFile(filePath, buffer, err => {
            if (resolve) resolve(filePath);

            if (err) {
              if (this.props.onError) {
                this.props.onError(err);
              }
              if (reject) reject(err);
              return;
            }
          });
        };

        fileReader.readAsArrayBuffer(blob);
      });
    });

    return promise;
  }

  componentWillUnmount() {
    if (this.state.stream) {
      this.state.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <div className={styles.container}>
        <video
          src={this.state.src}
          ref={this.videoRef}
          muted
          className={this.props.styles.video}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        />
      </div>
    );
  }
}
