// Notification sound utility
// Uses Web Audio API as fallback for better browser compatibility

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Generate a simple notification beep using Web Audio API
const playBeep = () => {
  try {
    const ctx = getAudioContext();

    // Resume context if suspended (required by some browsers)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (error) {
    console.warn('Could not play notification sound:', error);
  }
};

// Main function to play notification sound
export const playNotificationSound = () => {
  // Try HTML Audio first (for custom sound file)
  const audio = new Audio('/sounds/notification.mp3');
  audio.volume = 0.5;

  audio.play().catch(() => {
    // Fallback to Web Audio API beep if audio file fails
    playBeep();
  });
};

// Check if sound is available/supported
export const isSoundSupported = (): boolean => {
  return !!(window.AudioContext || (window as any).webkitAudioContext);
};

// Request permission for notifications (optional, for future browser notifications)
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Show browser notification (if permitted)
export const showBrowserNotification = (title: string, body: string, icon?: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/logo.jpeg',
      badge: '/logo.jpeg',
      tag: 'anon-notification',
      requireInteraction: false,
    });
  }
};

export default playNotificationSound;
