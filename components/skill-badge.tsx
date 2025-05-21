interface SkillBadgeProps {
  name: string
  icon: string
}

export default function SkillBadge({ name, icon }: SkillBadgeProps) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-black/40 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:translate-y-[-2px]">
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-sm">{name}</span>
    </div>
  )
}
