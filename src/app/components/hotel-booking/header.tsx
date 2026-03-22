export function Header({ title }: { title: string }) {
  return (
    <header className="border-b border-gray-100 p-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    </header>
  )
}
