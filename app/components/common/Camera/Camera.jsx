import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames  from 'classnames';
import uuidv4 from 'uuid/v4';

import RecordRTC from 'recordrtc';
import fs from 'fs';

import styles from './Camera.scss';

type Props = {
    height?: number,
    width?: number,
    savedDir: string,
    onSaved?: (filepath) => void;
};

type State = {
    recordVideo: object,
    src: object,
    uploadSuccess: object,
    uploading: boolean
};

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);

export class Camera extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            recordVideo: null,
            src: null,
            uploadSuccess: null,
            uploading: false,
        };

        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        if (!hasGetUserMedia) {
            alert('Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.');
            return;
        }

        const recordingOptions = {
            mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
            bitsPerSecond: 256000 // if this line is provided, skip above two
        };

        const videoNode = this.videoRef.current;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                this.setState({ src: URL.createObjectURL(stream), recordVideo: RecordRTC(stream, recordingOptions) });
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });
    }

    startRecord() {
        this.state.recordVideo.startRecording();
        this.videoRef.current.play();
    }

    stopRecord() {
        const videoNode = this.videoRef.current;
        const savedDir = this.props.savedDir;

        this.state.recordVideo.stopRecording(() => {
            videoNode.pause();
            const blob = this.state.recordVideo.getBlob();

            const fileReader = new FileReader();
            fileReader.onload = function () {
                const buffer = new Buffer(fileReader.result);
                fs.writeFile(`${savedDir}/${uuidv4()}.webm`, buffer,
                    (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    }
                );
            };
            fileReader.readAsArrayBuffer(blob);
        });
    }

    render() {
        const { width, height } = this.props;

        return (
            <div className={styles.container}>
                {/* <Modal show={this.state.uploadSuccess}><Modal.Body>Upload success!</Modal.Body></Modal> */}
                <video
                    width={width}
                    height={height}
                    src={this.state.src}
                    ref={this.videoRef}
                    muted
                />
                {/* {this.state.uploading ? <div>Uploading...</div> : null} */}
                <div>
                    <button onClick={this.startRecord}>Start Record</button>
                    <button onClick={this.stopRecord}>Stop Record</button>
                </div>
            </div>
        );
    }
}
