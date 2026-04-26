import './ContentTags.css'

export default function ContentTags({ tags, limit }) {
  const visible = limit ? tags.slice(0, limit) : tags
  return (
    <div className="flex flex-wrap gap-3">
      {visible.map((tag) => (
        <span key={tag.id ?? tag.name} className="uape-learn-tag" style={{ color: tag.color }}>
          {tag.name}
        </span>
      ))}
    </div>
  )
}
