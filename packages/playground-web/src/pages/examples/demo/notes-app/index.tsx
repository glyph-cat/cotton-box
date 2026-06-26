import { Nullable, StringRecord } from '@glyph-cat/foundation'
import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { ChangeEvent, MouseEvent, ReactNode, memo, useCallback, useDeferredValue, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import styles from './index.module.css'

interface IAppState {
  notes: StringRecord<{
    title: string,
    body: string
  }>
  currentlyPreviewing: Nullable<string>
}

const AppState = new StateManager<IAppState>({
  notes: {},
  currentlyPreviewing: null,
})

export default function App(): ReactNode {
  useEffect(() => {
    // Populate state with some data
    const firstNoteId = uuid()
    AppState.set((previousState) => ({
      ...previousState,
      currentlyPreviewing: firstNoteId,
      notes: {
        [firstNoteId]: {
          title: 'Hello, world!',
          body: 'How are you?',
        },
        [uuid()]: {
          title: 'Lorem ipsum',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        [uuid()]: {
          title: 'Click for here a surprise',
          body: 'Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you',
        }
      },
    }))
  }, [])
  return (
    <div className={styles.container}>
      <Sidebar />
      <Editor />
    </div>
  )
}

function Sidebar(): ReactNode {
  const currentlyPreviewing = useStateValue(AppState, (state) => state.currentlyPreviewing)
  const notes = useDeferredValue(useStateValue(AppState, (state) => state.notes))
  const renderStack = []
  for (const id in notes) {
    renderStack.push(
      <SidebarItem
        key={id}
        id={id}
        isPreviewing={id === currentlyPreviewing}
        value={notes[id].title}
      />
    )
  }
  return (
    <div className={styles.sidebarContainer}>
      {renderStack}
      <div
        className={styles.sidebarItemContainer}
        onClick={addNewNoteHandler}
        role='button'
      >
        <b><i>+ Add note</i></b>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  id: string
  value: string
  isPreviewing: boolean
}

const SidebarItem = memo(({
  id,
  isPreviewing,
  value,
}: SidebarItemProps): ReactNode => {

  const onRemoveNote = useCallback((e: MouseEvent<HTMLDivElement>) => {
    removeNote(id)
    e.preventDefault()
  }, [id])

  return (
    <div
      className={styles.sidebarItemContainer}
      style={{
        ...(isPreviewing ? { backgroundColor: '#2b80ff40' } : {}),
        gap: 10,
        gridTemplateColumns: '1fr auto',
        opacity: value ? 1 : 0.5,
      }}
      onClick={onSelectNote(id)}
      role='button'
    >
      <span style={value ? {} : { fontStyle: 'italic' }}>
        {value || '(New note)'}
      </span>
      <div
        className={styles.removeNoteButton}
        onClick={onRemoveNote}
        role='button'
      >
        {'×'}
      </div>
    </div>
  )
})

function Editor(): ReactNode {
  const currentlyPreviewing = useStateValue(AppState, (state) => state.currentlyPreviewing)
  const currentNote = useStateValue(AppState, (state) => state.notes[state.currentlyPreviewing ?? ''])
  const isPreviewingValidItem = currentlyPreviewing && currentNote
  return (
    <div className={styles.editorContainer}>
      <input
        className={styles.titleInput}
        disabled={!isPreviewingValidItem}
        value={isPreviewingValidItem ? currentNote.title : ''}
        onChange={onChangeNoteTitle(currentlyPreviewing!)}
        placeholder={isPreviewingValidItem ? 'Title' : undefined}
      />
      <textarea
        className={styles.bodyTextArea}
        disabled={!isPreviewingValidItem}
        value={isPreviewingValidItem ? currentNote.body : ''}
        onChange={onChangeNoteBody(currentlyPreviewing!)}
        placeholder={isPreviewingValidItem
          ? 'What\'s on your mind?'
          : 'Select a note to begin editing'
        }
      />
    </div>
  )
}

function onSelectNote(noteId: string) {
  return () => {
    AppState.set((previousState) => ({
      ...previousState,
      currentlyPreviewing: noteId,
    }))
  }
}

function addNewNote(title = '', body = ''): void {
  AppState.set((previousState) => {
    const newId = uuid()
    return {
      ...previousState,
      notes: {
        ...previousState.notes,
        [newId]: {
          title,
          body,
        },
      },
      currentlyPreviewing: newId,
    }
  })
}

function addNewNoteHandler() {
  return addNewNote()
}

function removeNote(noteId: string): void {
  AppState.set((previousState) => {
    const originalIndex = Object.keys(previousState.notes).findIndex((id) => id === noteId)
    const { [noteId]: _toExclude, ...nextNotes } = previousState.notes
    const nextIds = Object.keys(nextNotes)
    const nextPreviewId = nextIds[Math.min(Math.max(0, originalIndex - 1), nextIds.length - 1)]
    return {
      ...previousState,
      notes: nextNotes,
      currentlyPreviewing: nextPreviewId,
    }
  })
}

function onChangeNoteTitle(noteId: string) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    AppState.set((previousState) => ({
      ...previousState,
      notes: {
        ...previousState.notes,
        [noteId]: {
          ...previousState.notes[noteId],
          title: e.target.value,
        },
      },
    }))
  }
}

function onChangeNoteBody(noteId: string) {
  return (e: ChangeEvent<HTMLTextAreaElement>) => {
    AppState.set((previousState) => ({
      ...previousState,
      notes: {
        ...previousState.notes,
        [noteId]: {
          ...previousState.notes[noteId],
          body: e.target.value,
        },
      },
    }))
  }
}
