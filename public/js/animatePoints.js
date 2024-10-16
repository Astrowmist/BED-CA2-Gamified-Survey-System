function animatePoints(element, newValue, duration = 1000) {
    // Get the initial value from the element's text content, slicing off 'Points: ' and trimming any whitespace
    const startValue = parseInt(element.textContent.slice(8).trim());
    // Record the start time for the animation
    const startTime = performance.now();
  
    function updatePoints(timestamp) {
        // Calculate the elapsed time since the start of the animation
        const elapsedTime = timestamp - startTime;
        // Calculate the progress of the animation as a value between 0 and 1
        const progress = Math.min(elapsedTime / duration, 1);
        // Compute the current value based on the progress of the animation
        const currentValue = Math.floor(startValue + (newValue - startValue) * progress);
  
        // Update the element's text content with the current value
        element.textContent = `Points: ${currentValue}`;
        
        // If the animation is not yet complete, request the next animation frame
        if (progress < 1) {
            requestAnimationFrame(updatePoints);
        } else {
            // Ensure the final value is set at the end of the animation
            element.textContent = `Points: ${newValue}`;
        }
    }
  
    // Start the animation
    requestAnimationFrame(updatePoints);
}
