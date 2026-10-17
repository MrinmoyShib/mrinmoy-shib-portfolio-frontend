/** Simple accessible shared table; columns supply name and render where customization is needed. */
export default function DataTable({ columns, items, getKey = item => item.id }) {
  return <div className="table-scroll"><table className="data-table"><thead><tr>{columns.map(column => <th key={column.name} scope="col">{column.label || column.name}</th>)}</tr></thead>
    <tbody>{items.map(row => <tr key={getKey(row)}>{columns.map(column => <td key={column.name}>{column.render ? column.render(row) : String(row[column.name] ?? '—')}</td>)}</tr>)}</tbody>
  </table></div>;
}
