export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-8">
      <h2 className="text-lg font-semibold">JobAtlasAI</h2>

      <div className="text-sm text-muted-foreground">
        Welcome back 👋
      </div>
    </header>
  );
}