import { Link, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight } from 'lucide-react';
import { list, asResults } from '../../api/endpoints';
import usePageTitle from '../../hooks/usePageTitle';
import SectionHeading from '../../components/home/SectionHeading';
import LatestPosts from '../../components/home/LatestPosts';
import FeaturedProjects from '../../components/home/FeaturedProjects';
import AboutPreview from '../../components/home/AboutPreview';
import Hero from '../../components/home/Hero';
import SkillGrid from '../../components/home/SkillGrid';
import ExperienceTimeline from '../../components/home/ExperienceTimeline';
import { Empty, ErrorState, Loading } from '../../components/ui/States';

export default function Home() {
  const { profile } = useOutletContext();
  usePageTitle(profile?.full_name);
  const skills = useQuery({ queryKey: ['skills', 'home'], queryFn: () => list('skills', { ordering: 'display_order' }) });
  const experience = useQuery({ queryKey: ['experiences', 'home'], queryFn: () => list('experiences') });
  const projects = useQuery({ queryKey: ['projects', 'home'], queryFn: () => list('projects', { page: 1, is_featured: true, ordering: 'display_order' }) });
  const posts = useQuery({ queryKey: ['posts', 'home'], queryFn: () => list('posts', { page: 1, ordering: '-published_at' }) });
  return <>
    <Hero profile={profile}/>
    <AboutPreview profile={profile}/>
    <section className="section alternate"><div className="shell"><SectionHeading eyebrow="02 / Expertise" title="Skills & strengths"/>
      {skills.isPending ? <Loading/> : skills.isError ? <ErrorState error={skills.error} retry={skills.refetch}/> :
        asResults(skills.data).length ? <SkillGrid skills={asResults(skills.data)}/> : <Empty title="Skills coming soon"/>}</div></section>
    <section className="section"><div className="shell"><SectionHeading eyebrow="03 / Journey" title="Experience" to="/about" link="Full journey"/>
      {experience.isPending ? <Loading/> : experience.isError ? <ErrorState error={experience.error} retry={experience.refetch}/> :
        asResults(experience.data).length ? <ExperienceTimeline entries={asResults(experience.data).slice(0, 4)}/> : <Empty title="Experience coming soon"/>}</div></section>
    <FeaturedProjects query={projects}/>
    <LatestPosts query={posts}/>
    <section className="contact-banner"><div className="shell contact-banner-inner"><div><p className="eyebrow">06 / Collaboration</p><h2>Have something in mind?</h2><p>I'd love to hear about it.</p></div>
      <Link to="/contact" className="btn btn-light">Let's talk <ArrowUpRight size={18}/></Link></div></section>
  </>;
}
