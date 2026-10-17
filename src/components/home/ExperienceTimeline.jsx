import { formatDate } from '../../utils/formatDate';
const monthYear = date => date ? new Date(`${date.slice(0, 7)}-15T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';
export default function ExperienceTimeline({ entries }) {
  return <div className="timeline">{entries.map(entry => <article className="timeline-item" key={entry.id}>
    <div className="timeline-date">{monthYear(entry.start_date)} – {entry.is_current ? 'Present' : formatDate(entry.end_date)}</div>
    <div><h3>{entry.role}</h3><p className="timeline-org">{entry.company} {entry.location && `· ${entry.location}`}</p><p className="muted preline">{entry.description}</p></div>
  </article>)}</div>;
}
