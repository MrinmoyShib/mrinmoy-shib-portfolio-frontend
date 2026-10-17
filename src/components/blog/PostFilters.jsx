export default function PostFilters({ search, onSearch, categories, tags, category, tag, sort, onFilter }) {
  return <div className="filters"><label className="search-label">Search posts<input type="search" placeholder="Search the journal…" value={search} onChange={e => onSearch(e.target.value)}/></label>
    <div className="category-chips"><button className={!category ? 'chip selected' : 'chip'} onClick={() => onFilter('category', '')}>All topics</button>
      {categories.map(c => <button key={c.id} className={category === c.slug ? 'chip selected' : 'chip'} onClick={() => onFilter('category', c.slug)}>{c.name}</button>)}</div>
    <div className="filter-row"><label>Tag<select value={tag || ''} onChange={e => onFilter('tag', e.target.value)}><option value="">All tags</option>{tags.map(t => <option key={t.id} value={t.slug}>{t.name}</option>)}</select></label>
      <label>Sort<select value={sort} onChange={e => onFilter('ordering', e.target.value)}><option value="-published_at">Newest</option><option value="-views_count">Most viewed</option><option value="-likes_count">Most liked</option><option value="title">A–Z</option></select></label></div>
  </div>;
}
