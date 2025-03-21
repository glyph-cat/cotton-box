import { Fragment } from 'react'
import { LabeledItem } from '../labeled-item'
import labeledItemStyles from '../labeled-item/index.module.css'
import { MarkdownWrapper } from '../markdown-wrapper'
import { TypeDisplay, TypeDisplayProps } from '../type-display'
import styles from './index.module.css'

export interface ObjectPropertyDefinition {
  name: string
  type: TypeDisplayProps['children']
  typeIsArrayOf?: boolean
  readonly?: boolean
  isOptional?: boolean
  defaultValue?: string
  description?: string
}

export interface ObjectShapeDefinitionProps {
  /**
   * @deprecated
   */
  title?: string
  /**
   * @deprecated
   */
  hideDescription?: boolean
  data: Array<ObjectPropertyDefinition>
  hideOptional?: boolean
  requireEitherOne?: boolean
}

export function ObjectShapeDefinition({
  data,
  hideOptional,
  requireEitherOne,
}: ObjectShapeDefinitionProps): JSX.Element {
  const renderStack = []
  for (const item of data) {
    const {
      name,
      type,
      readonly,
      isOptional,
      defaultValue,
      description,
      typeIsArrayOf,
    } = item

    renderStack.push(
      <li key={name} className={styles.li}>
        {readonly && (<span className={styles.readonly}>readonly</span>)}
        <code className={styles.parameterName}>{name}</code>
        {' — '}
        <MarkdownWrapper unwrapParagraph>
          {description}
        </MarkdownWrapper>
        <span className={styles.specifications}>
          <br />
          <TypeDisplay containerElement={Fragment} typeIsArrayOf={typeIsArrayOf}>
            {type}
          </TypeDisplay>
          {!hideOptional && (
            <>
              <br />
              <LabeledItem label='Required'>
                {(isOptional || defaultValue)
                  ? 'No'
                  : `Yes${requireEitherOne ? ' (either one)' : ''}`
                }
                {(defaultValue) && (
                  <>
                    <span className={labeledItemStyles.label}>{' — (default value: '}</span>
                    <MarkdownWrapper unwrapParagraph>{defaultValue}</MarkdownWrapper>
                    <span className={labeledItemStyles.label}>{')'}</span>
                  </>
                )}
              </LabeledItem>
            </>
          )}
          <br />
        </span>
      </li>
    )
  }
  return <ul>{renderStack}</ul>
}
