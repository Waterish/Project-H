const textInput = document.getElementById('');
const textInput = document.getElementById('introLesson');
 const speakButton = document.getElementById('speakButton');

 textInput.addEventListener('click', () => {
     const textToSpeak = textInput.value;

     if (textToSpeak) {
         const utterance = new SpeechSynthesisUtterance(textToSpeak);
         // Optional: Configure properties like voice, pitch, and rate
         // utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
         // utterance.pitch = 1; // 0 to 2
         // utterance.rate = 1; // 0.1 to 10

         window.speechSynthesis.speak(utterance);
     }
 });

 const speakableElement = document.getElementById('introLesson');

  speakableElement.addEventListener('mouseover', () => {
      // Get the text to be spoken
      const textToSpeak = speakableElement.dataset.text || speakableElement.textContent;

      // Create a new SpeechSynthesisUtterance object
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Optional: Customize speech properties (voice, pitch, rate, volume)
      // utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
      // utterance.pitch = 1; // 0 to 2
      // utterance.rate = 1; // 0.1 to 10
      // utterance.volume = 1; // 0 to 1

      // Speak the text
      window.speechSynthesis.speak(utterance);
  });

  // Optional: Add a mouseout event to stop speech if the user moves the mouse away
  speakableElement.addEventListener('mouseout', () => {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
  });
