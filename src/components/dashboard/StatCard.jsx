export default function StatCard({ label, value, icon: Icon }) {
  return <article className="stat-card">{Icon && <Icon size={21}/>}<strong>{value}</strong><span>{label}</span></article>;
}
