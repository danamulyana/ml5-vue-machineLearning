<template>
    <div class="container mx-auto">
        <h1 class="text-center text-3xl my-4">Object Detaction Video</h1>
        <div id="render"></div>
    </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core';
import ml5 from 'ml5';

async function setObjectDetector(type){
    console.log('starting...');
    return await ml5.objectDetector(type);
}

async function createCapture(){
    try {
        const canvas = document.createElement('canvas');
        const parent = document.getElementById('render');
        const video = document.createElement("video");

        parent.append(canvas);
        canvas.id = "canvas";
        canvas.width = 640;
        canvas.height = 480;
        canvas.style.margin = "0 auto";

        video.id = "video";
        video.autoplay = true;
        video.width = 640;
        video.height = 480;

        video.srcObject = await navigator.mediaDevices.getUserMedia({
            video: {
                cursor: "always"
            },
            audio: false,
        });

        const context = canvas.getContext('2d');

        video.addEventListener("play", () => {
            function frame() {
                context.drawImage(video, 0, 0, 640, 480);
                requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        })

        const detector = await setObjectDetector('cocossd');

        function gotDetections(error, results){
            if (error) throw new Error(error.message);

            results.map(result => {
                // retecgle
                context.strokeStyle = "green";
                context.lineWidth = 4;
                context.strokeRect(result.x, result.y, result.width, result.height)

                // text
                context.font = "20px Arial";
                context.fillStyle = "green";
                context.fillText(`${result.label} - ${(result.confidence * 100).toFixed(2)}`, result.x + 10,result.y + 30);
                detector.detect(video, gotDetections)
            });
        }

        detector.detect(video,gotDetections)
    } catch (err) {
        console.error(err.message);
    }
}

onMounted(() => {
    createCapture();
});
</script>