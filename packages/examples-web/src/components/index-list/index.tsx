import Link from 'next/link'

const fileExtensionPattern = /\.tsx?$/i

export interface IndexListProps {
  data: Record<string, unknown>
  parentHref?: string
}

export function IndexList({
  data,
  parentHref,
}: IndexListProps): JSX.Element {
  const renderStack = []
  const dataKeys = Object.keys(data)
  for (let i = 0; i < dataKeys.length; i++) {
    const subPath = dataKeys[i]
    const name = subPath.replace(fileExtensionPattern, '')
    const items = data[name]
    const fileType = fileExtensionPattern.test(subPath) ? subPath.split('.').at(-1) : null
    const href = `${parentHref ?? ''}/${name}${fileType ? `?${fileType}` : ''}`
    if (items) {
      renderStack.push(
        <li key={i}>
          <code>{name}</code>
          <IndexList
            parentHref={href}
            data={items as Record<string, unknown>}
          />
        </li>
      )
    } else {
      renderStack.push(
        <li key={i}>
          {parentHref
            ? <Link href={href}><code>{name}</code></Link>
            : <code>root</code>
          }
        </li>
      )
    }
  }
  return (
    <ul>
      {renderStack}
    </ul>
  )
}
