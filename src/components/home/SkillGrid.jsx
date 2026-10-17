import { SKILL_GROUPS } from '../../utils/constants';
export default function SkillGrid({ skills }) {
  const groups = Object.groupBy ? Object.groupBy(skills, item => item.category) : skills.reduce((acc, item) => { (acc[item.category] ||= []).push(item); return acc; }, {});
  return <div className="skill-groups">{Object.entries(groups).map(([category, items]) => <div className="skill-group" key={category}>
    <h3>{SKILL_GROUPS[category] || category}</h3>
    {items.map(skill => <div key={skill.id} className="skill-row"><div><span>{skill.name}</span><span className="muted">{skill.icon === 'cv-unrated' ? 'Unrated' : `${skill.proficiency}%`}</span></div>
      <div className="progress"><div style={{ width: skill.icon === 'cv-unrated' ? '0%' : `${skill.proficiency}%` }}/></div></div>)}
  </div>)}</div>;
}
