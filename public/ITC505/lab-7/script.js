// Form validation and user experience enhancements
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('madLibForm');
    const inputs = form.querySelectorAll('input[type="text"]');
    
    // Add focus animation to inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Form submission validation
    form.addEventListener('submit', function(e) {
        let allFilled = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
                input.style.borderColor = '#f5576c';
                
                // Reset border color after 2 seconds
                setTimeout(() => {
                    input.style.borderColor = '#e0e0e0';
                }, 2000);
            }
        });
        
        if (!allFilled) {
            e.preventDefault();
            alert('Please fill in all fields before submitting!');
        }
    });
    
    // Clear error styling when user starts typing
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#e0e0e0';
        });
    });
    
    // Add character counter for long inputs (optional enhancement)
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.length > 20) {
                this.style.fontSize = '0.95em';
            } else {
                this.style.fontSize = '1em';
            }
        });
    });
});