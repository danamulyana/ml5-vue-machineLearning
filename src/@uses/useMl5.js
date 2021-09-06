import ml5 from 'ml5';

let detector = null; 

async function setObjectDetector(type){
    detector = await ml5.objectDetector(type);
    console.log(detector);
} 

const useMl5 = () => {
    return { detector, setObjectDetector, }
}
export default useMl5;

// models

// training

// detect