export default function SettingsPage() {
    return (
      <div className="flex flex-col h-full">
        <header className="bg-card border-b p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-headline font-semibold text-primary">
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and application settings.
            </p>
          </div>
        </header>
  
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <p>Settings page content goes here.</p>
          </div>
        </main>
      </div>
    );
  }
  