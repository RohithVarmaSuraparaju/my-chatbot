export function ruleBasedReply(input: string): string {
  const text = input.toLowerCase().trim();

  if (!text) return "Say something and I’ll respond!";
  if (/hello|hi|hey/.test(text)) return "Hey! How can I help today?";
  if (/help|support/.test(text)) return "Sure — tell me what you’re trying to do.";
  if (/time/.test(text)) return `Current time: ${new Date().toLocaleString()}`;
  if (/thanks|thank you/.test(text)) return "You’re welcome! 😊";

  return `I heard: “${input}”. Tell me more.`;
}
