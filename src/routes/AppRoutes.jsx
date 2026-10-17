import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Projects from '../pages/public/Projects';
import ProjectDetail from '../pages/public/ProjectDetail';
import Blog from '../pages/public/Blog';
import BlogDetail from '../pages/public/BlogDetail';
import Contact from '../pages/public/Contact';
import Login from '../pages/public/Login';
import NotFound from '../pages/public/NotFound';
import Overview from '../pages/dashboard/Overview';
import ResourceList from '../pages/dashboard/ResourceList';
import ResourceEditor from '../pages/dashboard/ResourceEditor';
import GroupedResources from '../pages/dashboard/GroupedResources';
import Comments from '../pages/dashboard/Comments';
import Messages from '../pages/dashboard/Messages';
import Profile from '../pages/dashboard/Profile';
export default function AppRoutes() {
  return <Routes>
    <Route element={<PublicLayout/>}>
      <Route index element={<Home/>}/><Route path="about" element={<About/>}/>
      <Route path="projects" element={<Projects/>}/><Route path="projects/:slug" element={<ProjectDetail/>}/>
      <Route path="blog" element={<Blog/>}/><Route path="blog/:slug" element={<BlogDetail/>}/>
      <Route path="contact" element={<Contact/>}/>
    </Route>
    <Route path="login" element={<Login/>}/>
    <Route element={<ProtectedRoute/>}><Route path="dashboard" element={<DashboardLayout/>}>
      <Route index element={<Overview/>}/>
      <Route path="posts" element={<ResourceList resource="posts"/>}/>
      <Route path="posts/new" element={<ResourceEditorAlias resource="posts"/>}/>
      <Route path="posts/:slug/edit" element={<ResourceEditorAlias resource="posts"/>}/>
      <Route path="projects" element={<ResourceList resource="projects"/>}/>
      <Route path="skills" element={<ResourceList resource="skills"/>}/>
      <Route path="experience" element={<GroupedResources first="experiences" second="education"/>}/>
      <Route path="taxonomy" element={<GroupedResources first="categories" second="tags"/>}/>
      <Route path="manage/:resource/new" element={<ResourceEditor/>}/>
      <Route path="manage/:resource/:id/edit" element={<ResourceEditor/>}/>
      <Route path="comments" element={<Comments/>}/><Route path="messages" element={<Messages/>}/><Route path="profile" element={<Profile/>}/>
    </Route></Route>
    <Route path="*" element={<NotFound/>}/>
  </Routes>;
}
// Kept as aliases for the explicitly required /dashboard/posts/new and /dashboard/posts/:slug/edit routes.
// ResourceEditor needs resource/id in the params: navigate to the generic editor without duplicating forms.
import { Navigate, useParams } from 'react-router-dom';
function ResourceEditorAlias({ resource }) {
  const { slug } = useParams();
  return <Navigate replace to={slug ? `/dashboard/manage/${resource}/${slug}/edit` : `/dashboard/manage/${resource}/new`}/>;
}
