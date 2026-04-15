document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeBuilderForm');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const stepIndicators = Array.from(document.querySelectorAll('.step-indicator span'));
    const nextButton = document.getElementById('nextStep');
    const prevButton = document.getElementById('prevStep');
    const submitButton = document.getElementById('submitButton');
    const summaryCard = document.getElementById('summaryCard');

    let currentStep = 0;

    function updateStep() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentStep);
        });
        prevButton.style.display = currentStep === 0 ? 'none' : 'inline-flex';
        nextButton.hidden = currentStep === steps.length - 1;
        submitButton.hidden = currentStep !== steps.length - 1;
    }

    function validateStep() {
        const currentFields = Array.from(steps[currentStep].querySelectorAll('input, textarea, select'));
        return currentFields.every(field => {
            if (!field.required) return true;
            return field.value.trim() !== '';
        });
    }

    function fillSummary() {
        document.getElementById('resultName').textContent = document.getElementById('fullName').value.trim() || 'Not provided';
        document.getElementById('resultRole').textContent = document.getElementById('jobTitle').value.trim() || 'Not provided';
        document.getElementById('resultIndustry').textContent = document.getElementById('industry').value || 'Any industry';
        document.getElementById('resultLevel').textContent = document.getElementById('experienceLevel').value || 'Any level';
        document.getElementById('resultGoal').textContent = document.getElementById('careerGoal').value.trim() || 'No goal entered';
        document.getElementById('resultExperience').textContent = document.getElementById('experienceSummary').value.trim() || 'No experience detail';
        document.getElementById('resultSkills').textContent = document.getElementById('skills').value.trim() || 'No skills entered';
        document.getElementById('resultEducation').textContent = document.getElementById('education').value.trim() || 'No qualification entered';
        const extraText = document.getElementById('additionalInfo').value.trim();
        document.getElementById('resultExtra').textContent = extraText ? `Additional detail: ${extraText}` : 'No extra details added.';
    }

    nextButton.addEventListener('click', () => {
        if (!validateStep()) {
            alert('Please complete all required fields before continuing.');
            return;
        }
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        updateStep();
    });

    prevButton.addEventListener('click', () => {
        currentStep = Math.max(currentStep - 1, 0);
        updateStep();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validateStep()) {
            alert('Please complete all required fields before finishing.');
            return;
        }
        fillSummary();
        summaryCard.hidden = false;
        submitButton.textContent = 'Update summary';
        alert('Your resume plan is ready! Review it below and use it to build your final CV.');
    });

    updateStep();
});
