// Sound Effects Manager
class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = false;
        this.init();
    }

    init() {
        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Preload sounds
        this.preloadSounds();
        
        // Enable sounds on user interaction
        this.enableOnInteraction();
    }

    preloadSounds() {
        // Typing sound
        this.sounds.typing = this.createTypingSound();
        
        // Click sound
        this.sounds.click = this.createClickSound();
        
        // Hover sound
        this.sounds.hover = this.createHoverSound();
        
        // Success sound
        this.sounds.success = this.createSuccessSound();
    }

    createTypingSound() {
        // Generate typing sound
        return () => {
            if (!this.enabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 800 + Math.random() * 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }

    createClickSound() {
        return () => {
            if (!this.enabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }

    createHoverSound() {
        return () => {
            if (!this.enabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }

    createSuccessSound() {
        return () => {
            if (!this.enabled) return;
            
            const now = this.audioContext.currentTime;
            
            // Create main oscillator
            const oscillator1 = this.audioContext.createOscillator();
            const gainNode1 = this.audioContext.createGain();
            
            oscillator1.connect(gainNode1);
            gainNode1.connect(this.audioContext.destination);
            
            oscillator1.frequency.setValueAtTime(800, now);
            oscillator1.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
            oscillator1.type = 'sine';
            
            gainNode1.gain.setValueAtTime(0, now);
            gainNode1.gain.linearRampToValueAtTime(0.2, now + 0.1);
            gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            
            oscillator1.start(now);
            oscillator1.stop(now + 0.5);
        };
    }

    enableOnInteraction() {
        const enableSounds = () => {
            this.enabled = true;
            this.playSound('click');
            
            // Remove event listeners
            document.removeEventListener('click', enableSounds);
            document.removeEventListener('keydown', enableSounds);
            document.removeEventListener('scroll', enableSounds);
        };
        
        document.addEventListener('click', enableSounds, { once: true });
        document.addEventListener('keydown', enableSounds, { once: true });
        document.addEventListener('scroll', enableSounds, { once: true });
    }

    playSound(soundName) {
        if (this.sounds[soundName] && this.enabled) {
            this.sounds[soundName]();
        }
    }

    // Attach to DOM elements
    attachSoundToElements() {
        // Typing elements
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach(element => {
            const observer = new MutationObserver(() => {
                if (element.textContent.length > 0) {
                    this.playSound('typing');
                }
            });
            observer.observe(element, { childList: true });
        });

        // Click elements
        const clickElements = document.querySelectorAll('[data-audio="click"]');
        clickElements.forEach(element => {
            element.addEventListener('click', () => this.playSound('click'));
        });

        // Hover elements
        const hoverElements = document.querySelectorAll('[data-audio="hover"]');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.playSound('hover'));
        });

        // Success events
        const successEvents = document.querySelectorAll('.analyzer-step.active, .case-card:hover');
        successEvents.forEach(element => {
            element.addEventListener('transitionend', () => this.playSound('success'));
        });
    }
}

// Initialize sound manager
const soundManager = new SoundManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = soundManager;
}
