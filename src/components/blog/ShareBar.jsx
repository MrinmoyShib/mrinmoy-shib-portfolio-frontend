import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
export default function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(window.location.href); setCopied(true); };
  return <div className="action-row"><button className="btn btn-outline" onClick={copy}><Copy size={17}/> {copied ? 'Copied!' : 'Copy link'}</button>
    {navigator.share && <button className="btn btn-outline" onClick={() => navigator.share({ title, url: window.location.href })}><Share2 size={17}/> Share</button>}</div>;
}
