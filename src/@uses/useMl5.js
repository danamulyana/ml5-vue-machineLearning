import ml5 from 'ml5';
import { ref } from '@vue/runtime-core';

const useMl5 = () => {
    const error = ref(null);
    const isPending = ref(null);
    const results = ref([]);
    let detector = null; 

    async function setObjectDetector(type){
        isPending.value = true;
        error.value = null

        detector = await ml5.objectDetector(type);
        
        return detector;
    }

    async function detect(target){
        try {
            const res = await detector.detect(target);

            results.value = res;
        } catch (err) {
          console.error(err.message);  
        } finally {
            isPending.value = false;
        }
    }

    return { results, detect, setObjectDetector, }
}
export default useMl5;

// models

// training

// detect