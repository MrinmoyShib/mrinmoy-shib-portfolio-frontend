import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FileDown, MapPin } from 'lucide-react';
import { list, asResults } from '../../api/endpoints';
import usePageTitle from '../../hooks/usePageTitle';
import SkillGrid from '../../components/home/SkillGrid';
import ExperienceTimeline from '../../components/home/ExperienceTimeline';
import SectionHeading from '../../components/home/SectionHeading';
import { Empty, ErrorState, Loading } from '../../components/ui/States';
export default function About() {
  const { profile } = useOutletContext(); usePageTitle('About');
  const skills = useQuery({ queryKey: ['skills'], queryFn: () => list('skills') });
  const experience = useQuery({ queryKey: ['experiences'], queryFn: () => list('experiences') });
  const education = useQuery({ queryKey: ['education'], queryFn: () => list('education') });
  return <div className="shell page-section"><div className="page-intro"><p className="eyebrow">Discover my story</p><h1>About me<span className="accent">.</span></h1>
    <p>{profile?.headline || 'Experience, education, and the skills behind the work.'}</p></div>
    <div className="about-grid"><div>{profile?.avatar ? <img className="about-photo" src={profile.avatar} alt={`Portrait of ${profile.full_name}`}/> : <div className="about-photo placeholder-portrait">Your story</div>}</div>
      <div><h2>{profile?.full_name || 'The person behind the work'}</h2>{profile?.bio ? <p className="preline large-copy">{profile.bio}</p> : <p className="muted">Biography will appear when the portfolio owner adds it.</p>}
        {profile?.location && <p className="muted icon-line"><MapPin size={16}/> {profile.location}</p>}
        {profile?.resume && <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer"><FileDown size={18}/> Download resume</a>}</div></div>
    <section className="subsection"><SectionHeading eyebrow="01 / Professional history" title="Experience"/>
      {experience.isPending ? <Loading/> : experience.isError ? <ErrorState error={experience.error} retry={experience.refetch}/> :
        asResults(experience.data).length ? <ExperienceTimeline entries={asResults(experience.data)}/> : <Empty/>}</section>
    <section className="subsection"><SectionHeading eyebrow="02 / Learning" title="Education"/>
      {education.isPending ? <Loading/> : education.isError ? <ErrorState error={education.error} retry={education.refetch}/> :
        asResults(education.data).length ? <div className="education-grid">{asResults(education.data).map(item => <article className="education-card" key={item.id}>
          <span className="eyebrow">{item.start_year} – {item.end_year || 'Present'}</span><h3>{item.degree}</h3><strong>{item.institution}</strong><p>{item.field_of_study}</p>
          {item.grade && <p>{item.grade}</p>}{item.description && <p className="muted preline">{item.description}</p>}</article>)}</div> : <Empty/>}</section>
    <section className="subsection"><SectionHeading eyebrow="03 / Toolbox" title="Skills"/>
      {skills.isPending ? <Loading/> : skills.isError ? <ErrorState error={skills.error} retry={skills.refetch}/> :
        asResults(skills.data).length ? <SkillGrid skills={asResults(skills.data)}/> : <Empty/>}</section>
  </div>;
}
