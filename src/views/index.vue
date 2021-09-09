<template>
    <div class="container mx-auto">
        <h1 class="text-center text-3xl my-4">Object Detaction Image</h1>
        <div id="render"></div>
    </div>
</template>

<script setup>
    import { onMounted } from '@vue/runtime-core';
    import useCanvas from '../@uses/useCanvas';
    import useMl5 from '../@uses/useMl5';

    import imgUrl from '../assets/mit.png';

    const { createCanvas, loadImage } = useCanvas();
    const { results, detect, setObjectDetector } = useMl5();

    async function init(){
        try {
            // load all resource
            const image = await loadImage(imgUrl);

            // create canvas
            const canvas = createCanvas();

            // draw resouce to canvas
            const context = canvas.getContext("2d");

            context.drawImage(image, 0, 0, 640, 480);

            // using model
            await setObjectDetector('cocossd');

            // detect object in image
            await detect(image);

            // draw into object detected
            results.value.map(result => {
                // retecgle
                context.strokeStyle = "green";
                context.lineWidth = 4;
                context.strokeRect(result.x, result.y, result.width, result.height)

                // text
                context.font = "20px Arial";
                context.fillStyle = "green";
                context.fillText(`${result.label} - ${(result.confidence * 100).toFixed(2)}`, result.x + 10,result.y + 180)
            });
        } catch (err) {
            console.error(err.message);
        }
    }
    
    onMounted(() => {
        init();
    });
</script>
