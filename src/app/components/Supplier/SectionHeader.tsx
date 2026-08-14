interface SectionHeaderProps {
  step: number;
  title: string;
  description: string;
}

export default function SectionHeader({
  step,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-4 mb-5">
      {/* Step Number */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0EA5E9] text-[16px] font-semibold text-white">
        {step}
      </div>

      {/* Heading */}
      <div>
       <h2 className="text-[18px] font-bold text-[#0F172A]">
          {title}
        </h2>

        <p className="mt-0.5 text-[14px] text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}