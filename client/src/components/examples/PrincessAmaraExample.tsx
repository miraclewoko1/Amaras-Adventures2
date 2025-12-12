import PrincessAmara from "../PrincessAmara";

export default function PrincessAmaraExample() {
  return (
    <div className="p-8 space-y-8">
      <PrincessAmara 
        message="Hi! I'm Princess Amara! Meet my family and friends!" 
        size="hero" 
        showFamily={true}
      />
      <PrincessAmara message="Great job! You're doing amazing!" size="large" />
      <PrincessAmara message="Let's try this together!" size="medium" />
      <PrincessAmara size="small" showSpeechBubble={false} />
    </div>
  );
}
