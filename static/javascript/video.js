// Modify this function to send video frames to Flask
async function sendVideoFrames(frameBlob) {
    try {
        const formData = new FormData();
        formData.append('video_frame', frameBlob);

        await fetch('/send_video_frame', {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error('Error sending video frame:', error);
    }
}

// Modify your existing frame capture logic
async function captureAndSendFrame() {
    const canvas = document.createElement('canvas');
    const videoElement = document.getElementById('processed-video'); // Update with your video element's ID

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(sendVideoFrames, 'image/jpeg', 0.8);
}

// Modify your existing interval function to capture and send frames
setInterval(captureAndSendFrame, 100); // Update every 100ms

