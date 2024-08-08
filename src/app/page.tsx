import { HelloWorld } from '@/components/HelloWorld'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-16 p-24">
      <div className="border-2 border-current p-6">
        <HelloWorld />
      </div>
    </main>
  )
}
