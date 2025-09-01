import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen bg-quantum-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold quantum-gradient-text mb-2">Admin Access</h1>
          <p className="text-quantum-muted">Sign in to access admin features</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-quantum-card border border-quantum-border shadow-2xl",
              headerTitle: "text-quantum-light",
              headerSubtitle: "text-quantum-muted",
              socialButtonsBlockButton:
                "bg-quantum-darker border-quantum-border text-quantum-light hover:bg-quantum-card",
              formButtonPrimary:
                "bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark",
              formFieldInput: "bg-quantum-darker border-quantum-border text-quantum-light",
              formFieldLabel: "text-quantum-light",
              identityPreviewText: "text-quantum-light",
              identityPreviewEditButton: "text-quantum-primary",
            },
          }}
        />
      </div>
    </div>
  )
}
