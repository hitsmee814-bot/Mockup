export function PackageSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden animate-pulse"
      style={{ boxShadow: "0 2px 12px 0 rgba(63,184,255,0.06)" }}>
      <div className="relative h-40 sm:h-52" style={{ background: "linear-gradient(135deg, #3FB8FF18 0%, #FBAB1818 100%)" }}>
        <span className="absolute top-3 left-3 h-5 w-16 rounded-full" style={{ background: "#FBAB1830" }} />
        <span className="absolute top-3 right-3 h-5 w-12 rounded-full" style={{ background: "#3FB8FF20" }} />
        <span className="absolute bottom-3 left-3 h-4 w-24 rounded-full" style={{ background: "#ffffff30" }} />
      </div>

      <div className="p-3 sm:p-4 space-y-2.5">
        <div className="h-3 w-28 rounded-full" style={{ background: "#3FB8FF15" }} />
        <div className="h-4 w-3/4 rounded-full" style={{ background: "#3FB8FF20" }} />
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-full bg-gray-100" />
          <div className="h-3 w-2/3 rounded-full bg-gray-100" />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="h-3 w-16 rounded-full bg-gray-100" />
            <div className="h-5 w-24 rounded-full" style={{ background: "#3FB8FF20" }} />
            <div className="h-2.5 w-14 rounded-full bg-gray-100" />
          </div>
          <div className="space-y-1 flex flex-col items-end">
            <div className="h-2.5 w-14 rounded-full bg-gray-100" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="size-2.5 rounded-full" style={{ background: "#FBAB1830" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
