export default function ContentTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span key={tag.id ?? tag.name} className="uape-learn-tag" style={{ color: tag.color }}>
          {tag.name}
        </span>
      ))}
    </div>
  )
}
