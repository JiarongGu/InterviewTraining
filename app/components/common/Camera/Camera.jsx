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
  styles: { video: string },
  onMouseEnter?: event => void,
  onMouseLeave?: event => void
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

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const recordingOptions = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      bitsPerSecond: 512000 // if this line is provided, skip above two
    };

    const videoNode = this.videoRef.current;
    const autoPlay = this.props.autoPlay;

    navigator.mediaDevices
      .getUserMedia({
        video: {
          aspectRatio: { ideal: 1.9237 }
        },
        audio: true
      })
      .then(stream => {
        this.setState(
          {
            src: URL.createObjectURL(stream),
            recordVideo: RecordRTC(stream, recordingOptions)
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
    this.state.recordVideo.startRecording();
    this.videoRef.current.play();
  }

  stopRecording() {
    const videoNode = this.videoRef.current;
    const output = this.props.output;

    const promise = new Promise((resolve, reject) => {
      this.state.recordVideo.stopRecording(() => {
        videoNode.pause();
        const blob = this.state.recordVideo.getBlob();

        const fileReader = new FileReader();
        fileReader.onload = function() {
          const buffer = new Buffer(fileReader.result);
          const filePath = `${output}/${uuidv4()}.webm`;
          fs.writeFile(filePath, buffer, err => {
            if(resolve) resolve(filePath);

            if (err) {
              if (this.props.onError) {
                this.props.onError(err);
              }
              if(reject) reject(err);
              return;
            }
          });
        };
        fileReader.readAsArrayBuffer(blob);
      });
    });

    return promise;
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
