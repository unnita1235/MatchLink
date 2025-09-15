export default function Watermark({ text = "MatchLink" }: { text?: string }) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/5">
        <p className="text-white/20 text-3xl font-black rotate-[-30deg] select-none tracking-wider font-headline">
          {text}
        </p>
      </div>
    );
  }
  