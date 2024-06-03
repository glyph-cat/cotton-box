import { StateManager } from 'cotton-box'

const STORAGE_KEY = 'cotton-box-site-settings'

export enum UIAppearance {
  AUTO,
  LIGHT,
  DARK,
}

export interface ISiteSettingsState {
  appearance: UIAppearance
}

export const SiteSettingsState = new StateManager<ISiteSettingsState>({
  appearance: UIAppearance.AUTO,
}, {
  lifecycle: typeof window === 'undefined' ? {} : {
    init({ commit, commitNoop }) {
      const rawState = localStorage.getItem(STORAGE_KEY)
      if (rawState) {
        try {
          const parsedState = JSON.parse(rawState)
          return commit(parsedState)
        } catch (e) { /* ... */ }
      }
      return commitNoop()
    },
    didSet({ state }) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    didReset() {
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
