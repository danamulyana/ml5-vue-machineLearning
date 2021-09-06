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
    const { detector, setObjectDetector } = useMl5();

    async function init(){
        // load all resource
        const image = await loadImage(imgUrl);

        // create canvas
        const canvas = createCanvas();

        // draw resouce to canvas
        const context = canvas.getContext("2d");

        context.drawImage(image, 0, 0, 640, 480);

        // using model
        await setObjectDetector('cocossd');

        console.log(detector);
    }
    
    onMounted(() => {
        init();
    });
</script>
